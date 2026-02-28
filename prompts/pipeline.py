"""
상세페이지 에이전트 팀 파이프라인 오케스트레이션
================================================
Claude API (Anthropic SDK)를 활용한 자동화 파이프라인.
5개 에이전트(collector, researcher, copywriter, designer, prompt-engineer)를
순차/병렬로 실행하여 상세페이지를 자동 생성한다.

사용법:
    python pipeline.py --product-url "https://example.com/product"
    python pipeline.py --product-name "다이슨 에어랩"
    python pipeline.py --brief input/product_brief.json
"""

import anthropic
import json
import os
import sys
import argparse
import asyncio
from pathlib import Path
from datetime import datetime, timezone

# ──────────────────────────────────────────────
# API 키 설정
# ──────────────────────────────────────────────

def setup_api_key():
    """API 키를 확인하고 없으면 안내한다."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")

    if not api_key:
        # .env 파일 폴백
        env_file = Path(__file__).resolve().parent.parent / ".env"
        if env_file.exists():
            for line in env_file.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if line.startswith("ANTHROPIC_API_KEY=") and not line.startswith("#"):
                    api_key = line.split("=", 1)[1].strip().strip('"').strip("'")
                    os.environ["ANTHROPIC_API_KEY"] = api_key
                    break

    if not api_key:
        print("=" * 60)
        print("  ANTHROPIC_API_KEY가 설정되지 않았습니다.")
        print()
        print("  설정 방법:")
        print()
        print("  [Windows PowerShell]")
        print('  $env:ANTHROPIC_API_KEY = "sk-ant-..."')
        print()
        print("  [Windows CMD]")
        print('  set ANTHROPIC_API_KEY=sk-ant-...')
        print()
        print("  [Git Bash / WSL]")
        print('  export ANTHROPIC_API_KEY="sk-ant-..."')
        print()
        print("  [영구 설정 - Windows]")
        print('  setx ANTHROPIC_API_KEY "sk-ant-..."')
        print()
        print("  또는 프로젝트 루트에 .env 파일을 생성하세요:")
        print('  ANTHROPIC_API_KEY=sk-ant-...')
        print("=" * 60)
        sys.exit(1)

    # 키 형식 검증
    if not api_key.startswith("sk-ant-"):
        print("  [경고] API 키가 'sk-ant-'로 시작하지 않습니다. 올바른 키인지 확인하세요.")

    return api_key


# ──────────────────────────────────────────────
# 설정
# ──────────────────────────────────────────────

PROJECT_DIR = Path(__file__).resolve().parent.parent
AGENTS_DIR = Path.home() / ".claude" / "agents"
SCHEMAS_DIR = PROJECT_DIR / "prompts" / "schemas"

MODELS = {
    "collector": "claude-haiku-4-5",
    "researcher": "claude-sonnet-4-6",
    "copywriter": "claude-opus-4-6",
    "designer": "claude-sonnet-4-6",
    "prompt_engineer": "claude-opus-4-6",
    "qa": "claude-sonnet-4-6",
}

MAX_TOKENS = {
    "collector": 4096,
    "researcher": 8192,
    "copywriter": 16000,
    "designer": 16000,
    "prompt_engineer": 8192,
    "qa": 4096,
}


# ──────────────────────────────────────────────
# 유틸리티
# ──────────────────────────────────────────────

def load_agent_prompt(agent_name: str) -> str:
    """에이전트 마크다운 파일에서 시스템 프롬프트를 로드한다."""
    agent_file = AGENTS_DIR / f"{agent_name}.md"
    if not agent_file.exists():
        raise FileNotFoundError(f"에이전트 파일을 찾을 수 없습니다: {agent_file}")

    content = agent_file.read_text(encoding="utf-8")

    # YAML frontmatter 이후의 본문만 추출
    parts = content.split("---", 2)
    if len(parts) >= 3:
        return parts[2].strip()
    return content.strip()


def load_schema(schema_name: str) -> dict:
    """JSON 스키마 파일을 로드한다."""
    schema_file = SCHEMAS_DIR / schema_name
    if schema_file.exists():
        return json.loads(schema_file.read_text(encoding="utf-8"))
    return {}


def save_output(relative_path: str, data, as_json: bool = True):
    """결과물을 프로젝트 디렉토리에 저장한다."""
    output_path = PROJECT_DIR / relative_path
    output_path.parent.mkdir(parents=True, exist_ok=True)

    if as_json and isinstance(data, (dict, list)):
        output_path.write_text(
            json.dumps(data, ensure_ascii=False, indent=2),
            encoding="utf-8"
        )
    else:
        output_path.write_text(str(data), encoding="utf-8")

    print(f"  [저장] {relative_path}")


def load_output(relative_path: str, as_json: bool = True):
    """이전 단계의 결과물을 로드한다."""
    output_path = PROJECT_DIR / relative_path
    if not output_path.exists():
        return None

    content = output_path.read_text(encoding="utf-8")
    if as_json:
        return json.loads(content)
    return content


def extract_json_from_response(text: str) -> dict | list | None:
    """응답 텍스트에서 JSON 블록을 추출한다."""
    # ```json ... ``` 블록 추출
    if "```json" in text:
        start = text.index("```json") + 7
        end = text.index("```", start)
        return json.loads(text[start:end].strip())

    # 순수 JSON 시도
    text = text.strip()
    if text.startswith(("{", "[")):
        return json.loads(text)

    return None


# ──────────────────────────────────────────────
# 에이전트 실행기
# ──────────────────────────────────────────────

class AgentRunner:
    """Claude API를 활용한 에이전트 실행기."""

    def __init__(self):
        self.client = anthropic.Anthropic()

    def run_agent(
        self,
        agent_name: str,
        user_message: str,
        model_key: str | None = None,
        expect_json: bool = False,
    ) -> str:
        """단일 에이전트를 실행하고 결과를 반환한다."""
        model = MODELS.get(model_key or agent_name, "claude-sonnet-4-6")
        max_tokens = MAX_TOKENS.get(model_key or agent_name, 8192)
        system_prompt = load_agent_prompt(agent_name)

        print(f"\n{'='*60}")
        print(f"  에이전트 실행: {agent_name} (모델: {model})")
        print(f"{'='*60}")

        with self.client.messages.stream(
            model=model,
            max_tokens=max_tokens,
            thinking={"type": "adaptive"},
            system=system_prompt,
            messages=[{"role": "user", "content": user_message}],
        ) as stream:
            result = stream.get_final_message()

        # 텍스트 블록 추출
        text_parts = []
        for block in result.content:
            if block.type == "text":
                text_parts.append(block.text)

        full_text = "\n".join(text_parts)
        print(f"  [완료] {agent_name} — {result.usage.output_tokens} tokens")

        return full_text


# ──────────────────────────────────────────────
# 파이프라인 단계
# ──────────────────────────────────────────────

class DetailPagePipeline:
    """상세페이지 제작 파이프라인."""

    def __init__(self, product_input: str):
        self.product_input = product_input
        self.runner = AgentRunner()

    def run(self):
        """전체 파이프라인을 실행한다."""
        print("\n" + "=" * 60)
        print("  상세페이지 에이전트 팀 파이프라인 시작")
        print("  " + datetime.now(timezone.utc).isoformat())
        print("=" * 60)

        # Phase 1: 정보수집
        product_data = self.phase_collect()

        # Phase 2: 리서치 (경쟁사 분석 + SEO 키워드)
        research_report, keywords = self.phase_research(product_data)

        # Phase 3: 카피라이팅
        sections = self.phase_copywrite(product_data, research_report, keywords)

        # Phase 4: 디자인
        design_html = self.phase_design(product_data, sections)

        # Phase 5: 품질 검수
        qa_result = self.phase_qa()

        print("\n" + "=" * 60)
        print("  파이프라인 완료!")
        print("=" * 60)
        self.print_summary()

    # ── Phase 1: 정보수집 ──

    def phase_collect(self) -> dict:
        """Phase 1: 상품 정보를 수집한다."""
        print("\n▶ Phase 1: 정보수집")

        user_msg = f"""다음 상품의 정보를 수집해 주세요.

상품 입력: {self.product_input}

## 요청사항
1. 상품의 모든 기본정보(이름, 가격, 스펙, 구성품)를 수집하세요
2. 브랜드 정보(스토리, 철학, 타겟)를 조사하세요
3. 이미지 URL을 가능한 많이 수집하세요
4. 경쟁 상품 3~5개를 찾아 URL과 가격을 기록하세요
5. 기존 리뷰를 요약하세요

## 출력 형식
반드시 JSON 형식으로 출력하세요. 스키마:
{json.dumps(load_schema("product_data.schema.json"), ensure_ascii=False, indent=2)}

JSON 코드 블록(```json ... ```)으로 감싸서 출력하세요.
"""
        response = self.runner.run_agent("collector", user_msg)
        product_data = extract_json_from_response(response)

        if product_data is None:
            print("  [경고] JSON 파싱 실패. 원본 텍스트를 저장합니다.")
            save_output("collected/product_data_raw.md", response, as_json=False)
            product_data = {"raw_response": response, "collected_at": datetime.now(timezone.utc).isoformat()}

        save_output("collected/product_data.json", product_data)
        return product_data

    # ── Phase 2: 리서치 ──

    def phase_research(self, product_data: dict) -> tuple[str, dict]:
        """Phase 2: 시장/경쟁사/SEO 리서치를 수행한다."""
        print("\n▶ Phase 2: 리서치")

        product_json = json.dumps(product_data, ensure_ascii=False, indent=2)

        # 리서치 리포트
        research_msg = f"""아래 상품 데이터를 기반으로 종합 리서치 리포트를 작성해 주세요.

## 상품 데이터
```json
{product_json}
```

## 요청사항
1. 경쟁사 상세페이지 분석 (구조, 카피, 강조 포인트)
2. 카테고리 트렌드 및 키워드 분석
3. 타겟 고객 페르소나 2~3개 정의
4. 리뷰/VOC 기반 핵심 구매 동기 추출
5. USP(고유 판매 제안) 도출
6. SEO 키워드 리스트 (메인 3~5개, 서브 10~15개)

## 출력 형식
마크다운 형식의 종합 리서치 리포트를 작성하세요.
마지막에 SEO 키워드를 별도 JSON 블록(```json ... ```)으로 출력하세요.
키워드 JSON 스키마:
{json.dumps(load_schema("keywords.schema.json"), ensure_ascii=False, indent=2)}
"""
        response = self.runner.run_agent("researcher", research_msg)

        # 리포트와 키워드 분리
        keywords = extract_json_from_response(response)
        if keywords is None:
            keywords = {"main_keywords": [], "sub_keywords": [], "seed_keyword": ""}

        # JSON 블록 제거 후 리포트 저장
        report = response
        if "```json" in report:
            json_start = report.index("```json")
            json_end = report.index("```", json_start + 7) + 3
            report = report[:json_start].strip()

        save_output("research/research_report.md", report, as_json=False)
        save_output("research/keywords.json", keywords)

        return report, keywords

    # ── Phase 3: 카피라이팅 (13섹션) ──

    def phase_copywrite(self, product_data: dict, research: str, keywords: dict) -> dict:
        """Phase 3: 13섹션 고전환 카피를 작성한다."""
        print("\n▶ Phase 3: 카피라이팅 (13섹션)")

        product_json = json.dumps(product_data, ensure_ascii=False, indent=2)
        keywords_json = json.dumps(keywords, ensure_ascii=False, indent=2)

        copy_msg = f"""아래 상품 데이터와 리서치 결과를 기반으로 13섹션 고전환 상세페이지 카피를 작성해 주세요.

## 상품 데이터
```json
{product_json}
```

## 리서치 리포트
{research}

## SEO 키워드
```json
{keywords_json}
```

## 13섹션 구조
반드시 아래 13개 섹션을 모두 작성하세요:

01. Hero (긴급성 헤더) — 3초 관심 캡처, headline 3가지 옵션
02. Pain (공감) — "이거 내 얘기다" 유발, 고통 3-4개
03. Problem (문제 정의) — 실패 원인 3개 + 관점 전환
04. Story (Before→After) — 변화 가능성 확신
05. Solution Intro (솔루션 소개) — 제품 정체성 명확히
06. How It Works (작동 방식) — 3-4단계 프로세스
07. Social Proof (사회적 증거) — 숫자 + 후기 3-5개
08. Authority (권위) — 제작자/브랜드 신뢰 구축
09. Benefits + Bonus (혜택) — 가치 극대화
10. Risk Removal (리스크 제거) — 보장 + FAQ 3-5개
11. Before/After Final (최종 대비) — 선택 압박
12. Target Filter (타겟 필터) — 추천/비추천 대상
13. Final CTA (최종 CTA) — 가격 + 긴급성 + 행동 유도

## 카피 5원칙
1. 한국어 자연스러운 구어체 — 번역투 금지
2. 감정 → 논리 흐름 — 먼저 공감, 그 다음 설명
3. 구체적 숫자 — "많은" 대신 "143명"
4. 2인칭 활용 — "당신", "여러분"
5. 짧은 문장 — 20자 내외

## 출력 형식
반드시 아래 JSON 구조로 출력하세요. ```json``` 블록으로 감싸세요.

```json
{{
  "section_01_hero": {{
    "headline_options": ["옵션1", "옵션2", "옵션3"],
    "subheadline": "...",
    "urgency_badge": "...",
    "cta_text": "..."
  }},
  "section_02_pain": {{
    "intro": "...",
    "pain_points": ["...", "...", "..."],
    "emotional_hook": "..."
  }},
  "section_03_problem": {{
    "hook": "...",
    "reasons": ["...", "...", "..."],
    "reframe": "..."
  }},
  "section_04_story": {{
    "before": "...", "turning_point": "...", "after": "...", "proof": "..."
  }},
  "section_05_solution_intro": {{
    "intro": "...", "product_name": "...", "one_liner": "...", "target_fit": "..."
  }},
  "section_06_how_it_works": {{
    "steps": [{{ "number": 1, "title": "...", "description": "...", "result": "..." }}]
  }},
  "section_07_social_proof": {{
    "headline": "...",
    "stats": ["...", "..."],
    "testimonials": [{{ "name": "...", "role": "...", "quote": "...", "result": "..." }}]
  }},
  "section_08_authority": {{
    "intro": "...", "bio": "...", "credentials": ["..."], "message": "..."
  }},
  "section_09_benefits_bonus": {{
    "main_benefits": [{{ "benefit": "...", "value": "..." }}],
    "bonus_items": [{{ "item": "...", "value": "..." }}],
    "total_value": "..."
  }},
  "section_10_risk_removal": {{
    "guarantee": "...",
    "faq": [{{ "question": "...", "answer": "..." }}],
    "support": "..."
  }},
  "section_11_before_after_final": {{
    "without": ["...", "..."],
    "with": ["...", "..."],
    "question": "..."
  }},
  "section_12_target_filter": {{
    "recommended": ["...", "..."],
    "not_recommended": ["...", "..."]
  }},
  "section_13_final_cta": {{
    "headline": "...",
    "urgency": "...",
    "price": {{ "original": "...", "sale": "...", "savings": "..." }},
    "cta_button": "...",
    "closing": "..."
  }}
}}
```
"""
        response = self.runner.run_agent("copywriter", copy_msg)
        sections = extract_json_from_response(response)

        if sections is None:
            print("  [경고] JSON 파싱 실패. 원본 텍스트를 저장합니다.")
            save_output("copy/sections_raw.md", response, as_json=False)
            sections = {}

        # output/ 폴더에도 저장 (reference.md 호환)
        save_output("output/copy_output.json", sections)
        save_output("copy/sections.json", sections)

        # 카피 가이드 (읽기 쉬운 마크다운 버전)
        copy_guide = self._generate_copy_guide(sections)
        save_output("copy/copy_guide.md", copy_guide, as_json=False)

        return sections

    def _generate_copy_guide(self, sections: dict) -> str:
        """13섹션 copy_output.json에서 읽기 쉬운 카피 가이드를 생성한다."""
        section_names = {
            "section_01_hero": "01. Hero (긴급성 헤더)",
            "section_02_pain": "02. Pain (공감)",
            "section_03_problem": "03. Problem (문제 정의)",
            "section_04_story": "04. Story (Before→After)",
            "section_05_solution_intro": "05. Solution Intro (솔루션 소개)",
            "section_06_how_it_works": "06. How It Works (작동 방식)",
            "section_07_social_proof": "07. Social Proof (사회적 증거)",
            "section_08_authority": "08. Authority (권위)",
            "section_09_benefits_bonus": "09. Benefits + Bonus (혜택)",
            "section_10_risk_removal": "10. Risk Removal (리스크 제거)",
            "section_11_before_after_final": "11. Before/After Final (최종 대비)",
            "section_12_target_filter": "12. Target Filter (타겟 필터)",
            "section_13_final_cta": "13. Final CTA (최종 CTA)",
        }

        lines = ["# 13섹션 카피 가이드\n"]

        for key, title in section_names.items():
            data = sections.get(key, {})
            if not data:
                continue
            lines.append(f"## {title}")
            for field, value in data.items():
                if isinstance(value, list):
                    lines.append(f"**{field}**:")
                    for item in value:
                        if isinstance(item, dict):
                            lines.append(f"  - {json.dumps(item, ensure_ascii=False)}")
                        else:
                            lines.append(f"  - {item}")
                elif isinstance(value, dict):
                    lines.append(f"**{field}**: {json.dumps(value, ensure_ascii=False)}")
                else:
                    lines.append(f"**{field}**: {value}")
            lines.append("")

        return "\n".join(lines)

    # ── Phase 4: 디자인 ──

    def phase_design(self, product_data: dict, sections: dict) -> str:
        """Phase 4: HTML/CSS 디자인 시안을 생성한다."""
        print("\n▶ Phase 4: 디자인")

        sections_json = json.dumps(sections, ensure_ascii=False, indent=2)
        brand = product_data.get("brand", {})

        design_msg = f"""아래 카피 데이터를 기반으로 상세페이지 HTML/CSS 디자인 시안을 제작해 주세요.

## 카피 데이터 (sections.json)
```json
{sections_json}
```

## 브랜드 정보
- 브랜드명: {brand.get('name', 'N/A')}
- 톤: {brand.get('tone', 'N/A')}

## 요청사항
1. 모바일 퍼스트 (375px 기준) 세로 스크롤 상세페이지
2. 각 섹션을 HTML 시맨틱 태그로 구현
3. 인라인 CSS 또는 <style> 태그 사용
4. 이미지는 플레이스홀더(회색 박스 + 설명 텍스트)로 처리
5. 한국어 폰트: Pretendard (CDN 링크 포함)
6. 컬러 시스템을 CSS 변수로 정의
7. 브라우저에서 바로 열 수 있는 완전한 HTML 파일

## 출력
완전한 HTML 파일 하나를 출력하세요. ```html ... ``` 블록으로 감싸세요.
"""
        response = self.runner.run_agent("designer", design_msg)

        # HTML 추출
        html = response
        if "```html" in response:
            start = response.index("```html") + 7
            end = response.index("```", start)
            html = response[start:end].strip()

        save_output("design/wireframe.html", html, as_json=False)
        return html

    # ── Phase 5: 품질 검수 ──

    def phase_qa(self) -> dict:
        """Phase 5: 전체 결과물을 품질 검수한다."""
        print("\n▶ Phase 5: 품질 검수 (QA)")

        # 모든 결과물 로드
        product_data = load_output("collected/product_data.json") or {}
        research = load_output("research/research_report.md", as_json=False) or ""
        keywords = load_output("research/keywords.json") or {}
        sections = load_output("copy/sections.json") or {}
        qa_rubric = load_output("prompts/qa_rubric.json") or {}

        qa_msg = f"""상세페이지 제작 결과물의 품질을 검수해 주세요.

## QA 평가 기준
```json
{json.dumps(qa_rubric, ensure_ascii=False, indent=2)}
```

## 1. 정보수집 결과 (요약)
- 상품명: {product_data.get('product_name', 'N/A')}
- 필드 수: {len([v for v in product_data.values() if v is not None])}
- 이미지 수: {len(product_data.get('images', []))}
- 경쟁사 수: {len(product_data.get('competitors', []))}

## 2. 리서치 결과 (요약)
- 리포트 길이: {len(research)} 자
- 메인 키워드 수: {len(keywords.get('main_keywords', []))}
- 서브 키워드 수: {len(keywords.get('sub_keywords', []))}

## 3. 카피 결과
```json
{json.dumps(sections, ensure_ascii=False, indent=2)[:3000]}
```

## 요청사항
각 에이전트의 결과물을 QA 기준에 따라 평가하고, 아래 JSON 형식으로 출력하세요:
```json
{{
  "overall_score": 0.0,
  "pass": true/false,
  "collector": {{ "score": 0.0, "issues": [], "suggestions": [] }},
  "researcher": {{ "score": 0.0, "issues": [], "suggestions": [] }},
  "copywriter": {{ "score": 0.0, "issues": [], "suggestions": [] }},
  "designer": {{ "score": 0.0, "issues": [], "suggestions": [] }},
  "summary": "종합 평가"
}}
```
"""
        response = self.runner.run_agent(
            "prompt-engineer", qa_msg, model_key="qa"
        )
        qa_result = extract_json_from_response(response)

        if qa_result is None:
            qa_result = {"overall_score": 0, "summary": response[:500]}

        save_output("prompts/qa_result.json", qa_result)
        return qa_result

    # ── 요약 ──

    def print_summary(self):
        """최종 결과 요약을 출력한다."""
        print("\n📁 생성된 파일:")
        for subdir in ["collected", "research", "copy", "design", "prompts"]:
            dir_path = PROJECT_DIR / subdir
            if dir_path.exists():
                for f in sorted(dir_path.rglob("*")):
                    if f.is_file():
                        size = f.stat().st_size
                        rel = f.relative_to(PROJECT_DIR)
                        print(f"  {rel} ({size:,} bytes)")


# ──────────────────────────────────────────────
# 비동기 병렬 실행 버전
# ──────────────────────────────────────────────

class AsyncDetailPagePipeline:
    """비동기 병렬 실행이 가능한 파이프라인."""

    def __init__(self, product_input: str):
        self.product_input = product_input
        self.client = anthropic.AsyncAnthropic()

    async def run_agent_async(
        self,
        agent_name: str,
        user_message: str,
        model_key: str | None = None,
    ) -> str:
        """에이전트를 비동기로 실행한다."""
        model = MODELS.get(model_key or agent_name, "claude-sonnet-4-6")
        max_tokens = MAX_TOKENS.get(model_key or agent_name, 8192)
        system_prompt = load_agent_prompt(agent_name)

        print(f"  [시작] {agent_name} (모델: {model})")

        async with self.client.messages.stream(
            model=model,
            max_tokens=max_tokens,
            thinking={"type": "adaptive"},
            system=system_prompt,
            messages=[{"role": "user", "content": user_message}],
        ) as stream:
            result = await stream.get_final_message()

        text_parts = []
        for block in result.content:
            if block.type == "text":
                text_parts.append(block.text)

        full_text = "\n".join(text_parts)
        print(f"  [완료] {agent_name} — {result.usage.output_tokens} tokens")
        return full_text

    async def run(self):
        """비동기 파이프라인 실행 (병렬 가능 구간 활용)."""
        print("\n" + "=" * 60)
        print("  상세페이지 에이전트 팀 파이프라인 (비동기)")
        print("=" * 60)

        # Phase 1: 정보수집 (필수 선행)
        pipeline = DetailPagePipeline(self.product_input)
        product_data = pipeline.phase_collect()

        # Phase 2: 리서치 + 프롬프트 최적화 (병렬)
        research_task = asyncio.create_task(
            self._run_research(product_data)
        )
        # prompt-engineer는 독립적으로 시스템 프롬프트 작성 가능
        prompt_task = asyncio.create_task(
            self._run_prompt_optimization()
        )

        (research_report, keywords), _ = await asyncio.gather(
            research_task, prompt_task
        )

        # Phase 3: 카피라이팅 (리서치 완료 후)
        sections = pipeline.phase_copywrite(product_data, research_report, keywords)

        # Phase 4: 디자인 (카피 완료 후)
        pipeline.phase_design(product_data, sections)

        # Phase 5: QA
        pipeline.phase_qa()

        print("\n  비동기 파이프라인 완료!")
        pipeline.print_summary()

    async def _run_research(self, product_data: dict) -> tuple[str, dict]:
        """리서치를 비동기로 실행한다."""
        pipeline = DetailPagePipeline(self.product_input)
        return pipeline.phase_research(product_data)

    async def _run_prompt_optimization(self) -> str:
        """프롬프트 최적화를 비동기로 실행한다."""
        msg = """현재 에이전트 팀의 시스템 프롬프트를 분석하고,
각 에이전트(collector, researcher, copywriter, designer)의
개선된 프롬프트 v1을 작성해 주세요.

각 에이전트의 현재 프롬프트는 ~/.claude/agents/ 디렉토리에 있습니다.

출력은 각 에이전트별로 마크다운 섹션으로 구분하여 작성하세요."""

        response = await self.run_agent_async(
            "prompt-engineer", msg, model_key="prompt_engineer"
        )
        save_output("prompts/system_prompts/optimization_v1.md", response, as_json=False)
        return response


# ──────────────────────────────────────────────
# CLI
# ──────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="상세페이지 에이전트 팀 파이프라인"
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--product-url", help="상품 페이지 URL")
    group.add_argument("--product-name", help="상품명")
    group.add_argument("--brief", help="product_brief.json 파일 경로")

    parser.add_argument(
        "--async", dest="use_async", action="store_true",
        help="비동기 병렬 실행 모드 사용"
    )

    args = parser.parse_args()

    # API 키 확인
    setup_api_key()

    # 입력 결정
    if args.product_url:
        product_input = f"상품 URL: {args.product_url}"
    elif args.product_name:
        product_input = f"상품명: {args.product_name}"
    elif args.brief:
        brief_path = Path(args.brief)
        if not brief_path.exists():
            print(f"오류: 파일을 찾을 수 없습니다: {args.brief}")
            sys.exit(1)
        brief = json.loads(brief_path.read_text(encoding="utf-8"))
        product_input = f"상품 브리프:\n{json.dumps(brief, ensure_ascii=False, indent=2)}"
    else:
        print("오류: --product-url, --product-name, --brief 중 하나를 지정하세요.")
        sys.exit(1)

    # 실행
    if args.use_async:
        pipeline = AsyncDetailPagePipeline(product_input)
        asyncio.run(pipeline.run())
    else:
        pipeline = DetailPagePipeline(product_input)
        pipeline.run()


if __name__ == "__main__":
    main()

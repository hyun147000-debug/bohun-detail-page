# 국가보훈 장해진단서 발급기관 확대 홍보 상세페이지 프로젝트

## 개요
2026년 1월 시행된 '국가보훈 장해진단서 발급기관 확대' 정책을 적극 홍보하기 위한 상세페이지 자동 제작 프로젝트.
보훈대상자가 보훈병원 대신 집 근처 가까운 종합병원(위탁병원)에서 장해진단서를 발급받도록 유도.

## 에이전트 구성
- **collector** (Haiku): 정책 정보 수집 & 리플릿 데이터 추출
- **researcher** (Sonnet): 보훈정책 분석, 대상자 리서치, SEO 키워드
- **copywriter** (Opus): 정부 정책 홍보 특화 섹션별 카피 작성
- **designer** (Sonnet): HTML/CSS 디자인 시안 + AI 이미지 프롬프트 생성
- **prompt-engineer** (Opus): 프롬프트 최적화 & QA

## 프로젝트 구조
- `input/` — 정책 브리프 입력
- `collected/` — 정보수집 결과 (리플릿 PDF 데이터 포함)
- `research/` — 리서치 리포트 & 키워드
- `copy/` — 섹션별 카피
- `design/` — HTML/CSS 디자인 시안 + 이미지 프롬프트
- `prompts/` — 스키마, QA 기준, 파이프라인 코드

## 이미지 생성 전략
이 프로젝트는 **고화질 리얼리스틱 이미지 생성 및 반영**을 핵심으로 합니다:

### 이미지 생성 방식 (우선순위)

#### 1순위: Google Gemini 나노바나나 (Nano Banana) — 고화질 리얼리스틱 이미지
**모델**: Gemini 2.5 Flash (imagen-3.0-generate-002 또는 gemini-2.0-flash-exp)
**API 엔드포인트**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent`
**인증**: Google AI API Key (환경변수 `GOOGLE_API_KEY` 또는 .env 파일에 설정)

**사용 방법 (Bash curl)**:
```bash
curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=$GOOGLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "이미지 프롬프트 내용"}]}],
    "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]}
  }'
```
- 응답의 `inlineData.data` 필드에서 base64 인코딩된 이미지를 추출
- `base64 -d` 명령으로 디코딩하여 PNG/JPEG 파일로 저장
- 한국어 프롬프트 지원, 고화질 리얼리스틱 스타일 우수
- 무료 티어: 하루 100장, 유료: 1000장+

**프롬프트 작성 가이드 (나노바나나 최적화)**:
- 영어 프롬프트가 품질이 더 높음 (한국어 가능하지만 영어 권장)
- "photorealistic", "high quality", "4K", "detailed" 등 품질 키워드 포함
- 구체적인 색상 코드 (#003478 등) 직접 지정 가능
- 스타일: "Korean government official style", "warm and trustworthy"
- 구도: "wide format 16:9", "portrait 4:5" 등 비율 명시

#### 2순위: Canva MCP — 디자인/인포그래픽
**툴**: `mcp__claude_ai_Canva__generate-design`
- 인포그래픽, 차트, 도표 등 디자인 요소에 적합
- 텍스트가 포함된 디자인에 강점

#### 3순위: CSS 기반 폴백
- 이미지 생성 API 불가 시, CSS gradient + 텍스트 오버레이로 대체

### 섹션별 이미지 생성 워크플로우
1. `copy/final_copy.json`에서 섹션별 `image_prompt` 추출
2. 나노바나나 API로 고화질 리얼리스틱 이미지 생성 (영어 프롬프트)
3. `design/images/` 디렉토리에 `{섹션번호}_{섹션명}.png` 형식으로 저장
4. `design/wireframe.html`의 `<img>` 태그 src 속성에 경로 반영
5. alt 텍스트는 한국어로 작성 (접근성)

### 섹션별 필요 이미지
| 섹션 | 이미지 유형 | 설명 |
|------|-----------|------|
| Hero | 메인 비주얼 | 태극기 모티프 + 보훈 상징 + 병원 이미지 |
| 정책 소개 | 인포그래픽 | 49곳→140곳 확대 비주얼 |
| Before/After | 비교 일러스트 | 먼 보훈병원 vs 가까운 동네 병원 |
| 절차 안내 | 스텝 다이어그램 | 3단계 이용 절차 플로우차트 |
| 전국 병원 지도 | 지도 인포그래픽 | 전국 140곳 병원 분포도 |
| 대상자 안내 | 아이콘 세트 | 대상자/비대상자 구분 아이콘 |
| FAQ | 일러스트 | Q&A 아이콘과 캐릭터 |
| CTA | 배너 이미지 | 관할 보훈관서 연락 유도 배너 |

## 정책 핵심 정보 (리플릿 기반)
- **제도 근거**: 개정 국가유공자법 (2023.6.17. 시행)
- **발급기관 확대**: 2026.1월부터 49곳 → 140곳
  - 상급종합병원 47곳
  - 보훈병원 5곳 (신규 추가)
  - 종합병원급 위탁병원 86곳 (신규 추가)
  - 국군수도병원 1곳 + 경찰병원 1곳
- **핵심 혜택**: 보훈병원 신체검사 생략 → 보훈심사위원회 직접 상이등급 심사
- **대상자**: 공무 관련성 인정받은 전·공상 부상/질병, 고엽제후유증
- **서식**: 진단서 1종 + 소견서 9종 (법정서식)
- **비용**: 신청인 본인부담 원칙

## 상세페이지 구조 (정부 정책 홍보 특성 적의 조정)
기존 상업용 13섹션 구조를 정부 정책 홍보에 맞게 10섹션으로 조정:

1. **Hero (정책 헤더)** — 핵심 변화 한 줄 + 시행일 + 메인 비주얼
2. **Before/After (변화 대비)** — 기존 vs 변경 후 비교 (먼 보훈병원 → 가까운 병원)
3. **Policy Overview (정책 소개)** — 제도 배경, 법적 근거, 핵심 변화 내용
4. **How It Works (이용 절차)** — 3단계 신청/발급/심사 절차 안내
5. **Benefits (핵심 혜택)** — 접근성 향상, 시간 단축, 비용 절감 등
6. **Hospital Map (발급기관 안내)** — 전국 140곳 병원 목록 및 지도
7. **Target Audience (대상자 안내)** — 누가 이용할 수 있는지 명확 안내
8. **FAQ (자주 묻는 질문)** — 실제 민원 기반 Q&A
9. **Required Documents (필요서류/검사항목)** — 신체부위별 진단항목 요약
10. **CTA (행동 유도)** — 관할 보훈관서 확인 + 병원 방문 안내

## 실행 방법
```
상세페이지 에이전트 팀을 구성해서 다음 정책의 홍보 상세페이지를 만들어줘.
정책: 국가보훈 장해진단서 발급기관 확대 (2026.1월 시행)
참고 자료: 장해진단서_제도_리플렛.pdf
작업 폴더: detail-page-project/
이미지: AI 생성 이미지 포함
```

## 커스텀 에이전트
`~/.claude/agents/` 디렉토리에 에이전트 정의 파일이 있음:
- collector.md, researcher.md, copywriter.md, designer.md, prompt-engineer.md

## 스킬
`~/.claude/skills/` 디렉토리에 재사용 가능 스킬:
- `/product-analysis [상품URL]` — 상품 분석
- `/seo-keywords [카테고리]` — SEO 키워드 분석
- `/copy-templates [섹션명]` — 카피 템플릿

import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const API_KEY = "AIzaSyCHwlyhqCx2EWkouIsdqFTwLiA5HagpUKE";
const ai = new GoogleGenAI({ apiKey: API_KEY });

const OUTPUT_DIR = path.join(process.cwd(), "design", "images");

// 6개 이미지 프롬프트 (상세페이지 섹션별)
const imagePrompts = [
  {
    filename: "hero_product.png",
    prompt: "A premium cream white and rose gold full-body massage chair in a modern minimalist Korean living room. Elegant reclining design with soft leather upholstery. Warm ambient lighting, clean interior with light wood floors. High-end product photography, studio quality."
  },
  {
    filename: "relaxation_person.png",
    prompt: "A Korean professional man in his 40s relaxing peacefully with eyes closed in a premium white massage chair at home. Serene happy expression, wearing comfortable casual clothes. Modern Korean apartment living room with soft warm lighting. Natural lifestyle photography."
  },
  {
    filename: "family_happy.png",
    prompt: "An elderly Korean couple in their 60s smiling warmly near a premium cream-colored massage chair in a bright Korean home. The husband sits comfortably in the chair while the wife stands beside him smiling. Warm family atmosphere, cheerful natural lighting."
  },
  {
    filename: "technology_detail.png",
    prompt: "Close-up detail shot of a high-tech massage chair leg mechanism with independent dual-leg robotic movement system. Modern industrial design with cream white and rose gold metallic accents. Technical product photography with clean studio lighting."
  },
  {
    filename: "golf_recovery.png",
    prompt: "A healthy Korean man in his early 50s relaxing in a premium massage chair after golf. He looks refreshed and satisfied, wearing smart casual clothes. Golf bag visible nearby. Modern Korean home interior with large windows and natural light."
  },
  {
    filename: "wellness_morning.png",
    prompt: "A serene wellness scene: a premium cream-colored massage chair in an elegant modern Korean living room with soft morning sunlight through sheer curtains. A cup of herbal tea on a side table, indoor green plants. Calm, luxurious, spa-like atmosphere."
  }
];

async function generateWithGemini(promptText, filename) {
  console.log(`  [Gemini] Generating: ${filename}...`);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: promptText,
      config: {
        responseModalities: ["image", "text"],
      },
    });

    if (response.candidates && response.candidates[0]) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData) {
          const outputPath = path.join(OUTPUT_DIR, filename);
          fs.writeFileSync(outputPath, Buffer.from(part.inlineData.data, "base64"));
          console.log(`    Saved: ${filename}`);
          return true;
        }
      }
    }
    console.log(`    No image data in response`);
    return false;
  } catch (err) {
    console.error(`    Gemini error: ${err.message?.slice(0, 150)}`);
    return false;
  }
}

async function generateWithFallback(promptText, filename) {
  console.log(`  [Gemini 2.0 Flash Exp] Generating: ${filename}...`);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: promptText,
      config: {
        responseModalities: ["image", "text"],
      },
    });

    if (response.candidates && response.candidates[0]) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData) {
          const outputPath = path.join(OUTPUT_DIR, filename);
          fs.writeFileSync(outputPath, Buffer.from(part.inlineData.data, "base64"));
          console.log(`    Saved: ${filename}`);
          return true;
        }
      }
    }
    console.log(`    No image data in response`);
    return false;
  } catch (err) {
    console.error(`    Fallback error: ${err.message?.slice(0, 150)}`);
    return false;
  }
}

async function main() {
  console.log("=== FALCON-i 상세페이지 이미지 생성 ===\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let successCount = 0;

  for (const img of imagePrompts) {
    console.log(`\n[${successCount + 1}/${imagePrompts.length}] ${img.filename}`);

    // Try Gemini 2.5 Flash first, then fallback models
    let success = await generateWithGemini(img.prompt, img.filename);
    if (!success) {
      console.log(`  Trying fallback model...`);
      success = await generateWithFallback(img.prompt, img.filename);
    }

    if (success) successCount++;

    // Longer delay between requests to avoid rate limiting
    console.log(`  Waiting 10s before next request...`);
    await new Promise((r) => setTimeout(r, 10000));
  }

  console.log(`\n=== 완료! ${successCount}/${imagePrompts.length} 이미지 생성 ===`);
  console.log(`저장 위치: ${OUTPUT_DIR}`);

  // List generated files
  const files = fs.readdirSync(OUTPUT_DIR);
  console.log(`\n생성된 파일:`);
  files.forEach(f => {
    const stats = fs.statSync(path.join(OUTPUT_DIR, f));
    console.log(`  ${f} (${(stats.size / 1024).toFixed(1)}KB)`);
  });
}

main();

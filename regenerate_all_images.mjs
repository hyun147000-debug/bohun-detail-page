import https from 'https';
import fs from 'fs';
import path from 'path';

const sharp = (await import('sharp')).default;

const API_KEY = 'AIzaSyCHwlyhqCx2EWkouIsdqFTwLiA5HagpUKE';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`;
const IMG_DIR = path.join(process.cwd(), 'design', 'images');

const imagePrompts = [
  {
    filename: '01_hero.png',
    prompt: 'Photorealistic photograph, absolutely no text or letters anywhere in the image: A bright warm morning scene at a modern Korean general hospital entrance. An elderly Korean man in his 70s with neat gray hair wearing a clean navy jacket and beige slacks walks confidently through modern automatic glass doors. His adult daughter in her 40s walks beside him gently supporting his arm. Both are smiling warmly. The hospital entrance is modern with clean white architecture, large glass panels, and neatly trimmed green hedges. Warm golden morning sunlight streams through. Cherry blossom petals gently float in the air. Hopeful and welcoming atmosphere. Shot with Sony A7R IV, 35mm lens, f/2.8, golden hour lighting. Wide 16:9 format.'
  },
  {
    filename: '02_before.png',
    prompt: 'Photorealistic photograph, no text or words anywhere: An elderly Korean man in his 70s wearing a thick winter padded jacket sitting alone on a bench at a small rural bus station. He leans on a wooden walking cane with a small overnight bag beside him. Overcast gray sky. The bus station is old and weathered with a simple metal roof. His expression shows tiredness and resignation. Cold muted gray-blue color tones throughout. The road behind stretches far into the distance suggesting a long journey ahead. Shot with Canon EOS R5, 50mm lens, f/4, overcast lighting. Portrait 4:5 format.'
  },
  {
    filename: '02_after.png',
    prompt: 'Photorealistic photograph, no text or letters anywhere: A happy elderly Korean man smiling brightly with warm eyes walking along a short tree-lined path toward a nearby modern hospital building. His adult son walks beside him both looking relaxed and happy. The hospital is a modern multi-story building with clean architecture very close by. Beautiful spring weather with cherry blossoms blooming green trees warm sunshine. A residential neighborhood is visible nearby suggesting the hospital is close to home. Warm cheerful color palette with golden sunlight. Shot with Sony A7R IV, 35mm lens, f/2.8, warm natural light. Portrait 4:5 format.'
  },
  {
    filename: '03_policy.png',
    prompt: 'Photorealistic photograph, absolutely no text or letters in the image: Interior of a bright modern Korean hospital information center and reception lobby. A friendly Korean female nurse in a crisp white uniform stands behind a sleek curved reception desk with a warm welcoming smile ready to assist. The lobby has clean white marble floors modern LED ceiling lights comfortable waiting chairs and green indoor plants. Large floor-to-ceiling windows let in abundant natural light. Overall atmosphere is clean professional welcoming and trustworthy. No signs no text no words visible. Shot with Canon EOS R5, 24mm wide angle lens, f/5.6, bright indoor lighting. Wide 16:9 format.'
  },
  {
    filename: '04_howworks.png',
    prompt: 'Photorealistic photograph, no text or words anywhere in the image: A Korean male doctor in his 50s wearing a clean white coat with a stethoscope around his neck sitting at a modern desk in a clean medical examination room. He warmly explains medical documents to an elderly Korean male patient sitting across from him. The doctor points at a form on the desk with a reassuring smile. The patient listens attentively looking relieved and comfortable. Medical documents are visible on the desk. Modern medical equipment softly blurred in the background. Bright professional warm atmosphere. Shot with Nikon Z9, 50mm lens, f/2.8, soft lighting. Wide 16:9 format.'
  },
  {
    filename: '05_benefits.png',
    prompt: 'Photorealistic photograph, no text or letters anywhere in the image: A happy elderly Korean man in his 70s sitting in a bright modern hospital waiting area proudly holding an official-looking medical document with both hands. He has a warm relieved genuine smile on his face. His adult daughter sits beside him also smiling warmly looking at the document together. The hospital waiting area is modern and bright with comfortable chairs and large windows letting in natural sunlight. The document looks official with a red seal visible but absolutely no readable text. Hopeful atmosphere. Shot with Canon EOS R5, 50mm lens, f/2.8, natural indoor lighting. Wide 16:9 format.'
  },
  {
    filename: '06_hospital_map.png',
    prompt: 'Photorealistic photograph, no text or words in the image: Exterior wide-angle view of a modern Korean general hospital building on a clear sunny day. The hospital is a large multi-story building with clean contemporary architecture white and light gray facades and large glass windows reflecting blue sky. The main entrance has a covered portico with modern design. Well-maintained landscaping with green trees flowering bushes and a clean organized parking area in front. Several people walking near the entrance. Bright blue sky with soft white clouds. The image conveys accessibility modernity and trustworthiness. Shot with Sony A7R IV, 24mm wide angle lens, f/8, bright daylight. Wide 16:9 format.'
  },
  {
    filename: '07_target.png',
    prompt: 'Photorealistic photograph, no text or letters anywhere: A warm professional scene in a clean modern Korean government office. A kind middle-aged Korean woman wearing a formal navy blazer sits across a desk from an elderly Korean male veteran. She explains documents to him with a gentle patient expression pointing at a checklist. The veteran listens carefully with a hopeful trusting expression. The office has modern furniture a Korean flag on a stand in the background and framed certificates on the wall. Official documents and a desk phone are on the table. Professional warm trustworthy atmosphere. Shot with Canon EOS R5, 50mm lens, f/2.8, warm indoor lighting. Wide 16:9 format.'
  },
  {
    filename: '08_faq.png',
    prompt: 'Photorealistic photograph, no text anywhere in the image: Close-up of elderly Korean hands carefully holding an informational brochure or pamphlet about medical services. Reading glasses rest on a wooden table nearby. A cup of warm green tea sits beside the pamphlet on a small coaster. The pamphlet has official-looking design elements visible but absolutely no readable text. Soft warm natural light from a window illuminates the scene. A comfortable cozy home setting is suggested in the soft background. The atmosphere is intimate and thoughtful conveying careful reading of important information. Shot with Sony A7R IV, 85mm macro lens, f/2.8, window light. Wide 16:9 format.'
  },
  {
    filename: '09_documents.png',
    prompt: 'Photorealistic photograph, absolutely no text or readable letters anywhere: A neatly organized set of official Korean medical documents and certificates arranged on a clean white desk. The top document shows an official red circular seal stamp. A professional black pen a stethoscope and elegant reading glasses are placed artfully beside the documents. The papers are stacked neatly with visible official formatting but no readable text whatsoever. Clean professional medical office setting with soft warm directional lighting from the side. The image conveys official documentation and medical professionalism. Shot with Canon EOS R5, 50mm macro lens, f/4, studio lighting. Wide 16:9 format.'
  },
  {
    filename: '10_cta.png',
    prompt: 'Photorealistic photograph, no text or words anywhere: A heartwarming scene of an elderly Korean couple in their 70s walking hand-in-hand along a beautiful tree-lined path near a modern hospital on a gorgeous spring day. The man wears a neat navy jacket. Cherry blossom petals drift gently in warm golden sunlight creating a magical atmosphere. They both smile peacefully and contentedly. The modern hospital building is softly visible in the background through the cherry blossom trees. Golden hour warm lighting creates a hopeful dignified serene atmosphere. The path is clean and well-maintained. Shot with Sony A7R IV, 85mm lens, f/1.8, golden hour natural light. Wide 16:9 format.'
  }
];

function generateImage(prompt, filename) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
    });
    const url = new URL(API_URL);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.candidates?.[0]?.content?.parts) {
            for (const part of json.candidates[0].content.parts) {
              if (part.inlineData) {
                const buf = Buffer.from(part.inlineData.data, 'base64');
                console.log(`  [GEN] ${filename} raw: ${(buf.length / 1024).toFixed(0)}KB`);
                resolve(buf);
                return;
              }
            }
          }
          console.log(`  [WARN] ${filename} no image in response`);
          if (json.error) console.log(`  Error: ${json.error.message}`);
          resolve(null);
        } catch (e) {
          console.log(`  [ERR] ${filename} parse: ${e.message}`);
          resolve(null);
        }
      });
    });
    req.on('error', (e) => { console.log(`  [ERR] ${filename} req: ${e.message}`); resolve(null); });
    req.setTimeout(120000, () => { req.destroy(); console.log(`  [ERR] ${filename} timeout`); resolve(null); });
    req.write(body);
    req.end();
  });
}

async function optimizeAndSave(buffer, filePath) {
  const optimized = await sharp(buffer)
    .resize({ width: 800, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(filePath, optimized);
  return optimized.length;
}

async function main() {
  console.log(`=== Regenerating all ${imagePrompts.length} images ===\n`);

  for (let i = 0; i < imagePrompts.length; i += 3) {
    const batch = imagePrompts.slice(i, i + 3);
    console.log(`--- Batch ${Math.floor(i / 3) + 1} (${batch.map(b => b.filename).join(', ')}) ---`);

    await Promise.all(batch.map(async (item) => {
      const buf = await generateImage(item.prompt, item.filename);
      if (buf) {
        const filePath = path.join(IMG_DIR, item.filename);
        const size = await optimizeAndSave(buf, filePath);
        console.log(`  [OK] ${item.filename}: ${(size / 1024).toFixed(0)}KB`);
      } else {
        console.log(`  [FAIL] ${item.filename}`);
      }
    }));

    if (i + 3 < imagePrompts.length) {
      console.log('  Waiting 5s before next batch...\n');
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  console.log('\n=== Final sizes ===');
  let total = 0;
  for (const item of imagePrompts) {
    const fp = path.join(IMG_DIR, item.filename);
    if (fs.existsSync(fp)) {
      const s = fs.statSync(fp).size;
      total += s;
      console.log(`  ${item.filename}: ${(s / 1024).toFixed(0)}KB`);
    } else {
      console.log(`  ${item.filename}: MISSING`);
    }
  }
  console.log(`  TOTAL: ${(total / 1024 / 1024).toFixed(1)}MB`);
}

main().catch(console.error);

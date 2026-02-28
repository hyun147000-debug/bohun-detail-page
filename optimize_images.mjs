import https from 'https';
import fs from 'fs';
import path from 'path';

const sharp = (await import('sharp')).default;

const API_KEY = 'AIzaSyCHwlyhqCx2EWkouIsdqFTwLiA5HagpUKE';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`;
const IMG_DIR = path.join(process.cwd(), 'design', 'images');

// Images that likely have text — regenerate without text
const regenPrompts = [
  {
    filename: '01_hero.png',
    prompt: 'Photorealistic photograph, no text or letters anywhere in the image: An elderly Korean man in his 70s with gray hair wearing a neat dark navy jacket walking toward a bright modern hospital entrance on a sunny spring morning. His adult daughter gently holds his arm, both smiling warmly. Cherry blossom trees with pink petals floating in warm golden sunlight. Clean modern hospital building with glass facade in background. No signs, no text, no words, no watermarks. Shot with 35mm lens, natural lighting, wide 16:9 format.'
  },
  {
    filename: '03_policy.png',
    prompt: 'Photorealistic photograph, absolutely no text or letters in the image: Interior of a bright modern Korean hospital lobby with clean white marble floors, large windows letting in natural light, and a modern reception area. A friendly Korean nurse in white uniform standing behind a sleek reception desk. Green indoor plants and comfortable waiting chairs visible. No signs, no text, no words, no watermarks anywhere. Shot with 24mm wide angle lens, bright natural lighting, 16:9 format.'
  },
  {
    filename: '04_howworks.png',
    prompt: 'Photorealistic photograph, no text or words anywhere: A Korean male doctor in a white coat with a stethoscope sitting at a modern desk, warmly explaining medical documents to an elderly Korean male patient sitting across from him. Clean medical examination room with modern equipment softly blurred in background. Warm professional lighting. No signs, no text, no words, no watermarks. Shot with 50mm lens, soft lighting, 16:9 format.'
  },
  {
    filename: '06_hospital_map.png',
    prompt: 'Photorealistic photograph, no text or words in image: Aerial drone view of a modern Korean city with multiple hospital and medical center buildings visible among residential areas and green parks. Clear blue sky with soft clouds. Modern urban Korean landscape showing healthcare accessibility across the city. No signs, no text, no words, no watermarks visible. Shot with drone camera, bright daylight, 16:9 format.'
  },
  {
    filename: '07_target.png',
    prompt: 'Photorealistic photograph, no text or letters anywhere: A warm scene in a Korean government office. A kind middle-aged Korean woman in a navy blazer is explaining documents across a desk to an elderly Korean male veteran. Documents and a telephone are on the desk. Korean flag in background. Professional warm atmosphere. No signs, no text, no words, no watermarks. Shot with 50mm lens, warm indoor lighting, 16:9 format.'
  },
  {
    filename: '09_documents.png',
    prompt: 'Photorealistic photograph, absolutely no text or letters: A neatly organized stack of official medical documents and certificates on a clean white desk. A red official seal stamp, a professional pen, stethoscope, and reading glasses arranged beside the papers. Clean medical office setting. Soft directional lighting. No text visible on documents, no words, no watermarks. Shot with 50mm macro lens, studio lighting, 16:9 format.'
  }
];

function generateImage(prompt, filename) {
  return new Promise((resolve, reject) => {
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
                console.log(`  [GEN] ${filename} raw: ${(buf.length/1024).toFixed(0)}KB`);
                resolve(buf);
                return;
              }
            }
          }
          console.log(`  [WARN] ${filename} no image`);
          resolve(null);
        } catch(e) { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(120000, () => { req.destroy(); resolve(null); });
    req.write(body);
    req.end();
  });
}

async function resizeAndSave(inputBuffer, filePath, maxWidth = 800) {
  const result = await sharp(inputBuffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true })
    .toBuffer();

  // Save as .png extension but actually JPEG (or change to .jpg)
  // Let's keep png but use PNG compression
  const pngResult = await sharp(inputBuffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();

  // Use whichever is smaller
  const finalBuffer = pngResult.length < result.length ? pngResult : result;
  const ext = pngResult.length < result.length ? 'png' : 'jpg';

  // Always save as PNG for consistency
  const optimized = await sharp(inputBuffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();

  fs.writeFileSync(filePath, optimized);
  return optimized.length;
}

async function main() {
  console.log('=== Step 1: Regenerate text-heavy images ===\n');

  for (let i = 0; i < regenPrompts.length; i += 3) {
    const batch = regenPrompts.slice(i, i + 3);
    const results = await Promise.all(batch.map(async (item) => {
      const buf = await generateImage(item.prompt, item.filename);
      if (buf) {
        const filePath = path.join(IMG_DIR, item.filename);
        const newSize = await resizeAndSave(buf, filePath);
        console.log(`  [OK] ${item.filename}: ${(newSize/1024).toFixed(0)}KB`);
      }
      return buf;
    }));
    if (i + 3 < regenPrompts.length) {
      console.log('  Waiting 3s...');
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log('\n=== Step 2: Resize remaining images ===\n');

  const allFiles = ['01_hero.png','02_before.png','02_after.png','03_policy.png','04_howworks.png',
                    '05_benefits.png','06_hospital_map.png','07_target.png','08_faq.png',
                    '09_documents.png','10_cta.png'];

  for (const filename of allFiles) {
    const filePath = path.join(IMG_DIR, filename);
    if (!fs.existsSync(filePath)) continue;

    const original = fs.readFileSync(filePath);
    const originalSize = original.length;

    // Check if already optimized (regenerated ones)
    const metadata = await sharp(original).metadata();
    if (metadata.width <= 800) {
      console.log(`  [SKIP] ${filename}: already ${metadata.width}px wide, ${(originalSize/1024).toFixed(0)}KB`);
      continue;
    }

    const newSize = await resizeAndSave(original, filePath);
    console.log(`  [RESIZE] ${filename}: ${metadata.width}px→800px, ${(originalSize/1024).toFixed(0)}KB→${(newSize/1024).toFixed(0)}KB`);
  }

  // Also clean up old unused images
  const oldFiles = ['family_happy.png','golf_recovery.png','hero_product.png',
                    'relaxation_person.png','technology_detail.png','wellness_morning.png'];
  for (const f of oldFiles) {
    const p = path.join(IMG_DIR, f);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log(`  [DEL] ${f} (unused)`);
    }
  }

  console.log('\n=== Final sizes ===');
  let totalSize = 0;
  for (const filename of allFiles) {
    const filePath = path.join(IMG_DIR, filename);
    if (fs.existsSync(filePath)) {
      const size = fs.statSync(filePath).size;
      totalSize += size;
      console.log(`  ${filename}: ${(size/1024).toFixed(0)}KB`);
    }
  }
  console.log(`  TOTAL: ${(totalSize/1024/1024).toFixed(1)}MB`);
}

main().catch(console.error);

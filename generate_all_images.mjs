import https from 'https';
import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyCHwlyhqCx2EWkouIsdqFTwLiA5HagpUKE';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`;
const OUTPUT_DIR = path.join(process.cwd(), 'design', 'images');

const imagePrompts = [
  {
    filename: '01_hero.png',
    prompt: 'Photorealistic 4K photograph: A warm sunny morning at a modern Korean general hospital entrance. An elderly Korean male veteran in his 70s with distinguished gray hair, wearing a neat dark navy jacket, walks confidently toward the hospital entrance. His adult daughter gently holds his arm, both smiling warmly. Cherry blossom trees in full bloom frame the scene with soft pink petals floating in the air. The hospital building is sleek, modern architecture with large glass windows and a clean white facade. Warm golden morning sunlight creates a hopeful atmosphere. Shot with Sony A7R IV, 35mm lens, f/2.8, natural lighting. Wide format 16:9.'
  },
  {
    filename: '02_before.png',
    prompt: 'Photorealistic 4K photograph: A tired elderly Korean man in his 70s sitting alone at a rural bus station on a cold, overcast winter day. He wears a thick padded jacket and leans on a walking cane. A small overnight bag sits beside him. The bus station is simple and weathered. In the background, a road sign indicates a long distance to Seoul. His expression shows fatigue and resignation. Muted gray-blue color tones. Shot with Canon EOS R5, 50mm lens, f/4, overcast natural lighting. Portrait format 4:5.'
  },
  {
    filename: '02_after.png',
    prompt: 'Photorealistic 4K photograph: The same elderly Korean man, now smiling brightly, walking into a clean modern local hospital just a short walk from his home. His adult son walks beside him carrying a small folder of documents. The hospital entrance is welcoming with automatic glass doors and a well-maintained garden. It is a beautiful spring day with cherry blossoms and warm sunshine. Green trees and flowers line the short path from a nearby residential area visible in the background. Warm, cheerful color palette. Shot with Sony A7R IV, 35mm lens, f/2.8, golden hour lighting. Portrait format 4:5.'
  },
  {
    filename: '03_policy.png',
    prompt: 'Photorealistic 4K photograph: A professional modern hospital interior lobby. Clean white marble floors, bright LED lighting, and a large digital information board on the wall displaying Korean text. A friendly Korean female nurse in a crisp white uniform stands at a modern reception counter, ready to assist. The counter has a subtle Korean government emblem. Clean, trustworthy, professional medical environment. Shot with Canon EOS R5, 24mm wide angle lens, f/5.6, bright indoor lighting. Wide format 16:9.'
  },
  {
    filename: '04_howworks.png',
    prompt: 'Photorealistic 4K photograph: A Korean medical professional (male doctor in white coat with stethoscope around neck) sitting at a clean modern desk, reviewing medical documents with an elderly Korean male patient. The doctor is pointing at a form on the desk, explaining the process with a warm, reassuring smile. Medical certificates and official documents are visible on the desk. Modern examination room with medical equipment in the soft background. Bright, professional atmosphere. Shot with Nikon Z9, 50mm lens, f/2.8, soft studio lighting. Wide format 16:9.'
  },
  {
    filename: '05_benefits.png',
    prompt: 'Photorealistic 4K photograph: An aerial view of a modern Korean cityscape showing multiple hospital buildings spread across the urban landscape. Various hospital signs are visible on different buildings. The city has a mix of residential apartments and commercial areas. Green parks and trees are interspersed throughout. A clear blue sky with soft white clouds. The image conveys the idea of healthcare accessibility everywhere in the city. Shot with DJI Mavic 3, 24mm equivalent, f/2.8, bright daylight. Wide format 16:9.'
  },
  {
    filename: '06_hospital_map.png',
    prompt: 'Photorealistic 4K photograph: A large illuminated map of South Korea mounted on a modern information display wall inside a government office. The map shows all major cities and provinces clearly labeled in Korean. Multiple blue and green LED pin markers are lit up across the map, representing 140 hospital locations spread throughout the country. The display is clean and modern with a dark navy blue background. Government emblem visible in the corner. Shot with Sony A7R IV, 35mm lens, f/4, indoor LED lighting. Portrait format 3:4.'
  },
  {
    filename: '07_target.png',
    prompt: 'Photorealistic 4K photograph: A warm scene in a Korean government veterans affairs office. A kind middle-aged Korean female government employee wearing a formal navy blazer is explaining documents to an elderly Korean male veteran sitting across her desk. She is pointing at a checklist document. The office has Korean government flags and certificates on the wall. A phone with the number 1577-0606 is visible on the desk. Professional, warm, trustworthy atmosphere. Shot with Canon EOS R5, 50mm lens, f/2.8, warm indoor lighting. Wide format 16:9.'
  },
  {
    filename: '08_faq.png',
    prompt: 'Photorealistic 4K photograph: Close-up of elderly Korean hands holding a brochure or pamphlet about veterans medical services. The pamphlet has Korean text and official government design with blue and red colors. Reading glasses rest on the table nearby. A cup of warm green tea is beside the pamphlet. Soft natural light from a window creates a warm, intimate atmosphere. The scene conveys careful reading and understanding of important information. Shot with Sony A7R IV, 85mm macro, f/2.8, window light. Wide format 16:9.'
  },
  {
    filename: '09_documents.png',
    prompt: 'Photorealistic 4K photograph: A neatly organized stack of official Korean medical documents and certificates on a clean white desk. The top document shows a medical diagnosis certificate form with Korean text, an official red seal stamp, and a doctor signature. A professional fountain pen, a stethoscope, and reading glasses are arranged beside the documents. Clean, professional medical office setting. Soft directional lighting highlights the documents. Shot with Canon EOS R5, 50mm macro, f/4, studio lighting. Wide format 16:9.'
  },
  {
    filename: '10_cta.png',
    prompt: 'Photorealistic 4K photograph: A heartwarming scene of an elderly Korean veteran couple walking together on a tree-lined path near a modern Korean hospital on a beautiful spring day. The man wears a small veterans pin on his jacket lapel. Cherry blossom petals drift gently in warm sunlight. They hold hands and smile peacefully. The modern hospital building is visible in the soft background. Golden hour warm lighting creates a hopeful, dignified atmosphere. Shot with Sony A7R IV, 85mm lens, f/1.8, golden hour natural light. Wide format 16:9.'
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
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.candidates && json.candidates[0]?.content?.parts) {
            for (const part of json.candidates[0].content.parts) {
              if (part.inlineData) {
                const imgBuffer = Buffer.from(part.inlineData.data, 'base64');
                const filePath = path.join(OUTPUT_DIR, filename);
                fs.writeFileSync(filePath, imgBuffer);
                console.log(`[OK] ${filename} — ${(imgBuffer.length / 1024).toFixed(0)}KB`);
                resolve(filePath);
                return;
              }
            }
            console.log(`[WARN] ${filename} — no image in response`);
            if (json.candidates[0]?.content?.parts?.[0]?.text) {
              console.log(`  Text: ${json.candidates[0].content.parts[0].text.substring(0, 200)}`);
            }
            resolve(null);
          } else {
            console.log(`[ERR] ${filename} — ${JSON.stringify(json).substring(0, 300)}`);
            resolve(null);
          }
        } catch (e) {
          console.log(`[ERR] ${filename} — parse error: ${e.message}`);
          resolve(null);
        }
      });
    });

    req.on('error', (e) => {
      console.log(`[ERR] ${filename} — request error: ${e.message}`);
      resolve(null);
    });

    req.setTimeout(120000, () => {
      req.destroy();
      console.log(`[ERR] ${filename} — timeout`);
      resolve(null);
    });

    req.write(body);
    req.end();
  });
}

async function main() {
  console.log(`Starting image generation — ${imagePrompts.length} images`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  // Generate in batches of 3 to avoid rate limits
  for (let i = 0; i < imagePrompts.length; i += 3) {
    const batch = imagePrompts.slice(i, i + 3);
    console.log(`\n--- Batch ${Math.floor(i/3) + 1} (${batch.map(b => b.filename).join(', ')}) ---`);

    const promises = batch.map(item => generateImage(item.prompt, item.filename));
    await Promise.all(promises);

    // Small delay between batches
    if (i + 3 < imagePrompts.length) {
      console.log('Waiting 3s before next batch...');
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log('\n=== Image generation complete ===');
}

main().catch(console.error);

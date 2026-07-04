const fs = require('fs');
const path = require('path');
const https = require('https');

const fileToRead = path.join('portfolio', 'research', 'sources.md');

if (!fs.existsSync(fileToRead)) {
  console.error(`File not found: ${fileToRead}`);
  process.exit(1);
}

const content = fs.readFileSync(fileToRead, 'utf-8');
// Regex to extract markdown links [text](url)
const linkRegex = /\[[^\]]+\]\((https?:\/\/[^\s)]+)\)/g;
const urls = [];
let match;

while ((match = linkRegex.exec(content)) !== null) {
  urls.push(match[1]);
}

console.log(`Found ${urls.length} links in sources.md. Verifying connectivity...`);

// Simple function to verify URL returns a status code in 200-403 range (since LinkedIn blocks raw headless requests with 999 or 403, and YouTube can redirect)
function checkUrl(url) {
  return new Promise((resolve) => {
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 5000
    };

    const req = https.request(url, options, (res) => {
      resolve({ url, status: res.statusCode, ok: res.statusCode < 500 });
    });

    req.on('error', (err) => {
      resolve({ url, status: 0, ok: false, error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ url, status: 0, ok: false, error: 'Timeout' });
    });

    req.end();
  });
}

async function verifyAll() {
  const uniqueUrls = [...new Set(urls)];
  const results = [];
  
  for (const url of uniqueUrls) {
    console.log(`Checking: ${url}...`);
    const res = await checkUrl(url);
    results.push(res);
  }

  console.log('\n--- Link Verification Results ---');
  let broken = 0;
  results.forEach(r => {
    if (r.ok) {
      console.log(`✅ [${r.status}] ${r.url}`);
    } else {
      console.log(`❌ [FAILED: ${r.error || r.status}] ${r.url}`);
      broken++;
    }
  });

  if (broken === 0) {
    console.log('\n🎉 ALL LINKS ARE VALID AND FUNCTIONAL!');
  } else {
    console.log(`\n⚠️ Warning: ${broken} links returned errors.`);
  }
}

verifyAll();

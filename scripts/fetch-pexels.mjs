/**
 * Fetch real product images from Pexels API.
 * Usage: node scripts/fetch-pexels.mjs <PEXELS_API_KEY>
 * Outputs JSON: { "PRODUCT_ID": "image_url", ... }
 */
import { writeFileSync } from 'fs'

const API_KEY = process.argv[2]
if (!API_KEY) {
  console.error('Usage: node scripts/fetch-pexels.mjs <PEXELS_API_KEY>')
  process.exit(1)
}

// Each product → Pexels search query (Vietnamese + English for best results)
const PRODUCT_QUERIES = {
  AT001: 'cotton t-shirt basic white',
  AT002: 'oversize t-shirt streetwear',
  AT003: 'polo shirt men',
  AS001: 'white dress shirt formal',
  AS002: 'hawaii floral shirt',
  QJ001: 'slim fit jeans men',
  QJ002: 'straight fit vintage jeans',
  QS001: 'beige chino shorts product flatlay',
  QS002: 'sport shorts gym',
  AK001: 'black bomber jacket fashion outfit',
  AK002: 'hoodie sweatshirt',
  G001: 'white sneaker shoes',
  PK001: 'canvas tote bag',
  PK002: 'baseball cap',
  PK003: 'cotton socks pack',
  DV001: 'casual dress women',
}

async function fetchPhoto(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=square&size=medium&locale=vi-VN`
  const res = await fetch(url, {
    headers: { Authorization: API_KEY },
  })
  if (!res.ok) {
    console.error(`  ⚠️  HTTP ${res.status} for "${query}"`)
    return null
  }
  const data = await res.json()
  if (data.photos && data.photos.length > 0) {
    return data.photos[0].src.medium // 350px, good balance
  }
  console.error(`  ⚠️  No results for "${query}"`)
  return null
}

async function main() {
  console.log('📸 Fetching Pexels images for 17 products...\n')
  const results = {}
  const entries = Object.entries(PRODUCT_QUERIES)

  for (let i = 0; i < entries.length; i++) {
    const [id, query] = entries[i]
    const n = `${i + 1}/${entries.length}`
    process.stdout.write(`  ${n} ${id} → "${query}" ... `)
    const url = await fetchPhoto(query)
    if (url) {
      results[id] = url
      console.log('✅')
    } else {
      console.log('❌')
    }
    // Rate limit: Pexels free = 200 req/hour. 17 req is fine.
    await new Promise((r) => setTimeout(r, 200))
  }

  console.log(`\n✅ Done: ${Object.keys(results).length}/${entries.length} images fetched.\n`)
  console.log(JSON.stringify(results, null, 2))

  // Also write to file
  writeFileSync('scripts/pexels-urls.json', JSON.stringify(results, null, 2))
  console.log('\n📁 Saved to scripts/pexels-urls.json')
}

main().catch((err) => {
  console.error('Fatal:', err.message)
  process.exit(1)
})

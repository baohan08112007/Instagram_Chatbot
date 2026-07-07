/**
 * Fix duplicate Pexels images — different queries for same-looking products.
 */
import { readFileSync, writeFileSync } from 'fs'

const API_KEY = process.argv[2]
if (!API_KEY) {
  console.error('Usage: node scripts/fix-pexels-dupes.mjs <PEXELS_API_KEY>')
  process.exit(1)
}

async function fetchPhoto(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=square&size=medium`
  const res = await fetch(url, { headers: { Authorization: API_KEY } })
  if (!res.ok) return null
  const data = await res.json()
  return data.photos?.[0]?.src?.medium || null
}

const FIXES = {
  PK003: 'white cotton ankle socks product studio',
  QS001: 'khaki chino shorts menswear flatlay',
  AK001: 'black bomber jacket leather men street style',
}

async function main() {
  const urls = JSON.parse(readFileSync('scripts/pexels-urls.json', 'utf-8'))
  console.log('Fixing 3 duplicate images...\n')

  for (const [id, query] of Object.entries(FIXES)) {
    process.stdout.write(`  ${id} → "${query}" ... `)
    const url = await fetchPhoto(query)
    if (url) {
      urls[id] = url
      console.log('✅')
    } else {
      console.log('❌')
    }
    await new Promise((r) => setTimeout(r, 300))
  }

  writeFileSync('scripts/pexels-urls.json', JSON.stringify(urls, null, 2))
  console.log('\n✅ Fixed. Saved to scripts/pexels-urls.json')
  console.log(JSON.stringify(urls, null, 2))
}

main().catch((err) => {
  console.error('Fatal:', err.message)
  process.exit(1)
})

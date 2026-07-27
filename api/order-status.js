import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { orderCode } = req.query

  if (!orderCode) {
    return res.status(400).json({ error: 'Missing orderCode' })
  }

  const raw = await redis.get(`order:${orderCode}`)
  if (!raw) {
    return res.status(200).json({ status: 'PENDING' })
  }

  const data = typeof raw === 'string' ? JSON.parse(raw) : raw
  return res.status(200).json(data)
}

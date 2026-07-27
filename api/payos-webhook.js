import { PayOS } from '@payos/node'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

const STATUS_TTL_SECONDS = 3600

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const payos = new PayOS({
      clientId: process.env.PAYOS_CLIENT_ID,
      apiKey: process.env.PAYOS_API_KEY,
      checksumKey: process.env.PAYOS_CHECKSUM_KEY,
    })
    const webhookData = await payos.webhooks.verify(req.body)

    await redis.set(
      `order:${webhookData.orderCode}`,
      JSON.stringify({
        status: webhookData.code === '00' ? 'PAID' : 'FAILED',
        amount: webhookData.amount,
        updatedAt: Date.now(),
      }),
      { ex: STATUS_TTL_SECONDS },
    )

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('PayOS webhook verify error:', error)
    return res.status(400).json({ error: 'Invalid webhook signature' })
  }
}

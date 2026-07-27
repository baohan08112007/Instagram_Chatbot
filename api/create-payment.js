import { PayOS } from '@payos/node'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { amount, description, items, returnUrl, cancelUrl } = req.body || {}

  if (!amount || !description) {
    return res.status(400).json({ error: 'Missing amount or description' })
  }

  if (!process.env.PAYOS_CLIENT_ID || !process.env.PAYOS_API_KEY || !process.env.PAYOS_CHECKSUM_KEY) {
    console.error('Missing PayOS env vars')
    return res.status(500).json({ error: 'PayOS not configured' })
  }

  const orderCode = Date.now() % 1_000_000_000

  try {
    const payos = new PayOS({
      clientId: process.env.PAYOS_CLIENT_ID,
      apiKey: process.env.PAYOS_API_KEY,
      checksumKey: process.env.PAYOS_CHECKSUM_KEY,
    })
    const paymentLink = await payos.paymentRequests.create({
      orderCode,
      amount: Math.round(amount),
      description: description.slice(0, 25),
      items: items || [],
      returnUrl: returnUrl || `${req.headers.origin}/payment-success`,
      cancelUrl: cancelUrl || `${req.headers.origin}/payment-cancel`,
    })

    return res.status(200).json({
      orderCode,
      checkoutUrl: paymentLink.checkoutUrl,
      qrCode: paymentLink.qrCode,
    })
  } catch (error) {
    console.error('PayOS create payment error:', error)
    return res.status(500).json({ error: 'Failed to create payment link' })
  }
}

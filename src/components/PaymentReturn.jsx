/**
 * Shown in the PayOS checkout tab after redirect (returnUrl/cancelUrl).
 * PayOS appends ?code=00&id=...&cancel=false&status=PAID|CANCELLED&orderCode=...
 */
export default function PaymentReturn({ status, cancel }) {
  const success = status === 'PAID' && cancel !== 'true'

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-ig-canvas-soft px-4">
      <div className="w-full max-w-[380px] bg-ig-canvas border border-ig-border rounded-ig-lg p-8 text-center">
        <div
          className={`mx-auto mb-4 w-16 h-16 rounded-ig-avatar flex items-center justify-center text-3xl ${
            success ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          {success ? '✅' : '⚠️'}
        </div>
        <h1 className="text-fs-ig-title text-ig-ink">
          {success ? 'Thanh toán thành công' : 'Thanh toán chưa hoàn tất'}
        </h1>
        <p className="text-fs-ig-body text-ig-body mt-2">
          {success
            ? 'Cảm ơn bạn! Shop đã nhận được đơn hàng. Bạn có thể đóng tab này và quay lại cửa sổ chat.'
            : 'Đơn hàng đã bị hủy hoặc chưa thanh toán. Bạn có thể đóng tab này và thử lại từ cửa sổ chat.'}
        </p>
        <button
          onClick={() => window.close()}
          className="mt-6 w-full bg-ig-primary text-white text-fs-ig-button font-semibold rounded-ig-md py-2.5 hover:bg-ig-primary-hover transition-colors"
        >
          Đóng tab
        </button>
      </div>
    </div>
  )
}

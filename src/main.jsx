import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PaymentReturn from './components/PaymentReturn'
import './index.css'

// PayOS redirects the checkout tab back here with ?code=00&status=PAID&cancel=false&...
const paymentParams = new URLSearchParams(window.location.search)
const Root = paymentParams.has('status') && paymentParams.has('code')
  ? <PaymentReturn status={paymentParams.get('status')} cancel={paymentParams.get('cancel')} />
  : <App />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {Root}
  </React.StrictMode>,
)

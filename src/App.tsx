import { useState } from 'react'
import { useCotacao } from './hooks/useCotacao'
import { AmountInput } from './components/AmountInput'
import { PaymentOutput } from './components/PaymentOutput'
import { RateDisplay } from './components/RateDisplay'

export default function App() {
  const [amount, setAmount] = useState<number | null>(null)
  const { rawAsk, effectiveRate, timestamp, loading, error, fetchRate, setManualRate } = useCotacao()

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 16px 48px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        marginBottom: 32,
        marginTop: 16,
      }}>
        <img
          src="/logo.svg"
          alt="BIZ Rent Car"
          style={{ height: 48, width: 'auto' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#1B2D4F',
            letterSpacing: '-0.02em',
          }}>
            Payment Text Generator
          </h1>
          <p style={{
            fontSize: 14,
            color: '#8FA3C0',
            marginTop: 4,
          }}>
            Gere o texto de pagamento para enviar ao cliente
          </p>
        </div>
      </div>

      {/* Main card */}
      <div style={{
        width: '100%',
        maxWidth: 480,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(27,45,79,0.08)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>
        {/* Rate display */}
        <div style={{
          background: '#F7F9FC',
          borderRadius: 10,
          padding: '12px 16px',
        }}>
          <RateDisplay
            rawAsk={rawAsk}
            effectiveRate={effectiveRate}
            timestamp={timestamp}
            loading={loading}
            error={error}
            onRefresh={fetchRate}
            onManualRate={setManualRate}
          />
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #EEF2F8' }} />

        {/* Amount input */}
        <AmountInput value={amount} onChange={setAmount} />

        {/* Divider */}
        <div style={{ borderTop: '1px solid #EEF2F8' }} />

        {/* Output */}
        <PaymentOutput total={amount} rate={effectiveRate} />
      </div>

      {/* Footer */}
      <p style={{
        marginTop: 32,
        fontSize: 12,
        color: '#B0BDD0',
        textAlign: 'center',
      }}>
        BIZ Rent Car · Ferramenta interna · Cotação via AwesomeAPI (UOL) + 4%
      </p>
    </div>
  )
}

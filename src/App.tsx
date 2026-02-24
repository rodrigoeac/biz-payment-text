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
      padding: '12px 16px 16px',
    }}>
      {/* Header — compact: logo inline with title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
      }}>
        <img
          src="/logo.svg"
          alt="BIZ Rent Car"
          style={{ height: 28, width: 'auto' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <h1 style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#1B2D4F',
          letterSpacing: '-0.01em',
        }}>
          Payment Text Generator
        </h1>
      </div>

      {/* Main card */}
      <div style={{
        width: '100%',
        maxWidth: 480,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(27,45,79,0.08)',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        {/* Rate display */}
        <div style={{
          background: '#F7F9FC',
          borderRadius: 10,
          padding: '10px 14px',
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

        <div style={{ borderTop: '1px solid #EEF2F8' }} />

        <AmountInput value={amount} onChange={setAmount} />

        <div style={{ borderTop: '1px solid #EEF2F8' }} />

        <PaymentOutput total={amount} rate={effectiveRate} />
      </div>
    </div>
  )
}

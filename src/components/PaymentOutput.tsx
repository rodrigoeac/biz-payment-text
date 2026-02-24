import { useState } from 'react'
import { buildSinalText, buildSaldoText, formatUSD, formatBRL } from '../utils/format'
import { CopyButton } from './CopyButton'

interface PaymentOutputProps {
  total: number | null
  rate: number | null
}

type Mode = 'sinal' | 'saldo'

export function PaymentOutput({ total, rate }: PaymentOutputProps) {
  const [mode, setMode] = useState<Mode>('sinal')

  const isReady = total !== null && total > 0 && rate !== null

  const outputText = isReady
    ? mode === 'sinal'
      ? buildSinalText(total, rate)
      : buildSaldoText(total, rate)
    : ''

  const sinal = isReady ? total * 0.2 : null
  const saldo = isReady ? total * 0.8 : null
  const sinalBRL = isReady && rate ? (total * 0.2) * rate : null
  const saldoBRL = isReady && rate ? (total * 0.8) * rate : null

  const btnBase: React.CSSProperties = {
    flex: 1,
    padding: '9px 16px',
    border: '2px solid',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.18s',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Mode selector */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => setMode('sinal')}
          style={{
            ...btnBase,
            background: mode === 'sinal' ? '#C8A96E' : 'transparent',
            borderColor: '#C8A96E',
            color: mode === 'sinal' ? '#fff' : '#C8A96E',
          }}
        >
          Sinal (20%)
        </button>
        <button
          onClick={() => setMode('saldo')}
          style={{
            ...btnBase,
            background: mode === 'saldo' ? '#1B2D4F' : 'transparent',
            borderColor: '#1B2D4F',
            color: mode === 'saldo' ? '#fff' : '#1B2D4F',
          }}
        >
          Saldo (80%)
        </button>
      </div>

      {/* Preview breakdown */}
      {isReady && (
        <div style={{
          background: '#F7F9FC',
          border: '1px solid #E2E8F2',
          borderRadius: 10,
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          <BreakdownRow
            label="Total reserva"
            usd={formatUSD(total!)}
          />
          <div style={{ borderTop: '1px solid #E2E8F2', margin: '2px 0' }} />
          <BreakdownRow
            label="Sinal 20%"
            usd={formatUSD(sinal!)}
            brl={mode === 'sinal' ? formatBRL(sinalBRL!) : undefined}
            checked={mode === 'saldo'}
          />
          <BreakdownRow
            label="Saldo 80%"
            usd={formatUSD(saldo!)}
            brl={mode === 'saldo' ? formatBRL(saldoBRL!) : undefined}
          />
        </div>
      )}

      {/* Text output */}
      <div style={{
        background: '#fff',
        border: '1.5px solid #D8E0EC',
        borderRadius: 10,
        padding: 12,
        minHeight: 130,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {isReady ? (
          <pre style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            lineHeight: 1.55,
            color: '#1B2D4F',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            flex: 1,
            margin: 0,
          }}>
            {outputText}
          </pre>
        ) : (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#B0BDD0',
            fontSize: 14,
            fontStyle: 'italic',
          }}>
            Digite o valor da reserva para gerar o texto
          </div>
        )}
      </div>

      <CopyButton text={outputText} disabled={!isReady} />
    </div>
  )
}

function BreakdownRow({
  label,
  usd,
  brl,
  checked,
}: {
  label: string
  usd: string
  brl?: string
  checked?: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
      <span style={{ fontSize: 13, color: '#6B7E9F', display: 'flex', alignItems: 'center', gap: 6 }}>
        {checked && <span style={{ color: '#2D6A4F' }}>✅</span>}
        {label}
      </span>
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1B2D4F' }}>{usd}</span>
        {brl && (
          <span style={{ fontSize: 13, color: '#C8A96E', fontWeight: 600, marginLeft: 6 }}>
            / {brl}
          </span>
        )}
      </div>
    </div>
  )
}

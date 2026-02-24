import { useState } from 'react'
import { formatBRL } from '../utils/format'

interface RateDisplayProps {
  rawAsk: number | null
  effectiveRate: number | null
  timestamp: Date | null
  loading: boolean
  error: string | null
  onRefresh: () => void
  onManualRate: (rate: number) => void
}

export function RateDisplay({
  rawAsk,
  effectiveRate,
  timestamp,
  loading,
  error,
  onRefresh,
  onManualRate,
}: RateDisplayProps) {
  const [showManual, setShowManual] = useState(false)
  const [manualInput, setManualInput] = useState('')

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault()
    const val = parseFloat(manualInput.replace(',', '.'))
    if (!isNaN(val) && val > 0) {
      onManualRate(val)
      setShowManual(false)
    }
  }

  const timeStr = timestamp
    ? timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    : null

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {loading ? (
            <span style={{ fontSize: 13, color: '#8FA3C0', display: 'flex', alignItems: 'center', gap: 6 }}>
              <SpinnerIcon />
              Buscando cotação...
            </span>
          ) : error ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, color: '#D9534F' }}>⚠ Erro: {error}</span>
            </div>
          ) : effectiveRate ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#1B2D4F',
              }}>
                {formatBRL(effectiveRate)} / USD
              </span>
              <span style={{
                fontSize: 12,
                color: '#8FA3C0',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}>
                <span style={{
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#22C55E',
                }} />
                live · {timeStr} · ask {formatBRL(rawAsk!)} + 4%
              </span>
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onRefresh}
            disabled={loading}
            title="Atualizar cotação"
            style={{
              padding: '6px 10px',
              background: 'transparent',
              border: '1px solid #D8E0EC',
              borderRadius: 8,
              cursor: loading ? 'not-allowed' : 'pointer',
              color: '#6B7E9F',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span style={{ display: 'inline-block', transform: loading ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s' }}>↻</span>
            Atualizar
          </button>
          <button
            onClick={() => setShowManual(v => !v)}
            title="Inserir cotação manual"
            style={{
              padding: '6px 10px',
              background: 'transparent',
              border: '1px solid #D8E0EC',
              borderRadius: 8,
              cursor: 'pointer',
              color: '#6B7E9F',
              fontSize: 14,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Manual
          </button>
        </div>
      </div>

      {showManual && (
        <form onSubmit={handleManualSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1.5px solid #C8A96E',
            borderRadius: 8,
            padding: '0 12px',
            background: '#fff',
          }}>
            <span style={{ fontSize: 13, color: '#8FA3C0', marginRight: 4 }}>USD 1 =</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="5.85"
              value={manualInput}
              onChange={e => setManualInput(e.target.value)}
              autoFocus
              style={{
                border: 'none',
                outline: 'none',
                fontSize: 14,
                fontWeight: 600,
                color: '#1B2D4F',
                background: 'transparent',
                width: 80,
                padding: '8px 0',
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <span style={{ fontSize: 13, color: '#8FA3C0', marginLeft: 2 }}>BRL</span>
          </div>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              background: '#C8A96E',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Usar
          </button>
          <button
            type="button"
            onClick={() => setShowManual(false)}
            style={{
              padding: '8px 12px',
              background: 'transparent',
              color: '#8FA3C0',
              border: '1px solid #D8E0EC',
              borderRadius: 8,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  )
}

function SpinnerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 12 12;360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}

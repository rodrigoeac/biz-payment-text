import { useState, useCallback } from 'react'

interface AmountInputProps {
  value: number | null
  onChange: (value: number | null) => void
}

export function AmountInput({ value, onChange }: AmountInputProps) {
  const [raw, setRaw] = useState(value ? String(value) : '')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only digits and one decimal point
    const cleaned = e.target.value.replace(/[^\d.]/g, '').replace(/^(\d*\.?\d*).*/, '$1')
    setRaw(cleaned)
    const num = parseFloat(cleaned)
    onChange(isNaN(num) || cleaned === '' ? null : num)
  }, [onChange])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontSize: 13,
        fontWeight: 600,
        color: '#6B7E9F',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        Valor total da reserva (USD)
      </label>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        border: '1.5px solid #D8E0EC',
        borderRadius: 10,
        padding: '0 16px',
        transition: 'border-color 0.15s',
      }}
        onFocus={() => {}}
        onBlur={() => {}}
      >
        <span style={{
          fontSize: 22,
          fontWeight: 700,
          color: '#1B2D4F',
          marginRight: 6,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          userSelect: 'none',
        }}>$</span>
        <input
          type="text"
          inputMode="decimal"
          placeholder="1,000.00"
          value={raw}
          onChange={handleChange}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: 22,
            fontWeight: 600,
            color: '#1B2D4F',
            background: 'transparent',
            padding: '14px 0',
            fontFamily: "'DM Sans', sans-serif",
            minWidth: 0,
          }}
        />
        <span style={{
          fontSize: 14,
          fontWeight: 500,
          color: '#8FA3C0',
          marginLeft: 8,
          flexShrink: 0,
        }}>USD</span>
      </div>
    </div>
  )
}

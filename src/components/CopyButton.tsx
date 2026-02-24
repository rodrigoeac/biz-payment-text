import { useState, useCallback } from 'react'

interface CopyButtonProps {
  text: string
  disabled?: boolean
}

export function CopyButton({ text, disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    if (!text || disabled) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = text
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [text, disabled])

  return (
    <button
      onClick={handleCopy}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: '100%',
        padding: '13px 24px',
        background: disabled ? '#E8EDF5' : copied ? '#2D6A4F' : '#1B2D4F',
        color: disabled ? '#8FA3C0' : '#fff',
        border: 'none',
        borderRadius: 10,
        fontSize: 15,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: '0.01em',
      }}
    >
      {copied ? (
        <>
          <span style={{ fontSize: 16 }}>✓</span>
          Copiado!
        </>
      ) : (
        <>
          <span style={{ fontSize: 15 }}>📋</span>
          Copiar texto
        </>
      )}
    </button>
  )
}

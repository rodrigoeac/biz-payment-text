import { useState, useEffect, useCallback } from 'react'

export interface CotacaoState {
  rate: number | null
  rawAsk: number | null
  timestamp: Date | null
  loading: boolean
  error: string | null
  manualRate: number | null
}

const SPREAD = 1.04
const FALLBACK_RATE = 5.5

export function useCotacao() {
  const [state, setState] = useState<CotacaoState>({
    rate: null,
    rawAsk: null,
    timestamp: null,
    loading: true,
    error: null,
    manualRate: null,
  })

  const fetchRate = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const res = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const ask = parseFloat(data.USDBRL.ask)
      if (isNaN(ask)) throw new Error('Invalid rate received')
      setState(prev => ({
        ...prev,
        rawAsk: ask,
        rate: ask * SPREAD,
        timestamp: new Date(),
        loading: false,
        error: null,
        manualRate: null,
      }))
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Falha ao buscar cotação',
        rate: prev.manualRate ?? FALLBACK_RATE * SPREAD,
      }))
    }
  }, [])

  useEffect(() => {
    fetchRate()
  }, [fetchRate])

  const setManualRate = useCallback((value: number) => {
    setState(prev => ({
      ...prev,
      manualRate: value,
      rate: value * SPREAD,
      error: null,
    }))
  }, [])

  const effectiveRate = state.manualRate
    ? state.manualRate * SPREAD
    : state.rate

  return { ...state, effectiveRate, fetchRate, setManualRate }
}

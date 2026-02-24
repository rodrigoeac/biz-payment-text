/** Format number as USD: $1,000.00 */
export function formatUSD(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/** Format number as BRL: R$ 1.000,00 */
export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/** Generate "Sinal" message text */
export function buildSinalText(total: number, rate: number): string {
  const sinal = total * 0.2
  const saldo = total * 0.8
  const sinalBRL = sinal * rate

  return [
    `• Total reserva: ${formatUSD(total)}`,
    ``,
    `• Sinal 20%: ${formatUSD(sinal)} / ${formatBRL(sinalBRL)}`,
    ``,
    `• Saldo na entrega do carro: ${formatUSD(saldo)}`,
    ``,
    `PIX: contact@bizrentcar.com`,
    `Favorecido: OMEUAPE`,
  ].join('\n')
}

/** Generate "Saldo" message text */
export function buildSaldoText(total: number, rate: number): string {
  const sinal = total * 0.2
  const saldo = total * 0.8
  const saldoBRL = saldo * rate

  return [
    `• Total reserva: ${formatUSD(total)}`,
    ``,
    `• Sinal 20% ✅ ${formatUSD(sinal)}`,
    ``,
    `• Saldo na entrega do carro: ${formatUSD(saldo)} / ${formatBRL(saldoBRL)}`,
    ``,
    `PIX: contact@bizrentcar.com`,
    `Favorecido: OMEUAPE`,
  ].join('\n')
}

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
    `• Total reserva: ${formatUSD(total)} USD`,
    ``,
    `• Sinal 20%: ${formatUSD(sinal)} USD / ${formatBRL(sinalBRL)} BRL`,
    ``,
    `• Saldo na entrega do carro: ${formatUSD(saldo)} USD`,
    ``,
    `PIX: contact@bizrentcar.com`,
    `Favorecido: OMEUAPE (nossa empresa no Brasil)`,
  ].join('\n')
}

/** Generate "Total BRL" message text — all values in both currencies */
export function buildTotalText(total: number, rate: number): string {
  const sinal = total * 0.2
  const saldo = total * 0.8
  const totalBRL = total * rate
  const sinalBRL = sinal * rate
  const saldoBRL = saldo * rate

  return [
    `• Total reserva: ${formatUSD(total)} USD / ${formatBRL(totalBRL)} BRL`,
    ``,
    `• Sinal 20%: ${formatUSD(sinal)} USD / ${formatBRL(sinalBRL)} BRL`,
    ``,
    `• Saldo na entrega do carro: ${formatUSD(saldo)} USD / ${formatBRL(saldoBRL)} BRL`,
    ``,
    `PIX: contact@bizrentcar.com`,
    `Favorecido: OMEUAPE (nossa empresa no Brasil)`,
  ].join('\n')
}

/** Generate "Saldo" message text */
export function buildSaldoText(total: number, rate: number): string {
  const sinal = total * 0.2
  const saldo = total * 0.8
  const saldoBRL = saldo * rate

  return [
    `• Total reserva: ${formatUSD(total)} USD`,
    ``,
    `• Sinal 20%: ${formatUSD(sinal)} USD ✅`,
    ``,
    `• Saldo na entrega do carro: ${formatUSD(saldo)} USD / ${formatBRL(saldoBRL)} BRL`,
    ``,
    `PIX: contact@bizrentcar.com`,
    `Favorecido: OMEUAPE (nossa empresa no Brasil)`,
  ].join('\n')
}

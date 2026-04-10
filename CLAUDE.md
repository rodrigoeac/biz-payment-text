# CLAUDE.md - BIZ Payment Text

> Part of **BIZ group** — parent: `~/biz-site/`

## Project Overview

Mini app that generates formatted payment text messages for BIZ Rent Car customers. Calculates sinal (20%) and saldo (80%) amounts with live USD/BRL conversion.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Inline styles with BIZ design tokens (no Tailwind)
- **Deploy**: Cloudflare Pages — https://biz-payment-text.pages.dev/

## Key Logic

- Sinal = 20%, Saldo = 80%
- Exchange: AwesomeAPI live rate + 4% spread, fallback R$ 5.50
- PIX: contact@bizrentcar.com | Favorecido: OMEUAPE

## Structure

```
biz-payment-text/
├── src/
│   ├── App.tsx           # Componente principal
│   ├── components/       # UI components
│   ├── hooks/            # Custom hooks (câmbio, etc.)
│   └── utils/            # Cálculos e formatação
├── public/
├── vite.config.ts
└── dist/                 # Build output
```

## Deploy

```bash
npm run build  # → dist/
# Cloudflare Pages auto-deploys from GitHub
```

## Development

```bash
npm install
npm run dev    # Vite dev server
npm run build  # Build produção
```

## Rules

- Sinal sempre 20%, Saldo sempre 80% — não alterar proporções
- Spread de 4% sobre cotação `ask` — consistente com tolls-app
- PIX: contact@bizrentcar.com — não alterar sem instrução
- Inline styles com design tokens BIZ — não adicionar Tailwind/CSS externo

## Status Atual

Em produção em https://biz-payment-text.pages.dev/ — funcional e estável.


import {
  Asset,
  Candle,
  PredictivePoint,
  OrderBook,
  TapePrint,
  QuantitativeSignal,
  Position,
  StrategyPreset,
  BacktestResult,
  MacroItem,
  StressScenario,
} from '../types/terminal';

export const INITIAL_ASSETS: Asset[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    category: 'EQUITIES',
    price: 138.45,
    change24h: 4.12,
    changePercent24h: 3.07,
    high24h: 140.2,
    low24h: 134.8,
    volume24h: '$4.82B',
    sharpeRatio: 3.12,
    alphaScore: 94.2,
    volatilityPercentile: 78,
    marketCap: '$3.40T',
    baseCurrency: 'USD',
  },
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin Spot',
    category: 'CRYPTO',
    price: 68420.5,
    change24h: 1480.0,
    changePercent24h: 2.21,
    high24h: 69150.0,
    low24h: 66890.0,
    volume24h: '$12.4B',
    sharpeRatio: 2.45,
    alphaScore: 89.6,
    volatilityPercentile: 84,
    marketCap: '$1.35T',
    baseCurrency: 'USD',
  },
  {
    symbol: 'ES_F',
    name: 'E-mini S&P 500 Futures',
    category: 'FUTURES',
    price: 5894.25,
    change24h: 28.5,
    changePercent24h: 0.49,
    high24h: 5908.75,
    low24h: 5865.0,
    volume24h: '$89.2B',
    sharpeRatio: 1.88,
    alphaScore: 82.4,
    volatilityPercentile: 42,
    baseCurrency: 'USD',
  },
  {
    symbol: 'NQ_F',
    name: 'E-mini Nasdaq 100 Futures',
    category: 'FUTURES',
    price: 20680.5,
    change24h: 194.25,
    changePercent24h: 0.95,
    high24h: 20745.0,
    low24h: 20490.0,
    volume24h: '$74.1B',
    sharpeRatio: 2.05,
    alphaScore: 86.8,
    volatilityPercentile: 61,
    baseCurrency: 'USD',
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    category: 'EQUITIES',
    price: 231.6,
    change24h: -1.25,
    changePercent24h: -0.54,
    high24h: 234.1,
    low24h: 230.8,
    volume24h: '$2.95B',
    sharpeRatio: 1.76,
    alphaScore: 78.1,
    volatilityPercentile: 38,
    marketCap: '$3.52T',
    baseCurrency: 'USD',
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum Spot',
    category: 'CRYPTO',
    price: 2645.8,
    change24h: 84.3,
    changePercent24h: 3.29,
    high24h: 2680.0,
    low24h: 2550.0,
    volume24h: '$4.12B',
    sharpeRatio: 2.18,
    alphaScore: 85.3,
    volatilityPercentile: 89,
    marketCap: '$318B',
    baseCurrency: 'USD',
  },
  {
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    category: 'FX',
    price: 1.0874,
    change24h: 0.0031,
    changePercent24h: 0.29,
    high24h: 1.0892,
    low24h: 1.0835,
    volume24h: '$110B',
    sharpeRatio: 1.15,
    alphaScore: 68.4,
    volatilityPercentile: 29,
    baseCurrency: 'EUR',
  },
  {
    symbol: 'XAU/USD',
    name: 'Gold Spot Bullion',
    category: 'COMMODITIES',
    price: 2742.6,
    change24h: 16.8,
    changePercent24h: 0.62,
    high24h: 2755.0,
    low24h: 2724.0,
    volume24h: '$18.6B',
    sharpeRatio: 2.62,
    alphaScore: 88.0,
    volatilityPercentile: 45,
    baseCurrency: 'USD',
  },
  {
    symbol: 'CL_F',
    name: 'WTI Crude Oil Futures',
    category: 'COMMODITIES',
    price: 71.35,
    change24h: -1.45,
    changePercent24h: -1.99,
    high24h: 73.1,
    low24h: 70.9,
    volume24h: '$8.4B',
    sharpeRatio: 1.42,
    alphaScore: 71.9,
    volatilityPercentile: 72,
    baseCurrency: 'USD',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    category: 'EQUITIES',
    price: 428.15,
    change24h: 3.8,
    changePercent24h: 0.9,
    high24h: 431.5,
    low24h: 425.2,
    volume24h: '$2.1B',
    sharpeRatio: 2.21,
    alphaScore: 84.1,
    volatilityPercentile: 46,
    marketCap: '$3.18T',
    baseCurrency: 'USD',
  },
];

// Generates 45 historical candles + 15 predictive projection points
export function generateCandlesForAsset(asset: Asset): { candles: Candle[]; predictions: PredictivePoint[] } {
  const candles: Candle[] = [];
  const basePrice = asset.price;
  const count = 42;
  const now = Date.now();
  const stepMs = 5 * 60 * 1000; // 5-minute bars
  
  let current = basePrice * 0.94;
  const volatility = basePrice * (asset.category === 'CRYPTO' ? 0.008 : 0.0035);

  const priceHistory: number[] = [];

  for (let i = count; i >= 0; i--) {
    const timestamp = now - i * stepMs;
    const date = new Date(timestamp);
    const timeLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const delta = (Math.random() - 0.47) * volatility;
    const open = current;
    const close = i === 0 ? asset.price : Number((open + delta).toFixed(asset.price < 5 ? 4 : 2));
    const high = Number((Math.max(open, close) + Math.random() * volatility * 0.8).toFixed(asset.price < 5 ? 4 : 2));
    const low = Number((Math.min(open, close) - Math.random() * volatility * 0.8).toFixed(asset.price < 5 ? 4 : 2));
    const volume = Math.floor(15000 + Math.random() * 45000);

    priceHistory.push(close);

    // Compute simple EMA
    const k20 = 2 / (20 + 1);
    const k50 = 2 / (50 + 1);
    const ema20 = priceHistory.length === 1 
      ? close 
      : Number((close * k20 + candles[candles.length - 1].ema20 * (1 - k20)).toFixed(2));
    const ema50 = priceHistory.length === 1 
      ? close 
      : Number((close * k50 + (candles[candles.length - 1]?.ema50 || close) * (1 - k50)).toFixed(2));

    candles.push({
      timestamp,
      timeLabel,
      open,
      high,
      low,
      close,
      volume,
      ema20,
      ema50,
    });

    current = close;
  }

  // Generate predictive projection cone (Bayesian distribution into +15 bars)
  const predictions: PredictivePoint[] = [];
  const lastClose = candles[candles.length - 1].close;
  const trend = asset.changePercent24h > 0 ? 1 : -1;
  const drift = (volatility * 0.3) * trend;

  let proj = lastClose;
  for (let j = 1; j <= 16; j++) {
    const predTimestamp = now + j * stepMs;
    const date = new Date(predTimestamp);
    const timeLabel = `+${j * 5}m (${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })})`;

    proj += drift * 0.8 + (Math.random() - 0.48) * (volatility * 0.5);
    const spread95 = Math.sqrt(j) * (volatility * 1.6);
    const spread70 = Math.sqrt(j) * (volatility * 0.9);

    predictions.push({
      timestamp: predTimestamp,
      timeLabel,
      projected: Number(proj.toFixed(asset.price < 5 ? 4 : 2)),
      upper95: Number((proj + spread95).toFixed(asset.price < 5 ? 4 : 2)),
      lower95: Number((proj - spread95).toFixed(asset.price < 5 ? 4 : 2)),
      upper70: Number((proj + spread70).toFixed(asset.price < 5 ? 4 : 2)),
      lower70: Number((proj - spread70).toFixed(asset.price < 5 ? 4 : 2)),
    });
  }

  return { candles, predictions };
}

// Generate realistic 10-level orderbook
export function generateOrderBook(midPrice: number, isMicro: boolean = false): OrderBook {
  const tick = isMicro ? 0.0001 : midPrice > 1000 ? 0.5 : 0.01;
  const spreadTicks = 1 + Math.floor(Math.random() * 2);
  const spread = Number((tick * spreadTicks).toFixed(isMicro ? 4 : 2));

  const bestBid = midPrice - spread / 2;
  const bestAsk = midPrice + spread / 2;

  const bids = [];
  let cumBid = 0;
  for (let i = 0; i < 9; i++) {
    const price = Number((bestBid - i * tick).toFixed(isMicro ? 4 : 2));
    const size = Math.floor(25 + Math.random() * 120 * (1 + i * 0.2));
    cumBid += size;
    bids.push({ price, size, total: cumBid, percent: 0 });
  }

  const asks = [];
  let cumAsk = 0;
  for (let i = 0; i < 9; i++) {
    const price = Number((bestAsk + i * tick).toFixed(isMicro ? 4 : 2));
    const size = Math.floor(25 + Math.random() * 120 * (1 + i * 0.2));
    cumAsk += size;
    asks.push({ price, size, total: cumAsk, percent: 0 });
  }

  // Calculate percentages based on max cumulative
  const maxTotal = Math.max(cumBid, cumAsk);
  bids.forEach(b => (b.percent = Math.round((b.total / maxTotal) * 100)));
  asks.forEach(a => (a.percent = Math.round((a.total / maxTotal) * 100)));

  const spreadBps = Number(((spread / midPrice) * 10000).toFixed(1));

  return { bids, asks, spread, spreadBps };
}

export const INITIAL_TAPE_PRINTS: TapePrint[] = [
  { id: 't1', timestamp: '14:32:05.120', price: 138.45, size: 450, side: 'BUY' },
  { id: 't2', timestamp: '14:32:04.882', price: 138.44, size: 120, side: 'SELL' },
  { id: 't3', timestamp: '14:32:03.951', price: 138.45, size: 850, side: 'BUY' },
  { id: 't4', timestamp: '14:32:02.410', price: 138.45, size: 2300, side: 'BUY' },
  { id: 't5', timestamp: '14:32:01.094', price: 138.43, size: 310, side: 'SELL' },
  { id: 't6', timestamp: '14:31:59.660', price: 138.44, size: 90, side: 'BUY' },
  { id: 't7', timestamp: '14:31:58.210', price: 138.42, size: 1400, side: 'SELL' },
  { id: 't8', timestamp: '14:31:57.004', price: 138.44, size: 620, side: 'BUY' },
];

export const INITIAL_SIGNALS: QuantitativeSignal[] = [
  {
    id: 'sig-01',
    symbol: 'NVDA',
    modelName: 'DeepSurge Vol-Momentum v7',
    strategyType: 'Momentum Breakout',
    direction: 'LONG',
    conviction: 94.6,
    expectedAlphaBps: 48.2,
    targetPrice: 144.5,
    stopLossPrice: 135.8,
    horizon: '12-24 Hours',
    timestamp: '2 mins ago',
    status: 'ACTIVE',
  },
  {
    id: 'sig-02',
    symbol: 'BTC/USD',
    modelName: 'Orderflow Imbalance Matrix',
    strategyType: 'Orderflow Imbalance',
    direction: 'LONG',
    conviction: 91.2,
    expectedAlphaBps: 64.0,
    targetPrice: 71200.0,
    stopLossPrice: 66900.0,
    horizon: '4-8 Hours',
    timestamp: '7 mins ago',
    status: 'ACTIVE',
  },
  {
    id: 'sig-03',
    symbol: 'EUR/USD',
    modelName: 'Kalman Mean-Reverter Alpha',
    strategyType: 'Mean Reversion',
    direction: 'SHORT',
    conviction: 88.4,
    expectedAlphaBps: 22.5,
    targetPrice: 1.0825,
    stopLossPrice: 1.091,
    horizon: '24-48 Hours',
    timestamp: '14 mins ago',
    status: 'ACTIVE',
  },
  {
    id: 'sig-04',
    symbol: 'ES_F',
    modelName: 'Cross-Asset Cointegration Arb',
    strategyType: 'Statistical Arbitrage',
    direction: 'LONG',
    conviction: 86.9,
    expectedAlphaBps: 31.0,
    targetPrice: 5930.0,
    stopLossPrice: 5860.0,
    horizon: 'Intraday (Close)',
    timestamp: '22 mins ago',
    status: 'ACTIVE',
  },
  {
    id: 'sig-05',
    symbol: 'CL_F',
    modelName: 'Volatility Surface Asymmetry',
    strategyType: 'Volatility Skew',
    direction: 'SHORT',
    conviction: 83.1,
    expectedAlphaBps: 54.8,
    targetPrice: 69.2,
    stopLossPrice: 72.8,
    horizon: '48 Hours',
    timestamp: '35 mins ago',
    status: 'ACTIVE',
  },
];

export const INITIAL_POSITIONS: Position[] = [
  {
    id: 'pos-1',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    side: 'LONG',
    size: 15000,
    entryPrice: 132.8,
    currentPrice: 138.45,
    unrealizedPnL: 84750,
    unrealizedPnLPercent: 4.25,
    delta: 1.0,
    exposure: 2076750,
    leverage: 1.0,
  },
  {
    id: 'pos-2',
    symbol: 'BTC/USD',
    name: 'Bitcoin Spot Asset',
    side: 'LONG',
    size: 28.5,
    entryPrice: 65920.0,
    currentPrice: 68420.5,
    unrealizedPnL: 71264.25,
    unrealizedPnLPercent: 3.79,
    delta: 1.0,
    exposure: 1949984.25,
    leverage: 1.5,
  },
  {
    id: 'pos-3',
    symbol: 'ES_F',
    name: 'E-mini S&P 500 Dec26',
    side: 'LONG',
    size: 14,
    entryPrice: 5855.0,
    currentPrice: 5894.25,
    unrealizedPnL: 27475,
    unrealizedPnLPercent: 0.67,
    delta: 1.0,
    exposure: 4125975,
    leverage: 3.2,
  },
  {
    id: 'pos-4',
    symbol: 'EUR/USD',
    name: 'EUR/USD Spot FX',
    side: 'SHORT',
    size: 2500000,
    entryPrice: 1.0915,
    currentPrice: 1.0874,
    unrealizedPnL: 10250,
    unrealizedPnLPercent: 0.38,
    delta: -1.0,
    exposure: 2718500,
    leverage: 10.0,
  },
  {
    id: 'pos-5',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    side: 'SHORT',
    size: 6000,
    entryPrice: 233.1,
    currentPrice: 231.6,
    unrealizedPnL: 9000,
    unrealizedPnLPercent: 0.64,
    delta: -1.0,
    exposure: 1389600,
    leverage: 1.0,
  },
];

export const STRATEGY_PRESETS: StrategyPreset[] = [
  {
    id: 'strat-1',
    name: 'Multi-Factor Alpha Neutral',
    description: 'Long high-momentum and quality deciles, short low-volatility laggards with sector neutrality.',
    category: 'Factor Investing',
    lookbackDays: 60,
    targetVolatility: 11.5,
    maxLeverage: 2.5,
    stopLossBps: 180,
    rebalanceHours: 24,
  },
  {
    id: 'strat-2',
    name: 'Microstructure Orderflow Wave',
    description: 'Exploits high-frequency limit orderbook imbalances and tape aggression clustering.',
    category: 'Microstructure',
    lookbackDays: 14,
    targetVolatility: 18.0,
    maxLeverage: 4.0,
    stopLossBps: 75,
    rebalanceHours: 1,
  },
  {
    id: 'strat-3',
    name: 'Dynamic Volatility Surface Skew',
    description: 'Trades options-implied vs realized dispersion arbitrage with Delta-hedged underlying.',
    category: 'Volatility Dispersion',
    lookbackDays: 90,
    targetVolatility: 9.0,
    maxLeverage: 1.8,
    stopLossBps: 220,
    rebalanceHours: 48,
  },
  {
    id: 'strat-4',
    name: 'Cross-Asset Statistical Cointegration',
    description: 'Pairs trading across equity index futures, currency pairs, and energy commodities.',
    category: 'StatArb',
    lookbackDays: 45,
    targetVolatility: 13.2,
    maxLeverage: 3.0,
    stopLossBps: 120,
    rebalanceHours: 12,
  },
];

export function runBacktestSimulation(preset: StrategyPreset): BacktestResult {
  // Generate realistic equity curve for the selected parameters
  const dates = [
    '2025-Q1', '2025-Q2', '2025-Q3', '2025-Q4',
    '2026-Q1', '2026-Q2', '2026-Q3', '2026-Oct (Current)'
  ];

  let stratVal = 100.0;
  let benchVal = 100.0;
  const equityCurve: { date: string; strategy: number; benchmark: number }[] = [];

  const leverageFactor = Math.min(preset.maxLeverage, 3.5);
  const qualityFactor = preset.targetVolatility > 15 ? 1.15 : 1.28;

  dates.forEach((d) => {
    const benchReturn = (Math.random() * 6 - 1.2); // ~+3.8% avg
    benchVal = Number((benchVal * (1 + benchReturn / 100)).toFixed(2));

    const alphaReturn = (benchReturn * 0.75 + (Math.random() * 5 + 1.8) * (qualityFactor / 1.1)) * (1 + leverageFactor * 0.12);
    stratVal = Number((stratVal * (1 + alphaReturn / 100)).toFixed(2));

    equityCurve.push({
      date: d,
      strategy: stratVal,
      benchmark: benchVal,
    });
  });

  const cumulativeReturn = Number((((stratVal - 100) / 100) * 100).toFixed(1));
  const sharpeRatio = Number((2.4 + (preset.targetVolatility < 15 ? 0.45 : 0.1) + Math.random() * 0.3).toFixed(2));
  const sortinoRatio = Number((sharpeRatio * 1.35).toFixed(2));
  const maxDrawdown = Number((-3.2 - Math.random() * 3.8).toFixed(1));
  const winRate = Number((64.5 + Math.random() * 7.5).toFixed(1));
  const profitFactor = Number((2.15 + Math.random() * 0.4).toFixed(2));
  const calmarRatio = Number((Math.abs(cumulativeReturn / maxDrawdown)).toFixed(2));
  const alphaAnnualized = Number((cumulativeReturn * 0.42).toFixed(1));

  const monthlyReturns = [
    { year: 2024, months: [2.4, 3.1, -0.8, 4.2, 1.9, 3.8, 0.4, 2.7, -1.1, 3.5, 4.1, 2.2] },
    { year: 2025, months: [3.8, 1.2, 4.5, -0.4, 2.9, 3.1, 5.0, 1.8, 2.4, -0.9, 3.2, 4.0] },
    { year: 2026, months: [4.1, 2.8, 3.6, -1.2, 3.9, 4.5, 2.1, 3.4, 1.9, 2.5] },
  ];

  return {
    cumulativeReturn,
    sharpeRatio,
    sortinoRatio,
    maxDrawdown,
    winRate,
    profitFactor,
    calmarRatio,
    alphaAnnualized,
    totalTrades: Math.floor(1420 + Math.random() * 600),
    equityCurve,
    monthlyReturns,
  };
}

export const STRESS_SCENARIOS: StressScenario[] = [
  {
    id: 'scen-1',
    name: 'Hawkish Fed Rate Shock (+75 bps)',
    description: 'Immediate 75 bps surprise hike, inverted yield curve widening, discount rates re-rated upward.',
    impactPnL: -218400,
    impactPercent: -1.47,
    shockDetails: {
      equitiesShock: '-3.8%',
      ratesShock: '+75 bps',
      volShock: '+32% VIX',
      fxShock: '+2.1% DXY',
    },
  },
  {
    id: 'scen-2',
    name: 'Global Energy / Crude Supply Crunch (+25%)',
    description: 'Strait of Hormuz disruptions pushing Brent/WTI above $92, triggering stagflationary pricing.',
    impactPnL: -94200,
    impactPercent: -0.63,
    shockDetails: {
      equitiesShock: '-2.1%',
      ratesShock: '+25 bps',
      volShock: '+18% VIX',
      fxShock: '-1.4% EUR',
    },
  },
  {
    id: 'scen-3',
    name: 'Mega-Cap Semiconductor De-leveraging (-9%)',
    description: 'High-beta AI hardware supply re-evaluation, concentrated liquidation across prime brokerages.',
    impactPnL: -345000,
    impactPercent: -2.32,
    shockDetails: {
      equitiesShock: '-9.0% Tech',
      ratesShock: '-12 bps flight',
      volShock: '+45% VXN',
      fxShock: 'Neutral',
    },
  },
  {
    id: 'scen-4',
    name: 'Liquidity Expansion & Soft Landing (+5%)',
    description: 'Synchronized easing from ECB/PBoC, benign inflation prints, corporate earnings expansion.',
    impactPnL: +482500,
    impactPercent: +3.25,
    shockDetails: {
      equitiesShock: '+5.2%',
      ratesShock: '-30 bps',
      volShock: '-22% VIX',
      fxShock: '+1.8% Risk-On',
    },
  },
];

export const MACRO_FEED_DATA: MacroItem[] = [
  {
    id: 'm1',
    title: 'US CPI Headline Prints 2.1% YoY (Est. 2.4%) — Fed Neutral Rate Glidepath Confirmed',
    source: 'Bloomberg Macro Terminal',
    timestamp: '4 mins ago',
    sentiment: 'BULLISH',
    score: 0.88,
    affectedSymbols: ['ES_F', 'NQ_F', 'NVDA', 'AAPL'],
    impact: 'HIGH',
  },
  {
    id: 'm2',
    title: 'Options Market Maker Gamma Shifts to Extreme Long (+$3.8B per 1%) — Pinning Realized Volatility',
    source: 'CBOE Liquidity Analytics',
    timestamp: '18 mins ago',
    sentiment: 'BULLISH',
    score: 0.72,
    affectedSymbols: ['ES_F', 'NVDA'],
    impact: 'HIGH',
  },
  {
    id: 'm3',
    title: 'ECB Governing Council Flags Potential Accelerating Easing Pace as German Factory Orders Soften',
    source: 'Reuters Financial',
    timestamp: '32 mins ago',
    sentiment: 'BEARISH',
    score: -0.64,
    affectedSymbols: ['EUR/USD'],
    impact: 'MEDIUM',
  },
  {
    id: 'm4',
    title: 'Global Sovereign Wealth Fund Allocates $4.2B to Accelerated Computing Infrastructure',
    source: 'Financial Times Institutional',
    timestamp: '1 hour ago',
    sentiment: 'BULLISH',
    score: 0.91,
    affectedSymbols: ['NVDA', 'MSFT'],
    impact: 'HIGH',
  },
  {
    id: 'm5',
    title: 'Middle East Tanker Transit Flows Normalize Post-Strait Maritime Protocol Signing',
    source: 'Lloyds Maritime Intelligence',
    timestamp: '2 hours ago',
    sentiment: 'BEARISH',
    score: -0.58,
    affectedSymbols: ['CL_F'],
    impact: 'MEDIUM',
  },
  {
    id: 'm6',
    title: 'Bitcoin Institutional Custody Holdings Cross 1.15M BTC Milestone as Spot ETF Inflows Accelerate',
    source: 'Glassnode On-Chain Insights',
    timestamp: '2.5 hours ago',
    sentiment: 'BULLISH',
    score: 0.84,
    affectedSymbols: ['BTC/USD', 'ETH/USD'],
    impact: 'HIGH',
  },
];

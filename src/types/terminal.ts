export type AssetCategory = 'ALL' | 'EQUITIES' | 'CRYPTO' | 'FX' | 'FUTURES' | 'COMMODITIES';

export interface Asset {
  symbol: string;
  name: string;
  category: 'EQUITIES' | 'CRYPTO' | 'FX' | 'FUTURES' | 'COMMODITIES';
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  sharpeRatio: number;
  alphaScore: number; // 0 - 100
  volatilityPercentile: number;
  marketCap?: string;
  baseCurrency: string;
}

export interface Candle {
  timestamp: number;
  timeLabel: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema20: number;
  ema50: number;
}

export interface PredictivePoint {
  timestamp: number;
  timeLabel: string;
  projected: number;
  upper95: number;
  lower95: number;
  upper70: number;
  lower70: number;
}

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
  percent: number;
}

export interface OrderBook {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
  spreadBps: number;
}

export interface TapePrint {
  id: string;
  timestamp: string;
  price: number;
  size: number;
  side: 'BUY' | 'SELL';
}

export interface QuantitativeSignal {
  id: string;
  symbol: string;
  modelName: string;
  strategyType: 'Statistical Arbitrage' | 'Mean Reversion' | 'Momentum Breakout' | 'Volatility Skew' | 'Orderflow Imbalance';
  direction: 'LONG' | 'SHORT';
  conviction: number; // percentage, e.g. 94.5%
  expectedAlphaBps: number; // e.g. +42 bps
  targetPrice: number;
  stopLossPrice: number;
  horizon: string;
  timestamp: string;
  status: 'ACTIVE' | 'FILLED' | 'CLOSED';
}

export interface Position {
  id: string;
  symbol: string;
  name: string;
  side: 'LONG' | 'SHORT';
  size: number;
  entryPrice: number;
  currentPrice: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  delta: number;
  exposure: number;
  leverage: number;
}

export interface StrategyPreset {
  id: string;
  name: string;
  description: string;
  category: string;
  lookbackDays: number;
  targetVolatility: number;
  maxLeverage: number;
  stopLossBps: number;
  rebalanceHours: number;
}

export interface BacktestResult {
  cumulativeReturn: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdown: number;
  winRate: number;
  profitFactor: number;
  calmarRatio: number;
  alphaAnnualized: number;
  totalTrades: number;
  equityCurve: { date: string; strategy: number; benchmark: number }[];
  monthlyReturns: { year: number; months: number[] }[];
}

export interface ExecutionOrder {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  orderType: 'LIMIT' | 'MARKET' | 'TWAP' | 'VWAP' | 'ICEBERG';
  quantity: number;
  price: number;
  route: 'SOR' | 'IEX' | 'DARK_POOL' | 'NASDAQ' | 'BATS';
  status: 'EXECUTED' | 'WORKING' | 'CANCELLED';
  timestamp: string;
  filledQty: number;
  avgFillPrice: number;
  slippageBps: number;
}

export interface MacroItem {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  score: number; // -1.0 to +1.0
  affectedSymbols: string[];
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface StressScenario {
  id: string;
  name: string;
  description: string;
  impactPnL: number;
  impactPercent: number;
  shockDetails: {
    equitiesShock: string;
    ratesShock: string;
    volShock: string;
    fxShock: string;
  };
}

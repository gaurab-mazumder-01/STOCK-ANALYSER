import React from 'react';
import { StockData } from '../data/stocksData';
import { TrendingUp, TrendingDown, Star, Target, ShieldAlert, Award, FileText, CheckCircle2 } from 'lucide-react';
import { StockChart } from './StockChart';

interface StockOverviewProps {
  stock: StockData;
  isWatchlisted: boolean;
  onToggleWatchlist: (symbol: string) => void;
  onOpenTradeModal: () => void;
}

export const StockOverview: React.FC<StockOverviewProps> = ({
  stock,
  isWatchlisted,
  onToggleWatchlist,
  onOpenTradeModal,
}) => {
  const isPositive = stock.changePercent >= 0;
  const curr = stock.currency || '₹';

  return (
    <div className="space-y-6">
      {/* 1. Primary Stock Header */}
      <div className="bg-[#181c23] border border-[#262a32] rounded p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#e0fdff]">
              {stock.symbol}
            </h1>
            <span className="text-xs font-mono text-[#849495] bg-[#0f131b] px-2 py-0.5 rounded border border-[#262a32]">
              {stock.exchange}
            </span>
            <span className="text-xs text-[#b9cacb] hidden sm:inline">
              {stock.sector}
            </span>
          </div>

          <div className="text-sm text-[#b9cacb] mt-0.5">{stock.name}</div>

          {/* Price & Change Banner */}
          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-3xl sm:text-4xl font-bold font-mono font-mono-numbers text-[#dfe2ed]">
              {curr}{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <div
              className={`flex items-center gap-1 font-mono text-sm sm:text-base font-semibold ${
                isPositive ? 'text-[#4edea3]' : 'text-[#ffb4ab]'
              }`}
            >
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>
                {isPositive ? '+' : ''}{curr}{Math.abs(stock.change).toFixed(2)} ({isPositive ? '+' : ''}
                {stock.changePercent.toFixed(2)}%)
              </span>
            </div>
            <span className="text-xs font-mono text-[#849495] hidden md:inline">
              · Prev Close: {curr}{stock.previousClose.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-center">
          <button
            onClick={() => onToggleWatchlist(stock.symbol)}
            className={`px-3 py-2 text-xs font-mono rounded border transition-colors flex items-center gap-1.5 ${
              isWatchlisted
                ? 'border-[#00f2fe]/50 bg-[#00f2fe]/10 text-[#00f2fe]'
                : 'border-[#3a494b] text-[#b9cacb] hover:text-[#dfe2ed] hover:border-[#849495]'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isWatchlisted ? 'fill-[#00f2fe]' : ''}`} />
            <span>{isWatchlisted ? 'WATCHING' : 'ADD TO WATCHLIST'}</span>
          </button>

          <button
            onClick={onOpenTradeModal}
            className="px-4 py-2 text-xs font-mono font-bold text-[#00373a] bg-[#00f2fe] hover:bg-[#6ff6ff] rounded transition-all shadow-[0_0_12px_rgba(0,242,254,0.3)]"
          >
            BUY / SELL
          </button>
        </div>
      </div>

      {/* 2. Realistic & High-Precision Stock Chart (Candles, MAs, Volume, Prev Close) */}
      <StockChart stock={stock} />

      {/* 3. Key Financial Statistics Grid */}
      <div className="bg-[#181c23] border border-[#262a32] rounded p-4 sm:p-6 space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f2fe]">
          Key Statistics & Fundamentals
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
          <div className="bg-[#0f131b] border border-[#262a32] p-3 rounded">
            <div className="text-[11px] text-[#849495]">Market Cap</div>
            <div className="text-sm font-semibold text-[#dfe2ed] mt-1">{stock.marketCap}</div>
          </div>

          <div className="bg-[#0f131b] border border-[#262a32] p-3 rounded">
            <div className="text-[11px] text-[#849495]">P/E Ratio</div>
            <div className="text-sm font-semibold text-[#dfe2ed] mt-1">{stock.peRatio}</div>
          </div>

          <div className="bg-[#0f131b] border border-[#262a32] p-3 rounded">
            <div className="text-[11px] text-[#849495]">52-Week High</div>
            <div className="text-sm font-semibold text-[#4edea3] mt-1">{curr}{stock.high52.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>

          <div className="bg-[#0f131b] border border-[#262a32] p-3 rounded">
            <div className="text-[11px] text-[#849495]">52-Week Low</div>
            <div className="text-sm font-semibold text-[#ffb4ab] mt-1">{curr}{stock.low52.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>

          <div className="bg-[#0f131b] border border-[#262a32] p-3 rounded">
            <div className="text-[11px] text-[#849495]">Day Volume</div>
            <div className="text-sm font-semibold text-[#dfe2ed] mt-1">{stock.volume}</div>
          </div>

          <div className="bg-[#0f131b] border border-[#262a32] p-3 rounded">
            <div className="text-[11px] text-[#849495]">Avg Volume (30D)</div>
            <div className="text-sm font-semibold text-[#dfe2ed] mt-1">{stock.avgVolume}</div>
          </div>

          <div className="bg-[#0f131b] border border-[#262a32] p-3 rounded">
            <div className="text-[11px] text-[#849495]">Dividend Yield</div>
            <div className="text-sm font-semibold text-[#dfe2ed] mt-1">{stock.dividendYield}</div>
          </div>

          <div className="bg-[#0f131b] border border-[#262a32] p-3 rounded">
            <div className="text-[11px] text-[#849495]">EPS (TTM)</div>
            <div className="text-sm font-semibold text-[#dfe2ed] mt-1">{curr}{stock.eps.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* 4. Wall Street Analyst Consensus & Price Targets */}
      <div className="bg-[#181c23] border border-[#262a32] rounded p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#262a32] pb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#00f2fe]" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f2fe]">
              Wall Street Analyst Forecasts
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded border border-[#4edea3]/30">
            {stock.rating} ({stock.ratingScore} / 5.0)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Price Spectrum */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#b9cacb]">12-Month Price Target Distribution:</div>
            <div className="relative pt-6 pb-2">
              <div className="h-2 bg-[#0f131b] rounded-full border border-[#262a32] overflow-hidden flex">
                <div className="w-full bg-gradient-to-r from-[#ffb4ab]/40 via-[#00f2fe] to-[#4edea3]" />
              </div>

              {/* Min, Avg, Max Labels */}
              <div className="flex justify-between text-xs font-mono text-[#dfe2ed] mt-2">
                <div>
                  <span className="text-[#849495] block text-[10px]">LOW</span>
                  {curr}{stock.targetPrice.low.toLocaleString()}
                </div>
                <div className="text-center font-bold text-[#00f2fe]">
                  <span className="text-[#849495] block text-[10px]">AVERAGE TARGET</span>
                  {curr}{stock.targetPrice.avg.toLocaleString()}
                </div>
                <div className="text-right">
                  <span className="text-[#849495] block text-[10px]">HIGH</span>
                  {curr}{stock.targetPrice.high.toLocaleString()}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#849495] font-sans">
              Average analyst target of <strong>{curr}{stock.targetPrice.avg.toLocaleString()}</strong> implies an upside potential of{' '}
              <strong className="text-[#4edea3]">
                +{(((stock.targetPrice.avg - stock.price) / stock.price) * 100).toFixed(1)}%
              </strong>.
            </p>
          </div>

          {/* Breakdown Pills */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#b9cacb]">Analyst Ratings Breakdown:</div>
            <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
              <div className="bg-[#4edea3]/10 border border-[#4edea3]/30 p-2.5 rounded">
                <div className="text-lg font-bold text-[#4edea3]">{stock.analystsCount.buy}</div>
                <div className="text-[10px] text-[#b9cacb]">BUY RATINGS</div>
              </div>
              <div className="bg-[#0f131b] border border-[#262a32] p-2.5 rounded">
                <div className="text-lg font-bold text-[#dfe2ed]">{stock.analystsCount.hold}</div>
                <div className="text-[10px] text-[#849495]">HOLD RATINGS</div>
              </div>
              <div className="bg-[#ffb4ab]/10 border border-[#ffb4ab]/30 p-2.5 rounded">
                <div className="text-lg font-bold text-[#ffb4ab]">{stock.analystsCount.sell}</div>
                <div className="text-[10px] text-[#849495]">SELL RATINGS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Company Investment Highlights (Plain English) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-[#181c23] border border-[#262a32] rounded p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4edea3] uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Investment Strengths</span>
          </div>
          <ul className="space-y-2 text-xs text-[#dfe2ed] font-sans">
            {stock.strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#4edea3] font-bold mt-0.5">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        <div className="bg-[#181c23] border border-[#262a32] rounded p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ffb4ab] uppercase">
            <ShieldAlert className="w-4 h-4" />
            <span>Key Risks to Monitor</span>
          </div>
          <ul className="space-y-2 text-xs text-[#dfe2ed] font-sans">
            {stock.risks.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#ffb4ab] font-bold mt-0.5">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 6. Company About & Financial Snapshot */}
      <div className="bg-[#181c23] border border-[#262a32] rounded p-4 sm:p-6 space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f2fe]">
          About {stock.name}
        </h2>
        <p className="text-xs sm:text-sm text-[#b9cacb] font-sans leading-relaxed">
          {stock.about}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#262a32] font-mono text-center">
          <div className="bg-[#0f131b] p-2.5 rounded">
            <div className="text-[10px] text-[#849495]">ANNUAL REVENUE</div>
            <div className="text-xs sm:text-sm font-bold text-[#dfe2ed] mt-0.5">{stock.financials.revenue}</div>
          </div>
          <div className="bg-[#0f131b] p-2.5 rounded">
            <div className="text-[10px] text-[#849495]">NET INCOME</div>
            <div className="text-xs sm:text-sm font-bold text-[#dfe2ed] mt-0.5">{stock.financials.netIncome}</div>
          </div>
          <div className="bg-[#0f131b] p-2.5 rounded">
            <div className="text-[10px] text-[#849495]">PROFIT MARGIN</div>
            <div className="text-xs sm:text-sm font-bold text-[#4edea3] mt-0.5">{stock.financials.profitMargin}</div>
          </div>
          <div className="bg-[#0f131b] p-2.5 rounded">
            <div className="text-[10px] text-[#849495]">YOY REVENUE GROWTH</div>
            <div className="text-xs sm:text-sm font-bold text-[#00f2fe] mt-0.5">{stock.financials.revenueGrowth}</div>
          </div>
        </div>
      </div>

      {/* 7. Latest News */}
      <div className="bg-[#181c23] border border-[#262a32] rounded p-4 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#00f2fe]" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f2fe]">
            Recent Market Headlines for {stock.symbol}
          </h2>
        </div>

        <div className="divide-y divide-[#262a32]/60">
          {stock.news.map((item) => (
            <div key={item.id} className="py-3 hover:bg-[#1c2027] px-2 rounded transition-colors space-y-1">
              <h3 className="text-xs sm:text-sm font-medium text-[#dfe2ed] hover:text-[#00f2fe] cursor-pointer transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-3 text-[11px] font-mono text-[#849495]">
                <span>{item.source}</span>
                <span>·</span>
                <span>{item.time}</span>
                <span>·</span>
                <span className="text-[#4edea3]">{item.sentiment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

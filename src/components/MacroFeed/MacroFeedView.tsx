import React, { useState } from 'react';
import { MACRO_FEED_DATA } from '../../data/mockMarketData';
import { MacroItem } from '../../types/terminal';
import { Globe, TrendingUp, TrendingDown, Filter, ExternalLink, Zap } from 'lucide-react';

interface MacroFeedViewProps {
  onSelectTicker: (symbol: string) => void;
}

export const MacroFeedView: React.FC<MacroFeedViewProps> = ({ onSelectTicker }) => {
  const [filterSentiment, setFilterSentiment] = useState<'ALL' | 'BULLISH' | 'BEARISH' | 'NEUTRAL'>('ALL');
  const [search, setSearch] = useState('');

  const filteredItems = MACRO_FEED_DATA.filter((item) => {
    if (filterSentiment !== 'ALL' && item.sentiment !== filterSentiment) return false;
    if (
      search &&
      !item.title.toLowerCase().includes(search.toLowerCase()) &&
      !item.source.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262a32] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-[#e0fdff] tracking-tight flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#00f2fe]" />
            Macro Intelligence & Alternative Data Feed
          </h1>
          <p className="text-xs sm:text-sm text-[#b9cacb] mt-1 font-sans">
            NLP sentiment polarity scoring, central bank liquidity flows, and gamma exposure (GEX) tracking.
          </p>
        </div>

        <span className="text-xs font-mono text-[#00f2fe] bg-[#00f2fe]/10 px-3 py-1.5 rounded border border-[#00f2fe]/30 self-start sm:self-auto">
          MACHINE LEARNING SENTIMENT ENSEMBLE
        </span>
      </div>

      {/* Macro Regime Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#181c23] border border-[#262a32] rounded p-3.5">
          <div className="text-[10px] font-mono text-[#849495] uppercase">10Y-2Y Yield Curve Spread</div>
          <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#4edea3] mt-1">
            +18.4 bps
          </div>
          <div className="text-[10px] font-mono text-[#849495] mt-0.5">Disinverting / Normalizing</div>
        </div>

        <div className="bg-[#181c23] border border-[#262a32] rounded p-3.5">
          <div className="text-[10px] font-mono text-[#849495] uppercase">CBOE VIX Volatility Regime</div>
          <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#00f2fe] mt-1">
            13.45
          </div>
          <div className="text-[10px] font-mono text-[#4edea3] mt-0.5">Low-Vol Compression Range</div>
        </div>

        <div className="bg-[#181c23] border border-[#262a32] rounded p-3.5">
          <div className="text-[10px] font-mono text-[#849495] uppercase">Net Market Maker Gamma (GEX)</div>
          <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#dfe2ed] mt-1">
            +$3.82B / 1%
          </div>
          <div className="text-[10px] font-mono text-[#4edea3] mt-0.5">Dealers Long Gamma (Pinning)</div>
        </div>

        <div className="bg-[#181c23] border border-[#262a32] rounded p-3.5">
          <div className="text-[10px] font-mono text-[#849495] uppercase">High Yield OAS Spread</div>
          <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#dfe2ed] mt-1">
            284 bps
          </div>
          <div className="text-[10px] font-mono text-[#849495] mt-0.5">Credit Risk Premium Benign</div>
        </div>
      </div>

      {/* Alternative News Feed Card */}
      <div className="bg-[#181c23] border border-[#262a32] rounded overflow-hidden">
        {/* Controls */}
        <div className="p-3 border-b border-[#262a32] flex flex-wrap items-center justify-between gap-3 bg-[#181c23]">
          <div className="flex items-center gap-1.5 bg-[#0f131b] border border-[#3a494b] rounded p-0.5">
            {(['ALL', 'BULLISH', 'BEARISH', 'NEUTRAL'] as const).map((sent) => (
              <button
                key={sent}
                onClick={() => setFilterSentiment(sent)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  filterSentiment === sent
                    ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                    : 'text-[#849495] hover:text-[#dfe2ed]'
                }`}
              >
                {sent}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search macro signals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1 text-xs font-mono bg-[#0f131b] border border-[#3a494b] rounded text-[#dfe2ed] placeholder-[#849495] focus:outline-none focus:border-[#00f2fe] w-52 sm:w-64"
            />
          </div>
        </div>

        {/* Feed List */}
        <div className="divide-y divide-[#262a32]/60">
          {filteredItems.map((item) => {
            const isBull = item.sentiment === 'BULLISH';
            const isBear = item.sentiment === 'BEARISH';

            return (
              <div
                key={item.id}
                className="p-4 hover:bg-[#1c2027] transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold font-sans text-[#dfe2ed] leading-snug">
                    {item.title}
                  </h3>

                  {/* Sentiment Badge */}
                  <div className="shrink-0 flex items-center gap-2 font-mono">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border ${
                        isBull
                          ? 'bg-[#4edea3]/15 text-[#4edea3] border-[#4edea3]/30'
                          : isBear
                          ? 'bg-[#ffb4ab]/15 text-[#ffb4ab] border-[#ffb4ab]/30'
                          : 'bg-[#849495]/15 text-[#849495] border-[#849495]/30'
                      }`}
                    >
                      {isBull ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : isBear ? (
                        <TrendingDown className="w-3 h-3" />
                      ) : null}
                      <span>
                        {item.sentiment} ({item.score > 0 ? '+' : ''}{item.score.toFixed(2)})
                      </span>
                    </span>
                  </div>
                </div>

                {/* Subtitle & Impact */}
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#849495] gap-2 pt-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[#b9cacb] font-medium">{item.source}</span>
                    <span>·</span>
                    <span>{item.timestamp}</span>
                    <span>·</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        item.impact === 'HIGH'
                          ? 'bg-[#00f2fe]/10 text-[#00f2fe]'
                          : 'bg-[#262a32] text-[#849495]'
                      }`}
                    >
                      {item.impact} IMPACT
                    </span>
                  </div>

                  {/* Affected Symbols */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#849495]">Impacted:</span>
                    {item.affectedSymbols.map((sym) => (
                      <button
                        key={sym}
                        onClick={() => onSelectTicker(sym)}
                        className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-[#0f131b] border border-[#3a494b] text-[#00f2fe] hover:border-[#00f2fe] transition-colors"
                      >
                        ${sym}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-xs font-mono text-[#849495]">
              No macro intelligence headlines matching filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

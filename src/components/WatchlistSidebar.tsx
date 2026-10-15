import React, { useState } from 'react';
import { StockData } from '../data/stocksData';
import { Star, TrendingUp, TrendingDown, Layers } from 'lucide-react';

interface WatchlistSidebarProps {
  stocks: StockData[];
  selectedStock: StockData;
  onSelectStock: (stock: StockData) => void;
  watchlistSymbols: string[];
  onToggleWatchlist: (symbol: string) => void;
}

export const WatchlistSidebar: React.FC<WatchlistSidebarProps> = ({
  stocks,
  selectedStock,
  onSelectStock,
  watchlistSymbols,
  onToggleWatchlist,
}) => {
  const [filterMode, setFilterMode] = useState<'ALL' | 'STARRED'>('ALL');

  const displayedStocks = filterMode === 'STARRED'
    ? stocks.filter((s) => watchlistSymbols.includes(s.symbol))
    : stocks;

  return (
    <div className="bg-[#181c23] border border-[#262a32] rounded flex flex-col h-full overflow-hidden">
      {/* Header & Filter Tabs */}
      <div className="p-3 border-b border-[#262a32] flex flex-col gap-2.5 bg-[#181c23]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00f2fe]" />
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-[#e0fdff]">
              Market Watchlist
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#849495]">
            {displayedStocks.length} of {stocks.length}
          </span>
        </div>

        {/* Filter Segmented Control */}
        <div className="grid grid-cols-2 gap-1 bg-[#0f131b] p-0.5 rounded border border-[#3a494b] text-xs font-mono">
          <button
            onClick={() => setFilterMode('ALL')}
            className={`py-1 rounded text-[11px] transition-colors ${
              filterMode === 'ALL'
                ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                : 'text-[#849495] hover:text-[#dfe2ed]'
            }`}
          >
            All Stocks ({stocks.length})
          </button>
          <button
            onClick={() => setFilterMode('STARRED')}
            className={`py-1 rounded text-[11px] flex items-center justify-center gap-1 transition-colors ${
              filterMode === 'STARRED'
                ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                : 'text-[#849495] hover:text-[#dfe2ed]'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Starred ({watchlistSymbols.length})</span>
          </button>
        </div>
      </div>

      {/* Stock List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#262a32]/50">
        {displayedStocks.map((stock) => {
          const isSelected = selectedStock.symbol === stock.symbol;
          const isPositive = stock.changePercent >= 0;
          const isBookmarked = watchlistSymbols.includes(stock.symbol);

          return (
            <div
              key={stock.symbol}
              onClick={() => onSelectStock(stock)}
              className={`p-3 cursor-pointer transition-colors flex items-center justify-between group ${
                isSelected
                  ? 'bg-[#00f2fe]/10 border-l-2 border-l-[#00f2fe]'
                  : 'hover:bg-[#1c2027]'
              }`}
            >
              {/* Ticker & Name */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWatchlist(stock.symbol);
                  }}
                  className="p-1 rounded text-[#849495] hover:text-[#00f2fe] transition-colors"
                  title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
                >
                  <Star
                    className={`w-3.5 h-3.5 ${
                      isBookmarked ? 'text-[#00f2fe] fill-[#00f2fe]' : ''
                    }`}
                  />
                </button>

                <div>
                  <div className="font-bold text-xs text-[#dfe2ed] flex items-center gap-1.5">
                    <span>{stock.symbol}</span>
                    <span className="text-[10px] text-[#849495] font-normal truncate max-w-[85px]">
                      {stock.exchange}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#849495] truncate max-w-[120px]">
                    {stock.name}
                  </div>
                </div>
              </div>

              {/* Live Price & Change */}
              <div className="text-right font-mono">
                <div className="text-xs font-semibold text-[#dfe2ed] font-mono-numbers">
                  {stock.currency || '₹'}{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div
                  className={`text-[11px] font-medium flex items-center justify-end gap-0.5 ${
                    isPositive ? 'text-[#4edea3]' : 'text-[#ffb4ab]'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>
                    {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {displayedStocks.length === 0 && (
          <div className="p-8 text-center text-xs font-mono text-[#849495]">
            No starred stocks. Click the ★ icon on any stock to add it here.
          </div>
        )}
      </div>
    </div>
  );
};

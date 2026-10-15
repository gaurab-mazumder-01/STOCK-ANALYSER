import React, { useState } from 'react';
import { StockData } from '../data/stocksData';
import { Search, TrendingUp, TrendingDown, Star, ArrowRight, X, ExternalLink, Copy, Check, QrCode } from 'lucide-react';

interface SearchLandingProps {
  stocks: StockData[];
  onSelectStock: (stock: StockData) => void;
  watchlistSymbols: string[];
  onToggleWatchlist: (symbol: string) => void;
  onOpenAccessModal?: () => void;
}

export const SearchLanding: React.FC<SearchLandingProps> = ({
  stocks,
  onSelectStock,
  watchlistSymbols,
  onToggleWatchlist,
  onOpenAccessModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Standalone production URL that runs without Google AI Studio wrapper/logo
  const standaloneUrl = 'https://ais-pre-xc7jw5lozxkcjhuazudke4-594397195869.asia-east1.run.app';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(standaloneUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const categories = [
    { id: 'ALL', label: 'All Stocks' },
    { id: 'INDIA', label: 'Indian Markets (NSE/BSE)' },
    { id: 'TECH', label: 'Technology' },
    { id: 'SEMI', label: 'Semiconductors' },
    { id: 'FIN', label: 'Financials' },
    { id: 'HEALTH', label: 'Healthcare' },
    { id: 'CONSUMER', label: 'Consumer & Retail' },
    { id: 'ETF', label: 'ETFs & Indices' },
  ];

  const filteredStocks = stocks.filter((stock) => {
    // Search query matching
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      stock.symbol.toLowerCase().includes(q) ||
      stock.name.toLowerCase().includes(q) ||
      stock.sector.toLowerCase().includes(q) ||
      (q === 'lic' && stock.symbol === 'LICI') ||
      (q === 'nestle' && stock.symbol.includes('NESTLE')) ||
      (q === 'hindustan' && stock.symbol.includes('HIND')) ||
      (q === 'nifty' && stock.symbol.includes('NIFTY')) ||
      (q === 'gujarat' && stock.symbol === 'GUJINTRX') ||
      (q === 'intrux' && stock.symbol === 'GUJINTRX') ||
      (q === 'hdfc' && stock.symbol === 'HDFCBANK') ||
      (q === 'infosys' && stock.symbol === 'INFY');

    if (!matchesSearch) return false;

    // Category matching
    if (selectedCategory === 'INDIA') {
      return stock.exchange === 'NSE' || stock.exchange === 'BSE' || stock.exchange.includes('NSE') || stock.exchange.includes('BSE') || stock.currency === '₹';
    }
    if (selectedCategory === 'TECH') {
      return stock.sector.includes('Software') || stock.sector.includes('Consumer Electronics') || stock.sector.includes('Social Media') || stock.sector.includes('Internet') || stock.sector.includes('IT');
    }
    if (selectedCategory === 'SEMI') {
      return stock.sector.includes('Semiconductors') || stock.sector.includes('Foundry');
    }
    if (selectedCategory === 'FIN') {
      return stock.sector.includes('Banking') || stock.sector.includes('Financial') || stock.sector.includes('Insurance');
    }
    if (selectedCategory === 'HEALTH') {
      return stock.sector.includes('Pharmaceuticals') || stock.sector.includes('Healthcare');
    }
    if (selectedCategory === 'CONSUMER') {
      return stock.sector.includes('Retail') || stock.sector.includes('Auto') || stock.sector.includes('Entertainment') || stock.sector.includes('E-Commerce') || stock.sector.includes('FMCG');
    }
    if (selectedCategory === 'ETF') {
      return stock.sector.includes('ETF') || stock.sector.includes('Index');
    }
    return true;
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredStocks.length > 0) {
      onSelectStock(filteredStocks[0]);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col justify-start items-center px-4 py-8 sm:py-12 max-w-6xl mx-auto w-full">
      {/* 1. Welcome Title */}
      <div className="text-center mb-6 max-w-3xl flex flex-col items-center">
        <p className="text-xs sm:text-sm md:text-base font-semibold text-[#00f2fe] tracking-wider uppercase font-display bg-[#00f2fe]/10 border border-[#00f2fe]/30 px-4 py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,242,254,0.1)] text-center">
          WELCOME TO THE STOCK MARKET
        </p>
      </div>

      {/* 2. Stock Name Search Box (Search ticker option removed) */}
      <div className="w-full max-w-2xl mb-4 relative">
        <div className="relative flex items-center bg-[#181c23] border-2 border-[#3a494b] focus-within:border-[#00f2fe] rounded-xl shadow-2xl transition-all">
          <Search className="w-6 h-6 text-[#849495] ml-4 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Enter a stock name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full py-4 px-3.5 text-base sm:text-lg bg-transparent text-[#dfe2ed] placeholder-[#849495] focus:outline-none font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mr-3 p-1.5 rounded-full hover:bg-[#262a32] text-[#849495] hover:text-[#dfe2ed] transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Direct Access & Alternative Launch Options */}
      <div className="w-full max-w-md sm:max-w-lg mb-8 p-2 rounded-xl bg-[#141821] border border-[#3a494b]/80 shadow-[0_4px_20px_rgba(0,0,0,0.35)] flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap">
        <button
          onClick={handleCopyUrl}
          className="flex-1 py-2 px-3 rounded-lg bg-[#181c23] hover:bg-[#20252f] border border-[#3a494b] text-[#dfe2ed] hover:text-[#00f2fe] transition-colors flex items-center justify-center gap-1.5 font-mono text-xs font-medium"
          title="Copy direct standalone URL"
        >
          {copiedUrl ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#4edea3]" />
              <span className="text-[#4edea3]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span>Copy URL</span>
            </>
          )}
        </button>

        <a
          href={standaloneUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-3 rounded-lg bg-[#00f2fe] hover:bg-[#6ff6ff] text-[#00373a] font-bold transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,242,254,0.25)] font-mono text-xs whitespace-nowrap active:scale-95"
          title="Open standalone webpage in new tab without Google AI Studio wrapper"
        >
          <span>Open Direct</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {onOpenAccessModal && (
          <button
            onClick={onOpenAccessModal}
            className="flex-1 py-2 px-3 rounded-lg bg-[#181c23] hover:bg-[#20252f] border border-[#00f2fe]/40 text-[#00f2fe] hover:border-[#00f2fe] transition-colors flex items-center justify-center gap-1.5 font-mono text-xs font-medium whitespace-nowrap"
            title="Alternative ways to access (QR Code scanner, Desktop App shortcut, PWA, Terminal CLI)"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR / App</span>
          </button>
        )}
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="w-full max-w-4xl flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/50 font-semibold shadow-[0_0_12px_rgba(0,242,254,0.15)]'
                : 'bg-[#181c23] border border-[#262a32] text-[#849495] hover:text-[#dfe2ed] hover:border-[#3a494b]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 4. Filtered Stocks Results Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredStocks.map((stock) => {
          const isPositive = stock.changePercent >= 0;
          const isStarred = watchlistSymbols.includes(stock.symbol);

          return (
            <div
              key={stock.symbol}
              onClick={() => onSelectStock(stock)}
              className="p-4 rounded-xl bg-[#181c23] border border-[#262a32] hover:border-[#00f2fe]/50 hover:bg-[#1c2027] cursor-pointer transition-all group flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold font-mono text-[#e0fdff] group-hover:text-[#00f2fe] transition-colors">
                        {stock.symbol}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0f131b] border border-[#262a32] text-[#849495]">
                        {stock.exchange}
                      </span>
                    </div>
                    <div className="text-xs text-[#b9cacb] mt-0.5 font-medium truncate max-w-[190px]">
                      {stock.name}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatchlist(stock.symbol);
                    }}
                    className="p-1 rounded text-[#849495] hover:text-[#00f2fe] transition-colors"
                    title={isStarred ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        isStarred ? 'text-[#00f2fe] fill-[#00f2fe]' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="text-[11px] text-[#849495] mt-1 truncate">
                  {stock.sector}
                </div>
              </div>

              {/* Price and Action */}
              <div className="mt-4 pt-3 border-t border-[#262a32]/60 flex items-center justify-between">
                <div>
                  <div className="text-base font-bold font-mono text-[#dfe2ed]">
                    {stock.currency || '₹'}{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div
                    className={`text-xs font-mono font-medium flex items-center gap-0.5 ${
                      isPositive ? 'text-[#4edea3]' : 'text-[#ffb4ab]'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>
                      {isPositive ? '+' : ''}{stock.currency || '₹'}{Math.abs(stock.change).toFixed(2)} ({isPositive ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-[#00f2fe] group-hover:translate-x-1 transition-transform">
                  <span>ANALYZE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}

        {filteredStocks.length === 0 && (
          <div className="col-span-full py-16 text-center text-sm font-mono text-[#849495]">
            No stocks found matching "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};

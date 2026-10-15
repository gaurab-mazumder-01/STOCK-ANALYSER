import React, { useState, useEffect } from 'react';
import { POPULAR_STOCKS, StockData } from './data/stocksData';
import { SimpleHeader } from './components/SimpleHeader';
import { WatchlistSidebar } from './components/WatchlistSidebar';
import { StockOverview } from './components/StockOverview';
import { SearchLanding } from './components/SearchLanding';
import { SimpleTradeModal } from './components/SimpleTradeModal';
import { AccessMethodsModal } from './components/AccessMethodsModal';
import { CheckCircle2, ExternalLink, X } from 'lucide-react';

export default function App() {
  const [stocks, setStocks] = useState<StockData[]>(POPULAR_STOCKS);

  const STANDALONE_URL = 'https://ais-pre-xc7jw5lozxkcjhuazudke4-594397195869.asia-east1.run.app';
  const [isInsideIframe, setIsInsideIframe] = useState(false);
  const [dismissIframeBanner, setDismissIframeBanner] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.self !== window.top) {
        setIsInsideIframe(true);
      }
    } catch {
      setIsInsideIframe(true);
    }
  }, []);

  // Initialize view: check if a symbol is in the URL query parameter
  const getInitialSymbol = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const rawSym = params.get('symbol') || window.location.hash.replace('#', '');
      if (rawSym) {
        const sym = rawSym.toUpperCase().trim();
        const found = POPULAR_STOCKS.find(
          (s) =>
            s.symbol.toUpperCase() === sym ||
            (sym === 'LIC' && s.symbol === 'LICI') ||
            (sym === 'NESTLE' && s.symbol === 'NESTLEIND') ||
            (sym === 'HINDUSTAN' && s.symbol === 'HINDMOTORS') ||
            (sym === 'NIFTY' && s.symbol === 'NIFTY50') ||
            (sym === 'GUJARAT' && s.symbol === 'GUJINTRX') ||
            (sym === 'INTRUX' && s.symbol === 'GUJINTRX') ||
            (sym === 'GUJINTRX' && s.symbol === 'GUJINTRX') ||
            (sym === 'HDFC' && s.symbol === 'HDFCBANK') ||
            (sym === 'INFOSYS' && s.symbol === 'INFY')
        );
        if (found) return found.symbol;
      }
    }
    return null;
  };

  const initialSymbol = getInitialSymbol();
  const [selectedStockSymbol, setSelectedStockSymbol] = useState<string>(
    initialSymbol || POPULAR_STOCKS[0].symbol
  );
  // Default to SEARCH view at first unless a direct stock symbol was requested in URL
  const [currentView, setCurrentView] = useState<'SEARCH' | 'DETAIL'>(
    initialSymbol ? 'DETAIL' : 'SEARCH'
  );

  const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>([
    'NIFTY50',
    'RELIANCE',
    'HDFCBANK',
    'INFY',
    'GUJINTRX',
    'NESTLEIND',
    'LICI',
    'HINDMOTORS',
    'NVDA',
    'AAPL',
    'TSLA',
    'MSFT',
    'SPY',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [paperBalance, setPaperBalance] = useState(50000);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active stock object synchronized with live ticks
  const selectedStock = stocks.find((s) => s.symbol === selectedStockSymbol) || stocks[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Continuous live price ticking engine: updates accurate nearby stock prices every 1.4 seconds
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const isSelected = stock.symbol === selectedStockSymbol;
          // Realistic small market jitter: 0.03% to 0.07% around real price
          const tickDelta = (Math.random() - 0.49) * (stock.price * (isSelected ? 0.0006 : 0.0003));
          const newPrice = Number((stock.price + tickDelta).toFixed(2));
          const newChange = Number((newPrice - stock.previousClose).toFixed(2));
          const newChangePercent = Number(((newChange / stock.previousClose) * 100).toFixed(2));
          const newHigh = Math.max(stock.dayHigh, newPrice);
          const newLow = Math.min(stock.dayLow, newPrice);

          return {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            dayHigh: newHigh,
            dayLow: newLow,
          };
        })
      );
    }, 1400);

    return () => clearInterval(interval);
  }, [isStreaming, selectedStockSymbol]);

  // Handle stock selection: transitions from search interface to detailed running candlestick view
  const handleSelectStock = (stock: StockData) => {
    setSelectedStockSymbol(stock.symbol);
    setCurrentView('DETAIL');
    if (typeof window !== 'undefined' && window.history) {
      const url = new URL(window.location.href);
      url.searchParams.set('app', 'STOCK-ANALYSER');
      url.searchParams.set('symbol', stock.symbol);
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Return to the search interface
  const handleGoToSearch = () => {
    setCurrentView('SEARCH');
    if (typeof window !== 'undefined' && window.history) {
      const url = new URL(window.location.href);
      url.searchParams.set('app', 'STOCK-ANALYSER');
      url.searchParams.delete('symbol');
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Toggle watchlist
  const handleToggleWatchlist = (symbol: string) => {
    if (watchlistSymbols.includes(symbol)) {
      setWatchlistSymbols((prev) => prev.filter((s) => s !== symbol));
      showToast(`Removed ${symbol} from watchlist.`);
    } else {
      setWatchlistSymbols((prev) => [...prev, symbol]);
      showToast(`Added ${symbol} to watchlist.`);
    }
  };

  // Search filtered stocks
  const filteredStocks = stocks.filter(
    (s) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Execute trade handler
  const handleExecuteTrade = (shares: number, isBuy: boolean, totalCost: number) => {
    if (isBuy) {
      setPaperBalance((prev) => prev - totalCost);
      showToast(`Successfully bought ${shares} shares of ${selectedStock.symbol}!`);
    } else {
      setPaperBalance((prev) => prev + totalCost);
      showToast(`Successfully sold ${shares} shares of ${selectedStock.symbol}!`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f131b] text-[#dfe2ed] flex flex-col font-sans selection:bg-[#00f2fe]/20 selection:text-[#e0fdff]">
      {/* Frame Notification Banner: Shown only when loaded inside Google AI Studio's embed/preview frame */}
      {isInsideIframe && !dismissIframeBanner && (
        <div className="bg-gradient-to-r from-[#002d30] via-[#141821] to-[#002d30] border-b border-[#00f2fe]/40 px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2 z-50 text-[#e0fdff] shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#00f2fe] animate-pulse" />
            <span className="font-sans">
              <strong className="text-[#00f2fe]">Notice:</strong> Running inside AI Studio frame. To view without Google AI Studio logo &amp; header:
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={STANDALONE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-[#00f2fe] hover:bg-[#6ff6ff] text-[#00373a] font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
            >
              <span>Open Direct (No AI Studio Logo)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setDismissIframeBanner(true)}
              className="p-1 rounded text-[#849495] hover:text-[#dfe2ed] transition-colors"
              title="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header with Search and Real-Time Stream Status */}
      <SimpleHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredStocks={filteredStocks}
        onSelectStock={handleSelectStock}
        paperBalance={paperBalance}
        onOpenTradeModal={() => setIsTradeModalOpen(true)}
        isStreaming={isStreaming}
        setIsStreaming={setIsStreaming}
        currentView={currentView}
        onGoToSearch={handleGoToSearch}
        onOpenAccessModal={() => setIsAccessModalOpen(true)}
      />

      {/* Main Container: Switches between Search Interface at first and Full Candlestick Stock Overview */}
      {currentView === 'SEARCH' ? (
        <main className="flex-1 w-full">
          <SearchLanding
            stocks={stocks}
            onSelectStock={handleSelectStock}
            watchlistSymbols={watchlistSymbols}
            onToggleWatchlist={handleToggleWatchlist}
            onOpenAccessModal={() => setIsAccessModalOpen(true)}
          />
        </main>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Watchlist Sidebar (4 cols) */}
            <div className="lg:col-span-4 h-[420px] lg:h-[calc(100vh-140px)] lg:sticky lg:top-20">
              <WatchlistSidebar
                stocks={stocks}
                selectedStock={selectedStock}
                onSelectStock={handleSelectStock}
                watchlistSymbols={watchlistSymbols}
                onToggleWatchlist={handleToggleWatchlist}
              />
            </div>

            {/* Right Column: Detailed Stock Overview with Live Candlestick Graph (8 cols) */}
            <div className="lg:col-span-8">
              <StockOverview
                stock={selectedStock}
                isWatchlisted={watchlistSymbols.includes(selectedStock.symbol)}
                onToggleWatchlist={handleToggleWatchlist}
                onOpenTradeModal={() => setIsTradeModalOpen(true)}
              />
            </div>
          </div>
        </main>
      )}

      {/* Trade Simulator Dialog */}
      <SimpleTradeModal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
        stock={selectedStock}
        paperBalance={paperBalance}
        onExecuteTrade={handleExecuteTrade}
      />

      {/* Alternative Access Methods Modal (QR Code, Desktop Shortcut, Mobile PWA, CLI) */}
      <AccessMethodsModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        standaloneUrl={STANDALONE_URL}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#181c23] border border-[#00f2fe]/50 text-[#dfe2ed] px-4 py-2.5 rounded shadow-xl flex items-center gap-2.5 font-mono text-xs animate-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-[#00f2fe]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

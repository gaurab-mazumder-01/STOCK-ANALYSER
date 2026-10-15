import React, { useState } from 'react';
import { TrendingUp, TrendingDown, IndianRupee, ArrowLeft, Copy, Check, ExternalLink, QrCode } from 'lucide-react';
import { StockData } from '../data/stocksData';

interface SimpleHeaderProps {
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  filteredStocks?: StockData[];
  onSelectStock: (stock: StockData) => void;
  paperBalance: number;
  onOpenTradeModal: () => void;
  isStreaming: boolean;
  setIsStreaming: (val: boolean) => void;
  currentView: 'SEARCH' | 'DETAIL';
  onGoToSearch: () => void;
  onOpenAccessModal?: () => void;
}

export const SimpleHeader: React.FC<SimpleHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  filteredStocks,
  onSelectStock,
  paperBalance,
  onOpenTradeModal,
  isStreaming,
  setIsStreaming,
  currentView,
  onGoToSearch,
  onOpenAccessModal,
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Direct clean URL that runs without Google AI Studio logo/frame
  const standaloneUrl = 'https://ais-pre-xc7jw5lozxkcjhuazudke4-594397195869.asia-east1.run.app';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(standaloneUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };
  return (
    <header className="sticky top-0 z-40 bg-[#0f131b] border-b border-[#262a32] px-4 lg:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Market Snapshot */}
        <div className="flex items-center justify-between md:justify-start gap-4 sm:gap-6">
          <div
            onClick={onGoToSearch}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
            title="Go to Search Interface"
          >
            <div className="w-8 h-8 rounded bg-[#00f2fe]/10 border border-[#00f2fe]/40 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#00f2fe]" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#e0fdff] font-display">
              STOCK ANALYSER
            </span>
          </div>

          {/* Back to Search button if in Detail view */}
          {currentView === 'DETAIL' && (
            <button
              onClick={onGoToSearch}
              className="px-2.5 py-1 text-xs font-mono rounded bg-[#181c23] border border-[#3a494b] text-[#b9cacb] hover:text-[#00f2fe] hover:border-[#00f2fe] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Search Other Stocks</span>
            </button>
          )}

          {/* Major Indices Banner */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-[#b9cacb] pl-3 border-l border-[#262a32] overflow-x-auto">
            <div className="flex items-center gap-1">
              <span className="text-[#00f2fe] font-semibold">NIFTY 50:</span>
              <span className="text-[#dfe2ed]">25,014.50</span>
              <span className="text-[#4edea3] flex items-center text-[11px]">
                <TrendingUp className="w-2.5 h-2.5" /> +0.20%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#849495]">SENSEX:</span>
              <span className="text-[#dfe2ed]">81,650.20</span>
              <span className="text-[#4edea3] flex items-center text-[11px]">
                <TrendingUp className="w-2.5 h-2.5" /> +0.21%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#849495]">S&P 500:</span>
              <span className="text-[#dfe2ed]">5,894.25</span>
              <span className="text-[#4edea3] flex items-center text-[11px]">
                <TrendingUp className="w-2.5 h-2.5" /> +0.49%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#849495]">NASDAQ:</span>
              <span className="text-[#dfe2ed]">20,680.50</span>
              <span className="text-[#4edea3] flex items-center text-[11px]">
                <TrendingUp className="w-2.5 h-2.5" /> +0.95%
              </span>
            </div>
          </div>
        </div>

        {/* Search, Live Stream, Standalone URL & Paper Trading */}
        <div className="flex items-center gap-2">
          {/* Direct Standalone URL & Access Methods */}
          <div className="flex items-center gap-1 bg-[#181c23] border border-[#3a494b] rounded p-0.5">
            <button
              onClick={handleCopyUrl}
              className="px-2 py-1 text-xs font-mono rounded text-[#b9cacb] hover:text-[#00f2fe] hover:bg-[#20252f] transition-colors flex items-center gap-1"
              title="Copy direct standalone URL (runs without Google AI Studio logo)"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3 h-3 text-[#4edea3]" />
                  <span className="text-[#4edea3]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-[#00f2fe]" />
                  <span className="hidden sm:inline">Clean URL</span>
                </>
              )}
            </button>
            <a
              href={standaloneUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded text-[#b9cacb] hover:text-[#00f2fe] hover:bg-[#20252f] transition-colors"
              title="Open full-screen direct URL in new tab (No AI Studio logo)"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {onOpenAccessModal && (
              <button
                onClick={onOpenAccessModal}
                className="px-2 py-1 text-xs font-mono rounded text-[#00f2fe] hover:bg-[#20252f] transition-colors flex items-center gap-1 border-l border-[#3a494b]"
                title="Alternative ways to access (QR Scanner, Desktop App, PWA, CLI)"
              >
                <QrCode className="w-3 h-3" />
                <span className="hidden sm:inline">Access</span>
              </button>
            )}
          </div>

          {/* Real-time Streaming Toggle */}
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            title={isStreaming ? 'Pause Real-Time Live Ticker' : 'Resume Real-Time Live Ticker'}
            className={`px-2.5 py-1.5 text-xs font-mono font-medium rounded border transition-all flex items-center gap-1.5 whitespace-nowrap ${
              isStreaming
                ? 'border-[#4edea3]/40 text-[#4edea3] bg-[#4edea3]/10 hover:bg-[#4edea3]/20'
                : 'border-[#3a494b] text-[#849495] bg-[#181c23] hover:text-[#dfe2ed]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isStreaming ? 'bg-[#4edea3] animate-pulse' : 'bg-[#849495]'
              }`}
            />
            <span className="hidden sm:inline">{isStreaming ? 'LIVE TICKS' : 'PAUSED'}</span>
          </button>

          {/* Trade / Simulator Button */}
          <button
            onClick={onOpenTradeModal}
            className="px-3.5 py-1.5 text-xs font-semibold rounded bg-[#00f2fe] text-[#00373a] hover:bg-[#6ff6ff] transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,242,254,0.3)] active:scale-95 whitespace-nowrap"
          >
            <IndianRupee className="w-3.5 h-3.5" />
            <span>TRADE</span>
          </button>
        </div>
      </div>
    </header>
  );
};

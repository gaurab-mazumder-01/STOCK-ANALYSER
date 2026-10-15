import React from 'react';
import { Activity, Plus, Play, Pause } from 'lucide-react';

export type ActiveTab = 'terminal' | 'strategies' | 'portfolio' | 'execution' | 'macro';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isStreaming: boolean;
  setIsStreaming: (val: boolean) => void;
  onOpenOrderModal: () => void;
  portfolioValue: number;
  dailyPnL: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isStreaming,
  setIsStreaming,
  onOpenOrderModal,
}) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0f131b] border-b border-[#262a32] select-none">
      {/* Zone 1: Single text element Brand wordmark */}
      <div className="flex items-center gap-3">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('terminal');
          }}
          className="text-xl sm:text-2xl font-bold tracking-tight text-[#e0fdff] font-display flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-[#00f2fe] inline-block shadow-[0_0_8px_#00f2fe]" />
          STOCK ANALYSER
        </a>
      </div>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-1 lg:gap-2">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors whitespace-nowrap rounded ${
            activeTab === 'terminal'
              ? 'text-[#00f2fe] bg-[#1c2027] border-b-2 border-[#00f2fe]'
              : 'text-[#b9cacb] hover:text-[#dfe2ed] hover:bg-[#181c23]'
          }`}
        >
          Terminal
        </button>

        <button
          onClick={() => setActiveTab('strategies')}
          className={`px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors whitespace-nowrap rounded ${
            activeTab === 'strategies'
              ? 'text-[#00f2fe] bg-[#1c2027] border-b-2 border-[#00f2fe]'
              : 'text-[#b9cacb] hover:text-[#dfe2ed] hover:bg-[#181c23]'
          }`}
        >
          Strategy Lab
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors whitespace-nowrap rounded ${
            activeTab === 'portfolio'
              ? 'text-[#00f2fe] bg-[#1c2027] border-b-2 border-[#00f2fe]'
              : 'text-[#b9cacb] hover:text-[#dfe2ed] hover:bg-[#181c23]'
          }`}
        >
          Risk & Portfolio
        </button>

        <button
          onClick={() => setActiveTab('execution')}
          className={`px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors whitespace-nowrap rounded ${
            activeTab === 'execution'
              ? 'text-[#00f2fe] bg-[#1c2027] border-b-2 border-[#00f2fe]'
              : 'text-[#b9cacb] hover:text-[#dfe2ed] hover:bg-[#181c23]'
          }`}
        >
          Execution Desk
        </button>

        <button
          onClick={() => setActiveTab('macro')}
          className={`px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors whitespace-nowrap rounded ${
            activeTab === 'macro'
              ? 'text-[#00f2fe] bg-[#1c2027] border-b-2 border-[#00f2fe]'
              : 'text-[#b9cacb] hover:text-[#dfe2ed] hover:bg-[#181c23]'
          }`}
        >
          Macro Signals
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Real-time streaming toggle */}
        <button
          onClick={() => setIsStreaming(!isStreaming)}
          title={isStreaming ? 'Pause Real-Time Data' : 'Resume Real-Time Data'}
          className={`px-2.5 py-1.5 text-xs font-mono font-medium rounded border transition-all flex items-center gap-1.5 whitespace-nowrap ${
            isStreaming
              ? 'border-[#00f2fe]/40 text-[#00f2fe] bg-[#00f2fe]/10 hover:bg-[#00f2fe]/20'
              : 'border-[#3a494b] text-[#849495] bg-[#181c23] hover:text-[#dfe2ed]'
          }`}
        >
          {isStreaming ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse" />
              <Pause className="w-3 h-3" />
              <span className="hidden sm:inline">TICK STREAM</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3" />
              <span className="hidden sm:inline">STREAM PAUSED</span>
            </>
          )}
        </button>

        {/* Order ticket trigger */}
        <button
          onClick={onOpenOrderModal}
          className="px-3 py-1.5 text-xs font-mono font-semibold text-[#00373a] bg-[#00f2fe] hover:bg-[#6ff6ff] rounded transition-all shadow-[0_0_12px_rgba(0,242,254,0.35)] flex items-center gap-1.5 whitespace-nowrap active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>EXECUTE ORDER</span>
        </button>
      </div>
    </header>
  );
};

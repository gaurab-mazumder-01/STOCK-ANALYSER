import React, { useState } from 'react';
import { OrderBook, TapePrint, Asset } from '../../types/terminal';
import { ArrowDownRight, ArrowUpRight, Radio } from 'lucide-react';

interface OrderBookDepthProps {
  asset: Asset;
  orderBook: OrderBook;
  tapePrints: TapePrint[];
  onSelectPrice: (price: number, side: 'BUY' | 'SELL') => void;
}

export const OrderBookDepth: React.FC<OrderBookDepthProps> = ({
  asset,
  orderBook,
  tapePrints,
  onSelectPrice,
}) => {
  const [viewMode, setViewMode] = useState<'BOOK' | 'TAPE' | 'SPLIT'>('SPLIT');

  const formatPrice = (p: number) =>
    asset.price < 5
      ? p.toFixed(4)
      : p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="bg-[#181c23] border border-[#262a32] rounded flex flex-col h-full overflow-hidden">
      {/* Header & Sub-Tabs */}
      <div className="p-3 border-b border-[#262a32] flex items-center justify-between bg-[#181c23]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold tracking-wider text-[#00f2fe] uppercase">
            Microstructure
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono text-[#4edea3]">
            <Radio className="w-2.5 h-2.5 animate-pulse text-[#4edea3]" />
            <span>L2 DEPTH</span>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center bg-[#0f131b] border border-[#3a494b] rounded p-0.5">
          <button
            onClick={() => setViewMode('BOOK')}
            className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
              viewMode === 'BOOK'
                ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                : 'text-[#849495] hover:text-[#dfe2ed]'
            }`}
          >
            BOOK
          </button>
          <button
            onClick={() => setViewMode('SPLIT')}
            className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
              viewMode === 'SPLIT'
                ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                : 'text-[#849495] hover:text-[#dfe2ed]'
            }`}
          >
            SPLIT
          </button>
          <button
            onClick={() => setViewMode('TAPE')}
            className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
              viewMode === 'TAPE'
                ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                : 'text-[#849495] hover:text-[#dfe2ed]'
            }`}
          >
            TAPE
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 overflow-hidden">
        {/* If Book or Split view */}
        {(viewMode === 'BOOK' || viewMode === 'SPLIT') && (
          <div className={`flex flex-col overflow-hidden ${viewMode === 'SPLIT' ? 'border-b border-[#262a32]' : 'h-full'}`}>
            {/* Table headers */}
            <div className="grid grid-cols-3 text-[10px] font-mono text-[#849495] px-3 py-1 bg-[#0f131b]/60 border-b border-[#262a32]">
              <span>PRICE ({asset.baseCurrency})</span>
              <span className="text-right">SIZE</span>
              <span className="text-right">TOTAL</span>
            </div>

            {/* Asks (Sells) reversed so lowest ask is at bottom */}
            <div className="flex-1 flex flex-col justify-end overflow-hidden divide-y divide-[#262a32]/20 font-mono text-[11px]">
              {[...orderBook.asks].reverse().slice(0, viewMode === 'SPLIT' ? 5 : 8).map((ask, i) => (
                <div
                  key={`ask-${i}`}
                  onClick={() => onSelectPrice(ask.price, 'BUY')}
                  className="relative grid grid-cols-3 px-3 py-0.5 cursor-pointer hover:bg-[#ffb4ab]/10 transition-colors group"
                >
                  {/* Depth visual bar */}
                  <div
                    className="absolute inset-y-0 right-0 bg-[#ffb4ab]/10 pointer-events-none group-hover:bg-[#ffb4ab]/20 transition-all"
                    style={{ width: `${ask.percent}%` }}
                  />
                  <span className="relative text-[#ffb4ab] font-medium font-mono-numbers">
                    {formatPrice(ask.price)}
                  </span>
                  <span className="relative text-right text-[#dfe2ed] font-mono-numbers">
                    {ask.size}
                  </span>
                  <span className="relative text-right text-[#849495] font-mono-numbers">
                    {ask.total}
                  </span>
                </div>
              ))}
            </div>

            {/* Mid Price / Spread Ribbon */}
            <div className="py-1 px-3 bg-[#0f131b] border-y border-[#262a32] flex items-center justify-between text-xs font-mono font-medium">
              <div className="flex items-center gap-2">
                <span className="text-[#dfe2ed] font-mono-numbers font-semibold">
                  ${formatPrice(asset.price)}
                </span>
                <span className="text-[10px] text-[#849495]">MID</span>
              </div>
              <div className="text-[10px] text-[#849495] flex items-center gap-1.5 font-mono-numbers">
                <span>Spread: ${orderBook.spread}</span>
                <span className="text-[#00f2fe]">({orderBook.spreadBps} bps)</span>
              </div>
            </div>

            {/* Bids (Buys) */}
            <div className="flex-1 overflow-hidden divide-y divide-[#262a32]/20 font-mono text-[11px]">
              {orderBook.bids.slice(0, viewMode === 'SPLIT' ? 5 : 8).map((bid, i) => (
                <div
                  key={`bid-${i}`}
                  onClick={() => onSelectPrice(bid.price, 'SELL')}
                  className="relative grid grid-cols-3 px-3 py-0.5 cursor-pointer hover:bg-[#4edea3]/10 transition-colors group"
                >
                  {/* Depth visual bar */}
                  <div
                    className="absolute inset-y-0 right-0 bg-[#4edea3]/10 pointer-events-none group-hover:bg-[#4edea3]/20 transition-all"
                    style={{ width: `${bid.percent}%` }}
                  />
                  <span className="relative text-[#4edea3] font-medium font-mono-numbers">
                    {formatPrice(bid.price)}
                  </span>
                  <span className="relative text-right text-[#dfe2ed] font-mono-numbers">
                    {bid.size}
                  </span>
                  <span className="relative text-right text-[#849495] font-mono-numbers">
                    {bid.total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If Tape or Split view */}
        {(viewMode === 'TAPE' || viewMode === 'SPLIT') && (
          <div className="flex flex-col overflow-hidden h-full">
            <div className="grid grid-cols-3 text-[10px] font-mono text-[#849495] px-3 py-1 bg-[#0f131b]/60 border-b border-[#262a32]">
              <span>TAPE (UTC)</span>
              <span className="text-right">PRICE</span>
              <span className="text-right">QTY / SIDE</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#262a32]/30 font-mono text-[11px]">
              {tapePrints.slice(0, viewMode === 'SPLIT' ? 8 : 16).map((print) => {
                const isBuy = print.side === 'BUY';
                return (
                  <div
                    key={print.id}
                    className="grid grid-cols-3 px-3 py-1 hover:bg-[#1c2027] transition-colors items-center"
                  >
                    <span className="text-[#849495] text-[10px] font-mono-numbers">
                      {print.timestamp.split('.')[0]}
                    </span>
                    <span
                      className={`text-right font-medium font-mono-numbers ${
                        isBuy ? 'text-[#4edea3]' : 'text-[#ffb4ab]'
                      }`}
                    >
                      {formatPrice(print.price)}
                    </span>
                    <div className="text-right flex items-center justify-end gap-1 font-mono-numbers">
                      <span className="text-[#dfe2ed]">{print.size}</span>
                      <span
                        className={`text-[9px] px-1 rounded ${
                          isBuy ? 'bg-[#4edea3]/20 text-[#4edea3]' : 'bg-[#ffb4ab]/20 text-[#ffb4ab]'
                        }`}
                      >
                        {print.side}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

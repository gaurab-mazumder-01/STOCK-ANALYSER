import React, { useState } from 'react';
import { StockData } from '../data/stocksData';
import { X, Check, DollarSign } from 'lucide-react';

interface SimpleTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: StockData;
  paperBalance: number;
  onExecuteTrade: (shares: number, isBuy: boolean, totalCost: number) => void;
}

export const SimpleTradeModal: React.FC<SimpleTradeModalProps> = ({
  isOpen,
  onClose,
  stock,
  paperBalance,
  onExecuteTrade,
}) => {
  const [shares, setShares] = useState(10);
  const [isBuy, setIsBuy] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const curr = stock.currency || '₹';
  const totalCost = shares * stock.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shares <= 0) return;
    if (isBuy && totalCost > paperBalance) return;

    onExecuteTrade(shares, isBuy, totalCost);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-[#181c23] border border-[#3a494b] rounded-lg max-w-sm w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-[#262a32] flex items-center justify-between bg-[#0f131b]">
          <div>
            <h3 className="text-sm font-bold text-[#e0fdff] font-display">
              {isBuy ? 'Buy' : 'Sell'} {stock.symbol}
            </h3>
            <p className="text-xs text-[#849495]">{stock.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#849495] hover:text-[#dfe2ed] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-[#4edea3]/20 border border-[#4edea3] rounded-full flex items-center justify-center mx-auto text-[#4edea3]">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#dfe2ed]">Order Executed!</h4>
            <p className="text-xs text-[#849495]">
              {isBuy ? 'Bought' : 'Sold'} {shares} shares of {stock.symbol} for {curr}{totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Buy / Sell Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-[#0f131b] p-1 rounded border border-[#262a32]">
              <button
                type="button"
                onClick={() => setIsBuy(true)}
                className={`py-1.5 text-xs font-semibold rounded transition-colors ${
                  isBuy
                    ? 'bg-[#4edea3] text-[#003824] shadow'
                    : 'text-[#849495] hover:text-[#dfe2ed]'
                }`}
              >
                Buy {stock.symbol}
              </button>
              <button
                type="button"
                onClick={() => setIsBuy(false)}
                className={`py-1.5 text-xs font-semibold rounded transition-colors ${
                  !isBuy
                    ? 'bg-[#ffb4ab] text-[#690005] shadow'
                    : 'text-[#849495] hover:text-[#dfe2ed]'
                }`}
              >
                Sell {stock.symbol}
              </button>
            </div>

            {/* Price per share */}
            <div className="flex justify-between items-center text-xs font-mono text-[#b9cacb] bg-[#0f131b] p-2.5 rounded border border-[#262a32]">
              <span>Market Price:</span>
              <span className="font-bold text-[#dfe2ed]">{curr}{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            {/* Shares Input */}
            <div className="space-y-1.5">
              <label className="text-xs text-[#b9cacb]">Number of Shares</label>
              <input
                type="number"
                min="1"
                step="1"
                value={shares}
                onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 text-sm font-mono bg-[#0f131b] border border-[#3a494b] rounded text-[#dfe2ed] focus:outline-none focus:border-[#00f2fe]"
              />

              {/* Quick additions */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[5, 10, 25, 50].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setShares(count)}
                    className="py-1 text-xs font-mono bg-[#0f131b] border border-[#262a32] rounded text-[#849495] hover:text-[#00f2fe] hover:border-[#00f2fe]"
                  >
                    +{count}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Cost & Available Balance */}
            <div className="space-y-1 pt-2 border-t border-[#262a32] text-xs font-mono">
              <div className="flex justify-between text-[#b9cacb]">
                <span>Total Estimated Cost:</span>
                <span className="font-bold text-[#dfe2ed]">
                  {curr}{totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-[#849495]">
                <span>Paper Cash Balance:</span>
                <span>₹{paperBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {isBuy && totalCost > paperBalance && (
              <p className="text-xs text-[#ffb4ab] font-sans">
                Insufficient cash balance for this order.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isBuy && totalCost > paperBalance}
              className={`w-full py-2.5 text-xs font-mono font-bold rounded transition-all shadow-md ${
                isBuy
                  ? 'bg-[#4edea3] text-[#003824] hover:bg-[#6ffbbe] disabled:opacity-40'
                  : 'bg-[#ffb4ab] text-[#690005] hover:bg-[#ffdad6] disabled:opacity-40'
              }`}
            >
              {isBuy ? 'Confirm Buy Order' : 'Confirm Sell Order'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

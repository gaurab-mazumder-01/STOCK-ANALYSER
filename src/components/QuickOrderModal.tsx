import React, { useState, useEffect } from 'react';
import { Asset, ExecutionOrder } from '../types/terminal';
import { X, ArrowUpRight, ArrowDownRight, Send, Check } from 'lucide-react';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset;
  assets: Asset[];
  defaultSide?: 'BUY' | 'SELL';
  defaultPrice?: number;
  onSubmitOrder: (order: Omit<ExecutionOrder, 'id' | 'timestamp' | 'status' | 'filledQty' | 'avgFillPrice' | 'slippageBps'>) => void;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  isOpen,
  onClose,
  asset,
  assets,
  defaultSide = 'BUY',
  defaultPrice,
  onSubmitOrder,
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState(asset.symbol);
  const [side, setSide] = useState<'BUY' | 'SELL'>(defaultSide);
  const [orderType, setOrderType] = useState<'LIMIT' | 'MARKET' | 'TWAP' | 'VWAP' | 'ICEBERG'>('LIMIT');
  const [quantity, setQuantity] = useState(250);
  const [route, setRoute] = useState<'SOR' | 'IEX' | 'DARK_POOL' | 'NASDAQ' | 'BATS'>('SOR');
  const [isSuccess, setIsSuccess] = useState(false);

  const currentAsset = assets.find((a) => a.symbol === selectedSymbol) || asset;
  const [price, setPrice] = useState(defaultPrice || currentAsset.price);

  useEffect(() => {
    setSelectedSymbol(asset.symbol);
    setSide(defaultSide);
    setPrice(defaultPrice || asset.price);
  }, [asset, defaultSide, defaultPrice, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) return;

    onSubmitOrder({
      symbol: selectedSymbol,
      side,
      orderType,
      quantity,
      price: orderType === 'MARKET' ? currentAsset.price : price,
      route,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 700);
  };

  const notional = quantity * (orderType === 'MARKET' ? currentAsset.price : price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-[#181c23] border border-[#3a494b] rounded-lg max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-[#262a32] flex items-center justify-between bg-[#0f131b]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-xs bg-[#00f2fe]" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#e0fdff]">
              Quick Order Execution
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#849495] hover:text-[#dfe2ed] hover:bg-[#262a32] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-[#4edea3]/20 border border-[#4edea3] rounded-full flex items-center justify-center mx-auto text-[#4edea3]">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-mono font-bold text-[#dfe2ed]">
              Order Routed & Executed
            </h4>
            <p className="text-xs font-mono text-[#849495]">
              Filled {quantity} {selectedSymbol} @ ₹{price.toFixed(2)} via {route}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Asset Select */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#849495]">TICKER</label>
              <select
                value={selectedSymbol}
                onChange={(e) => {
                  setSelectedSymbol(e.target.value);
                  const a = assets.find((x) => x.symbol === e.target.value);
                  if (a) setPrice(a.price);
                }}
                className="w-full px-3 py-1.5 text-xs font-mono bg-[#0f131b] border border-[#3a494b] rounded text-[#dfe2ed] focus:outline-none focus:border-[#00f2fe]"
              >
                {assets.map((a) => (
                  <option key={a.symbol} value={a.symbol}>
                    {a.symbol} — {a.name} (₹{a.price.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            {/* Buy / Sell tabs */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSide('BUY')}
                className={`py-2 text-xs font-mono font-bold rounded flex items-center justify-center gap-1.5 transition-all ${
                  side === 'BUY'
                    ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_10px_rgba(78,222,163,0.3)]'
                    : 'bg-[#0f131b] border border-[#3a494b] text-[#b9cacb]'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>BUY</span>
              </button>

              <button
                type="button"
                onClick={() => setSide('SELL')}
                className={`py-2 text-xs font-mono font-bold rounded flex items-center justify-center gap-1.5 transition-all ${
                  side === 'SELL'
                    ? 'bg-[#ffb4ab] text-[#690005] shadow-[0_0_10px_rgba(255,180,171,0.3)]'
                    : 'bg-[#0f131b] border border-[#3a494b] text-[#b9cacb]'
                }`}
              >
                <ArrowDownRight className="w-4 h-4" />
                <span>SELL</span>
              </button>
            </div>

            {/* Order type */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#849495]">ORDER TYPE</label>
              <div className="grid grid-cols-4 gap-1 bg-[#0f131b] p-1 rounded border border-[#3a494b]">
                {(['LIMIT', 'MARKET', 'TWAP', 'ICEBERG'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setOrderType(t)}
                    className={`py-1 text-[10px] font-mono rounded ${
                      orderType === t
                        ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                        : 'text-[#849495]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-[#849495]">
                <span>QUANTITY</span>
                <span>Notional: ₹{notional.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-1.5 text-xs font-mono bg-[#0f131b] border border-[#3a494b] rounded text-[#dfe2ed] focus:outline-none focus:border-[#00f2fe]"
              />
            </div>

            {/* Price (if not market) */}
            {orderType !== 'MARKET' && (
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#849495]">LIMIT PRICE (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs font-mono bg-[#0f131b] border border-[#3a494b] rounded text-[#dfe2ed] focus:outline-none focus:border-[#00f2fe]"
                />
              </div>
            )}

            {/* Venue */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#849495]">ROUTING VENUE</label>
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs font-mono bg-[#0f131b] border border-[#3a494b] rounded text-[#dfe2ed] focus:outline-none focus:border-[#00f2fe]"
              >
                <option value="SOR">SOR — Smart Order Routing Algorithmic Sweep</option>
                <option value="IEX">IEX — Speed Bump 350µs Protection</option>
                <option value="DARK_POOL">DARK POOL — Midpoint Block Cross</option>
                <option value="NASDAQ">NASDAQ — Direct Market Access</option>
                <option value="BATS">BATS — Fee Rebate Optimization</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 text-xs font-mono font-bold text-[#00373a] bg-[#00f2fe] hover:bg-[#6ff6ff] rounded transition-all shadow-[0_0_15px_rgba(0,242,254,0.35)] flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>TRANSMIT {side} ORDER</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

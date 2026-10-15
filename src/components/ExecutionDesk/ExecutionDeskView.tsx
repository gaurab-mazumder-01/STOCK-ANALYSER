import React, { useState } from 'react';
import { Asset, ExecutionOrder } from '../../types/terminal';
import { Send, CheckCircle2, Clock, XCircle, ArrowUpRight, ArrowDownRight, Cpu, Shield } from 'lucide-react';

interface ExecutionDeskViewProps {
  assets: Asset[];
  orders: ExecutionOrder[];
  onSubmitOrder: (order: Omit<ExecutionOrder, 'id' | 'timestamp' | 'status' | 'filledQty' | 'avgFillPrice' | 'slippageBps'>) => void;
  onCancelOrder: (id: string) => void;
}

export const ExecutionDeskView: React.FC<ExecutionDeskViewProps> = ({
  assets,
  orders,
  onSubmitOrder,
  onCancelOrder,
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState(assets[0]?.symbol || 'NVDA');
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'LIMIT' | 'MARKET' | 'TWAP' | 'VWAP' | 'ICEBERG'>('LIMIT');
  const [quantity, setQuantity] = useState(500);
  const [route, setRoute] = useState<'SOR' | 'IEX' | 'DARK_POOL' | 'NASDAQ' | 'BATS'>('SOR');
  const [slippageTolerance, setSlippageTolerance] = useState(1.5); // bps

  const activeAsset = assets.find((a) => a.symbol === selectedSymbol) || assets[0];
  const [limitPrice, setLimitPrice] = useState(activeAsset?.price || 100);

  const handleAssetChange = (sym: string) => {
    setSelectedSymbol(sym);
    const asset = assets.find((a) => a.symbol === sym);
    if (asset) setLimitPrice(asset.price);
  };

  const handleQuickPercent = (pct: number) => {
    const base = activeAsset.price < 50 ? 5000 : 500;
    setQuantity(Math.floor(base * pct));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) return;

    onSubmitOrder({
      symbol: selectedSymbol,
      side,
      orderType,
      quantity,
      price: orderType === 'MARKET' ? activeAsset.price : limitPrice,
      route,
    });
  };

  const totalNotional = quantity * (orderType === 'MARKET' ? activeAsset.price : limitPrice);
  const estimatedImpactBps = Number((0.4 + (quantity / 5000) * 0.8).toFixed(2));
  const estimatedImpactCost = Number(((totalNotional * estimatedImpactBps) / 10000).toFixed(2));

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262a32] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-[#e0fdff] tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#00f2fe]" />
            Smart Order Routing (SOR) & Execution Desk
          </h1>
          <p className="text-xs sm:text-sm text-[#b9cacb] mt-1 font-sans">
            Ultra-low latency algorithmic order routing, toxic flow mitigation (IEX Speed Bump), and dark pool crossing.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#4edea3] bg-[#4edea3]/10 px-3 py-1.5 rounded border border-[#4edea3]/30">
          <Shield className="w-4 h-4" />
          <span>MICROSTRUCTURE SOR ACTIVE · 0.35ms ROUTE LATENCY</span>
        </div>
      </div>

      {/* Grid: Order Entry Ticket (5 cols) + Execution Audit Ledger (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Order Entry Form */}
        <div className="lg:col-span-5 bg-[#181c23] border border-[#262a32] rounded p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[#262a32] pb-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00f2fe]">
              Algorithmic Order Ticket
            </span>
            <span className="text-xs font-mono text-[#849495]">
              MID: ${activeAsset.price < 5 ? activeAsset.price.toFixed(4) : activeAsset.price.toFixed(2)}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Asset Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#b9cacb]">Underlying Asset Universe</label>
              <select
                value={selectedSymbol}
                onChange={(e) => handleAssetChange(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-[#0f131b] border border-[#3a494b] rounded text-[#dfe2ed] focus:outline-none focus:border-[#00f2fe]"
              >
                {assets.map((a) => (
                  <option key={a.symbol} value={a.symbol}>
                    {a.symbol} — {a.name} (${a.price.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            {/* Side Buttons (BUY / SELL) */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSide('BUY')}
                className={`py-2 text-xs font-mono font-bold rounded flex items-center justify-center gap-1.5 transition-all ${
                  side === 'BUY'
                    ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_12px_rgba(78,222,163,0.35)]'
                    : 'bg-[#0f131b] border border-[#3a494b] text-[#b9cacb] hover:text-[#4edea3]'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>BUY (LONG)</span>
              </button>

              <button
                type="button"
                onClick={() => setSide('SELL')}
                className={`py-2 text-xs font-mono font-bold rounded flex items-center justify-center gap-1.5 transition-all ${
                  side === 'SELL'
                    ? 'bg-[#ffb4ab] text-[#690005] shadow-[0_0_12px_rgba(255,180,171,0.35)]'
                    : 'bg-[#0f131b] border border-[#3a494b] text-[#b9cacb] hover:text-[#ffb4ab]'
                }`}
              >
                <ArrowDownRight className="w-4 h-4" />
                <span>SELL (SHORT)</span>
              </button>
            </div>

            {/* Order Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#b9cacb]">Execution Algorithm / Type</label>
              <div className="grid grid-cols-5 gap-1 bg-[#0f131b] p-1 rounded border border-[#3a494b]">
                {(['LIMIT', 'MARKET', 'TWAP', 'VWAP', 'ICEBERG'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setOrderType(t)}
                    className={`py-1 text-[10px] font-mono rounded transition-colors ${
                      orderType === t
                        ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                        : 'text-[#849495] hover:text-[#dfe2ed]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Quick Percent */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-[#b9cacb]">
                <span>Order Quantity (Units)</span>
                <span>Notional: ${totalNotional.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-xs font-mono font-mono-numbers bg-[#0f131b] border border-[#3a494b] rounded text-[#dfe2ed] focus:outline-none focus:border-[#00f2fe]"
              />
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[0.25, 0.5, 0.75, 1.0].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleQuickPercent(pct)}
                    className="py-1 text-[10px] font-mono rounded bg-[#0f131b] border border-[#262a32] text-[#849495] hover:text-[#00f2fe] hover:border-[#00f2fe]"
                  >
                    {pct * 100}%
                  </button>
                ))}
              </div>
            </div>

            {/* Limit Price if not market */}
            {orderType !== 'MARKET' && (
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#b9cacb]">Limit Execution Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono font-mono-numbers bg-[#0f131b] border border-[#3a494b] rounded text-[#dfe2ed] focus:outline-none focus:border-[#00f2fe]"
                />
              </div>
            )}

            {/* Venue Routing */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#b9cacb]">Execution Venue Destination</label>
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value as any)}
                className="w-full px-3 py-2 text-xs font-mono bg-[#0f131b] border border-[#3a494b] rounded text-[#dfe2ed] focus:outline-none focus:border-[#00f2fe]"
              >
                <option value="SOR">SOR — Smart Order Routing Algorithmic Sweep</option>
                <option value="IEX">IEX — Investors Exchange (350µs Speed Bump)</option>
                <option value="DARK_POOL">DARK POOL — Midpoint Block Crossing</option>
                <option value="NASDAQ">NASDAQ — Direct Market Access (DMA)</option>
                <option value="BATS">BATS Chi-X — Maker-Taker Fee Optimizer</option>
              </select>
            </div>

            {/* Microstructure Metrics Box */}
            <div className="bg-[#0f131b] border border-[#262a32] rounded p-3 space-y-1 text-xs font-mono text-[#849495]">
              <div className="flex justify-between">
                <span>Est. Market Impact:</span>
                <span className="text-[#dfe2ed] font-mono-numbers font-medium">
                  {estimatedImpactBps} bps (~${estimatedImpactCost})
                </span>
              </div>
              <div className="flex justify-between">
                <span>SOR Swept Venues:</span>
                <span className="text-[#00f2fe]">12 Lit & Dark Venues</span>
              </div>
              <div className="flex justify-between">
                <span>Routing Latency:</span>
                <span className="text-[#4edea3]">0.35 ms</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 text-xs font-mono font-bold text-[#00373a] bg-[#00f2fe] hover:bg-[#6ff6ff] rounded transition-all shadow-[0_0_15px_rgba(0,242,254,0.35)] flex items-center justify-center gap-2 active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>SUBMIT {side} {quantity} {selectedSymbol}</span>
            </button>
          </form>
        </div>

        {/* Orders Audit Ledger */}
        <div className="lg:col-span-7 bg-[#181c23] border border-[#262a32] rounded flex flex-col h-full overflow-hidden">
          <div className="p-3 border-b border-[#262a32] flex items-center justify-between bg-[#181c23]">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00f2fe]">
                Real-Time Order Execution Log
              </span>
              <span className="text-[11px] font-mono text-[#849495]">({orders.length} Records)</span>
            </div>
            <span className="text-[10px] font-mono text-[#4edea3]">SYNCHRONIZED AUDIT TRAIL</span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#262a32] bg-[#0f131b]/60 sticky top-0 z-10 text-[10px] font-mono text-[#849495]">
                  <th className="py-2.5 px-3 font-medium">TIME / ID</th>
                  <th className="py-2.5 px-2.5 font-medium">ASSET</th>
                  <th className="py-2.5 px-2 font-medium">SIDE</th>
                  <th className="py-2.5 px-2 font-medium">TYPE</th>
                  <th className="py-2.5 px-3 font-medium text-right">QTY / FILL</th>
                  <th className="py-2.5 px-3 font-medium text-right">PRICE</th>
                  <th className="py-2.5 px-2.5 font-medium text-center">STATUS</th>
                  <th className="py-2.5 px-2.5 font-medium text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262a32]/60 font-mono text-xs">
                {orders.map((ord) => {
                  const isBuy = ord.side === 'BUY';
                  const isExecuted = ord.status === 'EXECUTED';
                  const isWorking = ord.status === 'WORKING';

                  return (
                    <tr key={ord.id} className="hover:bg-[#1c2027] transition-colors">
                      <td className="py-3 px-3">
                        <div className="text-[#dfe2ed] font-mono-numbers">{ord.timestamp}</div>
                        <div className="text-[9px] text-[#849495]">{ord.id} · {ord.route}</div>
                      </td>

                      <td className="py-3 px-2.5 font-bold text-[#dfe2ed]">
                        {ord.symbol}
                      </td>

                      <td className="py-3 px-2">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isBuy
                              ? 'bg-[#4edea3]/20 text-[#4edea3]'
                              : 'bg-[#ffb4ab]/20 text-[#ffb4ab]'
                          }`}
                        >
                          {ord.side}
                        </span>
                      </td>

                      <td className="py-3 px-2 text-[10px] text-[#b9cacb]">
                        {ord.orderType}
                      </td>

                      <td className="py-3 px-3 text-right font-mono-numbers text-[#dfe2ed]">
                        {ord.filledQty} / {ord.quantity}
                      </td>

                      <td className="py-3 px-3 text-right font-mono-numbers text-[#dfe2ed]">
                        ${ord.avgFillPrice < 5 ? ord.avgFillPrice.toFixed(4) : ord.avgFillPrice.toFixed(2)}
                      </td>

                      <td className="py-3 px-2.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded ${
                            isExecuted
                              ? 'bg-[#4edea3]/15 text-[#4edea3]'
                              : isWorking
                              ? 'bg-[#00f2fe]/15 text-[#00f2fe] animate-pulse'
                              : 'bg-[#ffb4ab]/15 text-[#ffb4ab]'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>

                      <td className="py-3 px-2.5 text-center">
                        {isWorking ? (
                          <button
                            onClick={() => onCancelOrder(ord.id)}
                            className="text-[10px] text-[#ffb4ab] hover:underline"
                          >
                            Cancel
                          </button>
                        ) : (
                          <span className="text-[10px] text-[#849495]">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

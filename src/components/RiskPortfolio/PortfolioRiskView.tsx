import React, { useState } from 'react';
import { Position, StressScenario } from '../../types/terminal';
import { STRESS_SCENARIOS } from '../../data/mockMarketData';
import { ShieldCheck, AlertTriangle, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Layers, DollarSign } from 'lucide-react';

interface PortfolioRiskViewProps {
  positions: Position[];
  onClosePosition: (id: string) => void;
  onOpenOrderModal: () => void;
}

export const PortfolioRiskView: React.FC<PortfolioRiskViewProps> = ({
  positions,
  onClosePosition,
  onOpenOrderModal,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<StressScenario>(STRESS_SCENARIOS[0]);

  // Aggregate metrics
  const totalExposure = positions.reduce((acc, p) => acc + p.exposure, 0);
  const totalUnrealizedPnL = positions.reduce((acc, p) => acc + p.unrealizedPnL, 0);
  const cashBalance = 2580000;
  const totalPortfolioValue = totalExposure + cashBalance;

  // Factor loadings
  const factorExposures = [
    { factor: 'Momentum', loading: 0.82, benchmark: 0.2, category: 'Style' },
    { factor: 'Quality (ROE/FCF)', loading: 0.65, benchmark: 0.15, category: 'Style' },
    { factor: 'Size (Large-Cap)', loading: 0.45, benchmark: 0.5, category: 'Macro' },
    { factor: 'Value (E/P)', loading: -0.28, benchmark: -0.1, category: 'Style' },
    { factor: 'Low Volatility', loading: -0.34, benchmark: -0.05, category: 'Risk' },
    { factor: 'Residual Alpha', loading: 0.91, benchmark: 0.0, category: 'Alpha' },
  ];

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Title & Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262a32] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-[#e0fdff] tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#4edea3]" />
            Portfolio Analytics & Factor Risk Attribution
          </h1>
          <p className="text-xs sm:text-sm text-[#b9cacb] mt-1 font-sans">
            Real-time Mark-to-Market exposures, multi-factor risk decomposition, and stress scenario simulation.
          </p>
        </div>

        <button
          onClick={onOpenOrderModal}
          className="px-4 py-2 text-xs font-mono font-semibold text-[#00373a] bg-[#00f2fe] hover:bg-[#6ff6ff] rounded transition-all shadow-[0_0_12px_rgba(0,242,254,0.3)] flex items-center gap-2 self-start sm:self-auto"
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>REBALANCE / ALLOCATE</span>
        </button>
      </div>

      {/* Top Telemetry Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-[#181c23] border border-[#262a32] rounded p-3.5 col-span-2 sm:col-span-1">
          <div className="text-[10px] font-mono text-[#849495] uppercase">Total Portfolio NAV</div>
          <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#dfe2ed] mt-1">
            ${totalPortfolioValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[10px] font-mono text-[#4edea3] mt-0.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.8% YTD Outperformance</span>
          </div>
        </div>

        <div className="bg-[#181c23] border border-[#262a32] rounded p-3.5">
          <div className="text-[10px] font-mono text-[#849495] uppercase">Unrealized P&L</div>
          <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#4edea3] mt-1">
            +${totalUnrealizedPnL.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[10px] font-mono text-[#849495] mt-0.5">Across {positions.length} active books</div>
        </div>

        <div className="bg-[#181c23] border border-[#262a32] rounded p-3.5">
          <div className="text-[10px] font-mono text-[#849495] uppercase">Unallocated Cash</div>
          <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#00f2fe] mt-1">
            ${cashBalance.toLocaleString()}
          </div>
          <div className="text-[10px] font-mono text-[#849495] mt-0.5">17.4% Dry Powder Buffer</div>
        </div>

        <div className="bg-[#181c23] border border-[#262a32] rounded p-3.5">
          <div className="text-[10px] font-mono text-[#849495] uppercase">Value at Risk (99% 1D)</div>
          <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#ffb4ab] mt-1">
            -$142,500
          </div>
          <div className="text-[10px] font-mono text-[#849495] mt-0.5">0.96% of Net Equity</div>
        </div>

        <div className="bg-[#181c23] border border-[#262a32] rounded p-3.5">
          <div className="text-[10px] font-mono text-[#849495] uppercase">Benchmark Beta</div>
          <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#dfe2ed] mt-1">
            0.42
          </div>
          <div className="text-[10px] font-mono text-[#4edea3] mt-0.5">Market-Neutral Skew</div>
        </div>
      </div>

      {/* Live Positions Table */}
      <div className="bg-[#181c23] border border-[#262a32] rounded overflow-hidden space-y-0">
        <div className="p-3 border-b border-[#262a32] flex items-center justify-between bg-[#181c23]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold tracking-wider text-[#00f2fe] uppercase">
              Active Strategy Holdings & Mark-to-Market
            </span>
            <span className="text-[11px] font-mono text-[#849495]">({positions.length} Positions)</span>
          </div>
          <span className="text-[10px] font-mono text-[#4edea3]">LIVE AGGREGATE DELTA: +0.65</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#262a32] bg-[#0f131b]/60 text-[10px] font-mono text-[#849495]">
                <th className="py-2.5 px-3 font-medium">ASSET</th>
                <th className="py-2.5 px-2 font-medium">SIDE</th>
                <th className="py-2.5 px-3 font-medium text-right">SIZE</th>
                <th className="py-2.5 px-3 font-medium text-right">ENTRY</th>
                <th className="py-2.5 px-3 font-medium text-right">MARK</th>
                <th className="py-2.5 px-3 font-medium text-right">EXPOSURE</th>
                <th className="py-2.5 px-3 font-medium text-right">UNREALIZED P&L</th>
                <th className="py-2.5 px-3 font-medium text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262a32]/60 font-mono text-xs">
              {positions.map((pos) => {
                const isLong = pos.side === 'LONG';
                const isProfit = pos.unrealizedPnL >= 0;

                return (
                  <tr key={pos.id} className="hover:bg-[#1c2027] transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#dfe2ed]">{pos.symbol}</div>
                      <div className="text-[10px] text-[#849495]">{pos.name}</div>
                    </td>

                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded ${
                          isLong
                            ? 'bg-[#4edea3]/15 text-[#4edea3] border border-[#4edea3]/30'
                            : 'bg-[#ffb4ab]/15 text-[#ffb4ab] border border-[#ffb4ab]/30'
                        }`}
                      >
                        {isLong ? (
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        ) : (
                          <ArrowDownRight className="w-2.5 h-2.5" />
                        )}
                        {pos.side}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right font-mono-numbers text-[#dfe2ed]">
                      {pos.size.toLocaleString()}
                    </td>

                    <td className="py-3 px-3 text-right font-mono-numbers text-[#b9cacb]">
                      ${pos.entryPrice < 5 ? pos.entryPrice.toFixed(4) : pos.entryPrice.toLocaleString()}
                    </td>

                    <td className="py-3 px-3 text-right font-mono-numbers text-[#dfe2ed] font-semibold">
                      ${pos.currentPrice < 5 ? pos.currentPrice.toFixed(4) : pos.currentPrice.toLocaleString()}
                    </td>

                    <td className="py-3 px-3 text-right font-mono-numbers text-[#dfe2ed]">
                      ${pos.exposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>

                    <td className="py-3 px-3 text-right font-mono-numbers">
                      <div className={`font-semibold ${isProfit ? 'text-[#4edea3]' : 'text-[#ffb4ab]'}`}>
                        {isProfit ? '+' : ''}${pos.unrealizedPnL.toLocaleString()}
                      </div>
                      <div className={`text-[10px] ${isProfit ? 'text-[#4edea3]' : 'text-[#ffb4ab]'}`}>
                        {isProfit ? '+' : ''}{pos.unrealizedPnLPercent.toFixed(2)}%
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onClosePosition(pos.id)}
                        className="px-2.5 py-1 text-[10px] font-mono font-medium rounded border border-[#ffb4ab]/40 text-[#ffb4ab] hover:bg-[#ffb4ab]/10 transition-colors"
                      >
                        CLOSE
                      </button>
                    </td>
                  </tr>
                );
              })}
              {positions.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#849495] font-mono text-xs">
                    No active positions in the portfolio ledger.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid: Factor Risk Decomposition + Macro Stress Testing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Factor Risk Matrix (6 cols) */}
        <div className="lg:col-span-6 bg-[#181c23] border border-[#262a32] rounded p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[#262a32] pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00f2fe]" />
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00f2fe]">
                Barra Multi-Factor Risk Decomposition
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#849495]">Z-SCORE NORMALIZED</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {factorExposures.map((item) => {
              const isPositive = item.loading >= 0;
              const barWidth = Math.min(100, Math.abs(item.loading) * 100);

              return (
                <div key={item.factor} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#dfe2ed]">{item.factor}</span>
                    <span
                      className={`font-semibold font-mono-numbers ${
                        isPositive ? 'text-[#4edea3]' : 'text-[#ffb4ab]'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {item.loading.toFixed(2)} σ
                    </span>
                  </div>

                  {/* Horizontal zero-centered bar */}
                  <div className="grid grid-cols-2 gap-1 h-2 bg-[#0f131b] rounded-full overflow-hidden p-0.5 border border-[#262a32]">
                    {/* Negative side */}
                    <div className="flex justify-end">
                      {!isPositive && (
                        <div
                          className="h-full bg-[#ffb4ab] rounded-sm transition-all duration-300"
                          style={{ width: `${barWidth}%` }}
                        />
                      )}
                    </div>
                    {/* Positive side */}
                    <div className="flex justify-start">
                      {isPositive && (
                        <div
                          className="h-full bg-[#00f2fe] rounded-sm transition-all duration-300"
                          style={{ width: `${barWidth}%` }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Macro Stress Testing Simulator (6 cols) */}
        <div className="lg:col-span-6 bg-[#181c23] border border-[#262a32] rounded p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[#262a32] pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#ffb4ab]" />
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00f2fe]">
                Macro Stress Testing Engine
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#849495]">INSTANT SIMULATION</span>
          </div>

          {/* Scenario Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STRESS_SCENARIOS.map((scen) => {
              const active = selectedScenario.id === scen.id;
              return (
                <button
                  key={scen.id}
                  onClick={() => setSelectedScenario(scen)}
                  className={`p-2.5 text-left rounded border transition-all ${
                    active
                      ? 'bg-[#00f2fe]/10 border-[#00f2fe]/60'
                      : 'bg-[#0f131b] border-[#262a32] hover:border-[#3a494b]'
                  }`}
                >
                  <div className="text-xs font-bold font-mono text-[#dfe2ed] truncate">
                    {scen.name}
                  </div>
                  <div
                    className={`text-xs font-mono-numbers font-semibold mt-1 ${
                      scen.impactPnL >= 0 ? 'text-[#4edea3]' : 'text-[#ffb4ab]'
                    }`}
                  >
                    {scen.impactPnL >= 0 ? '+' : ''}${Math.abs(scen.impactPnL).toLocaleString()} ({scen.impactPercent}%)
                  </div>
                </button>
              );
            })}
          </div>

          {/* Shock Details Card */}
          <div className="bg-[#0f131b] border border-[#262a32] rounded p-3 space-y-2">
            <div className="text-xs font-bold font-mono text-[#e0fdff]">
              Scenario Shock Assumptions: {selectedScenario.name}
            </div>
            <p className="text-[11px] text-[#b9cacb] font-sans">
              {selectedScenario.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#262a32] text-center font-mono">
              <div className="bg-[#181c23] p-1.5 rounded">
                <div className="text-[9px] text-[#849495]">EQUITIES</div>
                <div className="text-xs font-semibold text-[#ffb4ab]">
                  {selectedScenario.shockDetails.equitiesShock}
                </div>
              </div>
              <div className="bg-[#181c23] p-1.5 rounded">
                <div className="text-[9px] text-[#849495]">RATES</div>
                <div className="text-xs font-semibold text-[#dfe2ed]">
                  {selectedScenario.shockDetails.ratesShock}
                </div>
              </div>
              <div className="bg-[#181c23] p-1.5 rounded">
                <div className="text-[9px] text-[#849495]">VOL (VIX)</div>
                <div className="text-xs font-semibold text-[#00f2fe]">
                  {selectedScenario.shockDetails.volShock}
                </div>
              </div>
              <div className="bg-[#181c23] p-1.5 rounded">
                <div className="text-[9px] text-[#849495]">FX</div>
                <div className="text-xs font-semibold text-[#dfe2ed]">
                  {selectedScenario.shockDetails.fxShock}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

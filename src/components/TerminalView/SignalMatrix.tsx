import React from 'react';
import { QuantitativeSignal } from '../../types/terminal';
import { Zap, Target, ShieldAlert, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SignalMatrixProps {
  signals: QuantitativeSignal[];
  onExecuteSignal: (signal: QuantitativeSignal) => void;
}

export const SignalMatrix: React.FC<SignalMatrixProps> = ({ signals, onExecuteSignal }) => {
  return (
    <div className="bg-[#181c23] border border-[#262a32] rounded flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-[#262a32] flex items-center justify-between bg-[#181c23]">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#00f2fe]" />
          <span className="text-xs font-mono font-semibold tracking-wider text-[#00f2fe] uppercase">
            Quant Alpha Signals
          </span>
          <span className="text-[11px] font-mono text-[#849495]">({signals.length} Active)</span>
        </div>
        <span className="text-[10px] font-mono text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded border border-[#4edea3]/30">
          PROPRIETARY ENSEMBLE
        </span>
      </div>

      {/* Signals Grid / Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#262a32] bg-[#0f131b]/60 sticky top-0 z-10 text-[10px] font-mono text-[#849495]">
              <th className="py-2 px-3 font-medium">STRATEGY / TICKER</th>
              <th className="py-2 px-2.5 font-medium">DIR</th>
              <th className="py-2 px-3 font-medium text-right">CONVICTION</th>
              <th className="py-2 px-3 font-medium text-right">EXP ALPHA</th>
              <th className="py-2 px-3 font-medium text-right">TARGET / SL</th>
              <th className="py-2 px-3 font-medium text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262a32]/60 font-mono text-xs">
            {signals.map((sig) => {
              const isLong = sig.direction === 'LONG';

              return (
                <tr key={sig.id} className="hover:bg-[#1c2027] transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#dfe2ed]">{sig.symbol}</span>
                      <span className="text-[11px] text-[#b9cacb] font-sans truncate max-w-[140px] hidden sm:inline">
                        {sig.strategyType}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#849495] mt-0.5">
                      {sig.modelName} · {sig.horizon}
                    </div>
                  </td>

                  <td className="py-2.5 px-2.5">
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
                      {sig.direction}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-mono-numbers">
                      <span className="font-semibold text-[#00f2fe]">{sig.conviction}%</span>
                      <div className="w-8 h-1 bg-[#0f131b] rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="h-full bg-[#00f2fe]"
                          style={{ width: `${sig.conviction}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-right font-mono-numbers">
                    <span className="font-semibold text-[#4edea3]">
                      +{sig.expectedAlphaBps} bps
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-right font-mono-numbers">
                    <div className="flex items-center justify-end gap-1 text-[11px] text-[#dfe2ed]">
                      <Target className="w-2.5 h-2.5 text-[#4edea3]" />
                      <span>${sig.targetPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-[#849495]">
                      <ShieldAlert className="w-2.5 h-2.5 text-[#ffb4ab]" />
                      <span>${sig.stopLossPrice.toLocaleString()}</span>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => onExecuteSignal(sig)}
                      className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40 hover:bg-[#00f2fe]/30 transition-all active:scale-95 whitespace-nowrap"
                    >
                      EXECUTE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { STRATEGY_PRESETS, runBacktestSimulation } from '../../data/mockMarketData';
import { StrategyPreset, BacktestResult } from '../../types/terminal';
import { Play, Sliders, TrendingUp, CheckCircle2, Award, Zap, BarChart3 } from 'lucide-react';

interface StrategyLabViewProps {
  onDeployStrategy: (preset: StrategyPreset) => void;
}

export const StrategyLabView: React.FC<StrategyLabViewProps> = ({ onDeployStrategy }) => {
  const [selectedPreset, setSelectedPreset] = useState<StrategyPreset>(STRATEGY_PRESETS[0]);
  const [lookbackDays, setLookbackDays] = useState(selectedPreset.lookbackDays);
  const [targetVolatility, setTargetVolatility] = useState(selectedPreset.targetVolatility);
  const [maxLeverage, setMaxLeverage] = useState(selectedPreset.maxLeverage);
  const [stopLossBps, setStopLossBps] = useState(selectedPreset.stopLossBps);
  const [rebalanceHours, setRebalanceHours] = useState(selectedPreset.rebalanceHours);

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simPhase, setSimPhase] = useState('');
  const [results, setResults] = useState<BacktestResult>(() => runBacktestSimulation(STRATEGY_PRESETS[0]));

  const handleSelectPreset = (preset: StrategyPreset) => {
    setSelectedPreset(preset);
    setLookbackDays(preset.lookbackDays);
    setTargetVolatility(preset.targetVolatility);
    setMaxLeverage(preset.maxLeverage);
    setStopLossBps(preset.stopLossBps);
    setRebalanceHours(preset.rebalanceHours);
  };

  const handleRunSimulation = () => {
    setIsRunning(true);
    setProgress(0);
    setSimPhase('Initializing Quantitative Backtesting Engine...');

    const phases = [
      { p: 25, label: 'Fetching High-Density Orderflow & Tick History...' },
      { p: 55, label: 'Calculating Factor Covariance & Microstructure Slippage...' },
      { p: 85, label: 'Optimizing Markowitz Frontiers & Transaction Costs...' },
      { p: 100, label: 'Finalizing Performance Attribution Metrics...' },
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < phases.length) {
        setProgress(phases[step].p);
        setSimPhase(phases[step].label);
        step++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        const currentConfig: StrategyPreset = {
          ...selectedPreset,
          lookbackDays,
          targetVolatility,
          maxLeverage,
          stopLossBps,
          rebalanceHours,
        };
        setResults(runBacktestSimulation(currentConfig));
      }
    }, 350);
  };

  // SVG dimensions for Equity Curve
  const chartWidth = 750;
  const chartHeight = 220;
  const padding = 35;

  const maxVal = Math.max(
    ...results.equityCurve.map((d) => Math.max(d.strategy, d.benchmark))
  );
  const minVal = Math.min(
    ...results.equityCurve.map((d) => Math.min(d.strategy, d.benchmark))
  );

  const getX = (idx: number) =>
    padding + (idx / (results.equityCurve.length - 1)) * (chartWidth - padding * 2);
  const getY = (val: number) =>
    chartHeight -
    padding -
    ((val - minVal) / (maxVal - minVal || 1)) * (chartHeight - padding * 2);

  const stratPath = results.equityCurve
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.strategy)}`)
    .join(' ');

  const benchPath = results.equityCurve
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.benchmark)}`)
    .join(' ');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Title & Description Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262a32] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-[#e0fdff] tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#00f2fe]" />
            Algorithmic Strategy Lab & Vector Backtester
          </h1>
          <p className="text-xs sm:text-sm text-[#b9cacb] mt-1 font-sans">
            Configure factor signals, calibrate volatility targets, and simulate slippage-adjusted multi-asset returns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="px-4 py-2 text-xs font-mono font-semibold text-[#00373a] bg-[#00f2fe] hover:bg-[#6ff6ff] disabled:opacity-50 rounded transition-all shadow-[0_0_12px_rgba(0,242,254,0.3)] flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'SIMULATING...' : 'RUN BACKTEST'}</span>
          </button>

          <button
            onClick={() => onDeployStrategy(selectedPreset)}
            className="px-4 py-2 text-xs font-mono font-medium rounded border border-[#00f2fe]/40 text-[#00f2fe] hover:bg-[#00f2fe]/10 transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>DEPLOY STRATEGY</span>
          </button>
        </div>
      </div>

      {/* Progress bar during simulation */}
      {isRunning && (
        <div className="p-3 bg-[#181c23] border border-[#00f2fe]/40 rounded space-y-2">
          <div className="flex justify-between text-xs font-mono text-[#00f2fe]">
            <span>{simPhase}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#0f131b] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00f2fe] to-[#4edea3] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Grid: Strategy Configuration + Metrics Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Preset Selector & Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Strategy Presets */}
          <div className="bg-[#181c23] border border-[#262a32] rounded p-4 space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00f2fe]">
              Model Strategy Presets
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {STRATEGY_PRESETS.map((preset) => {
                const active = selectedPreset.id === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-3 rounded border cursor-pointer transition-all ${
                      active
                        ? 'bg-[#00f2fe]/10 border-[#00f2fe]/60'
                        : 'bg-[#0f131b] border-[#262a32] hover:border-[#3a494b]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono text-[#dfe2ed]">
                        {preset.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#262a32] text-[#849495]">
                        {preset.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#b9cacb] font-sans mt-1">
                      {preset.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calibrated Parameter Controls */}
          <div className="bg-[#181c23] border border-[#262a32] rounded p-4 space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00f2fe]">
              Hyperparameter Tuning
            </h3>

            {/* Lookback Days */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#b9cacb]">Factor Lookback Window</span>
                <span className="text-[#00f2fe] font-semibold">{lookbackDays} Days</span>
              </div>
              <input
                type="range"
                min="7"
                max="180"
                step="1"
                value={lookbackDays}
                onChange={(e) => setLookbackDays(Number(e.target.value))}
                className="w-full accent-[#00f2fe] bg-[#0f131b] h-1.5 rounded cursor-pointer"
              />
            </div>

            {/* Target Volatility */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#b9cacb]">Annualized Target Volatility</span>
                <span className="text-[#00f2fe] font-semibold">{targetVolatility.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="0.5"
                value={targetVolatility}
                onChange={(e) => setTargetVolatility(Number(e.target.value))}
                className="w-full accent-[#00f2fe] bg-[#0f131b] h-1.5 rounded cursor-pointer"
              />
            </div>

            {/* Max Leverage */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#b9cacb]">Gross Leverage Ceiling</span>
                <span className="text-[#00f2fe] font-semibold">{maxLeverage.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={maxLeverage}
                onChange={(e) => setMaxLeverage(Number(e.target.value))}
                className="w-full accent-[#00f2fe] bg-[#0f131b] h-1.5 rounded cursor-pointer"
              />
            </div>

            {/* Stop Loss (bps) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#b9cacb]">Dynamic Stop Loss Cutoff</span>
                <span className="text-[#00f2fe] font-semibold">{stopLossBps} bps</span>
              </div>
              <input
                type="range"
                min="25"
                max="350"
                step="5"
                value={stopLossBps}
                onChange={(e) => setStopLossBps(Number(e.target.value))}
                className="w-full accent-[#00f2fe] bg-[#0f131b] h-1.5 rounded cursor-pointer"
              />
            </div>

            {/* Rebalance Frequency */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#b9cacb]">Rebalance Frequency</span>
                <span className="text-[#00f2fe] font-semibold">{rebalanceHours} Hours</span>
              </div>
              <input
                type="range"
                min="1"
                max="72"
                step="1"
                value={rebalanceHours}
                onChange={(e) => setRebalanceHours(Number(e.target.value))}
                className="w-full accent-[#00f2fe] bg-[#0f131b] h-1.5 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Quantitative Attribution & Scorecard (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#181c23] border border-[#262a32] rounded p-3">
              <div className="text-[10px] font-mono text-[#849495] uppercase">Cumulative Return</div>
              <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#4edea3] mt-1">
                +{results.cumulativeReturn}%
              </div>
              <div className="text-[10px] font-mono text-[#849495] mt-0.5">vs Benchmark +18.4%</div>
            </div>

            <div className="bg-[#181c23] border border-[#262a32] rounded p-3">
              <div className="text-[10px] font-mono text-[#849495] uppercase">Sharpe Ratio</div>
              <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#00f2fe] mt-1">
                {results.sharpeRatio}
              </div>
              <div className="text-[10px] font-mono text-[#849495] mt-0.5">Sortino: {results.sortinoRatio}</div>
            </div>

            <div className="bg-[#181c23] border border-[#262a32] rounded p-3">
              <div className="text-[10px] font-mono text-[#849495] uppercase">Max Drawdown</div>
              <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#ffb4ab] mt-1">
                {results.maxDrawdown}%
              </div>
              <div className="text-[10px] font-mono text-[#849495] mt-0.5">Calmar: {results.calmarRatio}</div>
            </div>

            <div className="bg-[#181c23] border border-[#262a32] rounded p-3">
              <div className="text-[10px] font-mono text-[#849495] uppercase">Win Rate</div>
              <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#dfe2ed] mt-1">
                {results.winRate}%
              </div>
              <div className="text-[10px] font-mono text-[#849495] mt-0.5">PF: {results.profitFactor}</div>
            </div>
          </div>

          {/* Equity Curve Chart */}
          <div className="bg-[#181c23] border border-[#262a32] rounded p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#00f2fe]" />
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00f2fe]">
                  Cumulative Equity Trajectory vs Benchmark
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 bg-[#00f2fe] inline-block" />
                  <span className="text-[#dfe2ed]">Quant Strategy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 bg-[#849495] inline-block" />
                  <span className="text-[#849495]">S&P 500 Index</span>
                </div>
              </div>
            </div>

            {/* SVG Curve */}
            <div className="relative bg-[#0a0e15] border border-[#262a32] rounded overflow-hidden">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-48 sm:h-56"
                preserveAspectRatio="none"
              >
                {/* Horizontal gridlines */}
                {[0.2, 0.4, 0.6, 0.8].map((pct) => {
                  const y = padding + pct * (chartHeight - padding * 2);
                  return (
                    <line
                      key={pct}
                      x1={padding}
                      y1={y}
                      x2={chartWidth - padding}
                      y2={y}
                      stroke="#262a32"
                      strokeDasharray="2,2"
                    />
                  );
                })}

                {/* Benchmark path */}
                <path
                  d={benchPath}
                  fill="none"
                  stroke="#849495"
                  strokeWidth="1.5"
                  strokeDasharray="4,3"
                />

                {/* Strategy path */}
                <path
                  d={stratPath}
                  fill="none"
                  stroke="#00f2fe"
                  strokeWidth="2.5"
                />

                {/* Data points */}
                {results.equityCurve.map((d, i) => (
                  <g key={i}>
                    <circle
                      cx={getX(i)}
                      cy={getY(d.strategy)}
                      r="3"
                      fill="#00f2fe"
                    />
                    <text
                      x={getX(i)}
                      y={chartHeight - 10}
                      textAnchor="middle"
                      fill="#849495"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                    >
                      {d.date.split(' ')[0]}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Monthly Returns Heatmap Matrix */}
          <div className="bg-[#181c23] border border-[#262a32] rounded p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00f2fe]">
                Monthly Returns Matrix (%)
              </h3>
              <span className="text-[10px] font-mono text-[#849495]">
                {results.totalTrades.toLocaleString()} Executed Trades
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse text-[10px] font-mono">
                <thead>
                  <tr className="border-b border-[#262a32] text-[#849495]">
                    <th className="py-1 px-1.5 text-left">YEAR</th>
                    {months.map((m) => (
                      <th key={m} className="py-1 px-1">{m}</th>
                    ))}
                    <th className="py-1 px-1.5 font-bold text-[#dfe2ed]">TOTAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262a32]/40">
                  {results.monthlyReturns.map((row) => {
                    const rowSum = row.months.reduce((acc, v) => acc + v, 0);

                    return (
                      <tr key={row.year}>
                        <td className="py-1.5 px-1.5 text-left font-bold text-[#dfe2ed]">
                          {row.year}
                        </td>
                        {row.months.map((val, mIdx) => {
                          const isPos = val >= 0;
                          return (
                            <td key={mIdx} className="py-1.5 px-0.5">
                              <span
                                className={`inline-block w-8 py-0.5 rounded font-mono-numbers ${
                                  isPos
                                    ? 'bg-[#4edea3]/20 text-[#4edea3]'
                                    : 'bg-[#ffb4ab]/20 text-[#ffb4ab]'
                                }`}
                              >
                                {isPos ? '+' : ''}
                                {val.toFixed(1)}
                              </span>
                            </td>
                          );
                        })}
                        {/* Pad missing months if any */}
                        {Array.from({ length: 12 - row.months.length }).map((_, padIdx) => (
                          <td key={`pad-${padIdx}`} className="py-1.5 px-0.5 text-[#3a494b]">
                            —
                          </td>
                        ))}
                        <td className="py-1.5 px-1.5 font-bold font-mono-numbers">
                          <span className={rowSum >= 0 ? 'text-[#4edea3]' : 'text-[#ffb4ab]'}>
                            {rowSum >= 0 ? '+' : ''}
                            {rowSum.toFixed(1)}%
                          </span>
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
    </div>
  );
};

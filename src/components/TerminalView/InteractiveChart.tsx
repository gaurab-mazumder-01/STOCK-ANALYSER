import React, { useState, useRef, useMemo } from 'react';
import { Asset, Candle, PredictivePoint } from '../../types/terminal';
import { Sparkles, BarChart2, Eye, EyeOff, Layers } from 'lucide-react';

interface InteractiveChartProps {
  asset: Asset;
  candles: Candle[];
  predictions: PredictivePoint[];
  onOpenOrderModal: () => void;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  asset,
  candles,
  predictions,
  onOpenOrderModal,
}) => {
  const [timeframe, setTimeframe] = useState<'1M' | '5M' | '15M' | '1H' | '1D'>('5M');
  const [showProjection, setShowProjection] = useState(true);
  const [showEMA, setShowEMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isHoveringPrediction, setIsHoveringPrediction] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Compute scale boundaries
  const { minPrice, maxPrice, maxVolume } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    let maxVol = 0;

    candles.forEach((c) => {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
      if (c.volume > maxVol) maxVol = c.volume;
    });

    if (showProjection && predictions.length > 0) {
      predictions.forEach((p) => {
        if (p.lower95 < min) min = p.lower95;
        if (p.upper95 > max) max = p.upper95;
      });
    }

    const padding = (max - min) * 0.08 || 1;
    return {
      minPrice: min - padding,
      maxPrice: max + padding,
      maxVolume: maxVol * 3.5, // leaves 70% height for price
    };
  }, [candles, predictions, showProjection]);

  // Chart dimensions in SVG viewBox coordinate space
  const chartWidth = 900;
  const chartHeight = 440;
  const priceAreaHeight = 360;
  const volumeAreaHeight = 80;

  const totalPoints = candles.length + (showProjection ? predictions.length : 0);
  const barWidth = Math.max(3, (chartWidth - 60) / totalPoints);
  const candleGap = barWidth * 0.35;

  const getY = (val: number) => {
    if (maxPrice === minPrice) return priceAreaHeight / 2;
    return priceAreaHeight - ((val - minPrice) / (maxPrice - minPrice)) * priceAreaHeight;
  };

  const getVolY = (vol: number) => {
    if (maxVolume === 0) return chartHeight;
    const h = (vol / maxVolume) * volumeAreaHeight;
    return chartHeight - h;
  };

  // EMA Path calculation
  const ema20Path = useMemo(() => {
    if (!showEMA || candles.length === 0) return '';
    return candles
      .map((c, i) => {
        const x = i * barWidth + barWidth / 2;
        const y = getY(c.ema20);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, [candles, showEMA, barWidth, minPrice, maxPrice]);

  const ema50Path = useMemo(() => {
    if (!showEMA || candles.length === 0) return '';
    return candles
      .map((c, i) => {
        const x = i * barWidth + barWidth / 2;
        const y = getY(c.ema50);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, [candles, showEMA, barWidth, minPrice, maxPrice]);

  // Predictive projection paths
  const { pathUpper95, pathLower95, pathUpper70, pathLower70, pathMedian } = useMemo(() => {
    if (!showProjection || predictions.length === 0 || candles.length === 0) {
      return { pathUpper95: '', pathLower95: '', pathUpper70: '', pathLower70: '', pathMedian: '' };
    }

    const lastCandle = candles[candles.length - 1];
    const startX = (candles.length - 1) * barWidth + barWidth / 2;
    const startY = getY(lastCandle.close);

    let upper95Str = `M ${startX} ${startY}`;
    let lower95Str = `M ${startX} ${startY}`;
    let upper70Str = `M ${startX} ${startY}`;
    let lower70Str = `M ${startX} ${startY}`;
    let medianStr = `M ${startX} ${startY}`;

    // For polygon fill: upper then reverse lower
    const upperPoints95: { x: number; y: number }[] = [{ x: startX, y: startY }];
    const lowerPoints95: { x: number; y: number }[] = [{ x: startX, y: startY }];
    const upperPoints70: { x: number; y: number }[] = [{ x: startX, y: startY }];
    const lowerPoints70: { x: number; y: number }[] = [{ x: startX, y: startY }];

    predictions.forEach((p, idx) => {
      const x = (candles.length + idx) * barWidth + barWidth / 2;
      const yMed = getY(p.projected);
      const yUp95 = getY(p.upper95);
      const yLow95 = getY(p.lower95);
      const yUp70 = getY(p.upper70);
      const yLow70 = getY(p.lower70);

      medianStr += ` L ${x} ${yMed}`;
      upperPoints95.push({ x, y: yUp95 });
      lowerPoints95.push({ x, y: yLow95 });
      upperPoints70.push({ x, y: yUp70 });
      lowerPoints70.push({ x, y: yLow70 });
    });

    const polygon95 =
      `M ${upperPoints95.map((pt) => `${pt.x},${pt.y}`).join(' L ')} ` +
      `L ${lowerPoints95.reverse().map((pt) => `${pt.x},${pt.y}`).join(' L ')} Z`;

    const polygon70 =
      `M ${upperPoints70.map((pt) => `${pt.x},${pt.y}`).join(' L ')} ` +
      `L ${lowerPoints70.reverse().map((pt) => `${pt.x},${pt.y}`).join(' L ')} Z`;

    return {
      pathUpper95: polygon95,
      pathLower95: lower95Str,
      pathUpper70: polygon70,
      pathLower70: lower70Str,
      pathMedian: medianStr,
    };
  }, [candles, predictions, showProjection, barWidth, minPrice, maxPrice]);

  // Active hover info
  const activeCandle = hoverIndex !== null && hoverIndex < candles.length ? candles[hoverIndex] : null;
  const activePred =
    hoverIndex !== null && hoverIndex >= candles.length && hoverIndex < totalPoints
      ? predictions[hoverIndex - candles.length]
      : null;

  const currentDisplay = activeCandle || candles[candles.length - 1];

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgX = (mouseX / rect.width) * chartWidth;
    const index = Math.floor(svgX / barWidth);

    if (index >= 0 && index < totalPoints) {
      setHoverIndex(index);
      setIsHoveringPrediction(index >= candles.length);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    setIsHoveringPrediction(false);
  };

  const lastPrediction = predictions[predictions.length - 1];

  return (
    <div className="bg-[#181c23] border border-[#262a32] rounded flex flex-col h-full overflow-hidden">
      {/* Top Chart Header & Controls */}
      <div className="p-3 border-b border-[#262a32] flex flex-wrap items-center justify-between gap-2 bg-[#181c23]">
        {/* Asset info */}
        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-2">
            <h2 className="text-base sm:text-lg font-bold font-display text-[#e0fdff] tracking-tight">
              {asset.symbol}
            </h2>
            <span className="text-xs text-[#849495] font-normal truncate max-w-[120px] sm:max-w-none">
              {asset.name}
            </span>
          </div>

          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-sm sm:text-base font-semibold text-[#dfe2ed] font-mono-numbers">
              ${asset.price < 5 ? asset.price.toFixed(4) : asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span
              className={`text-xs font-mono-numbers font-medium ${
                asset.changePercent24h >= 0 ? 'text-[#4edea3]' : 'text-[#ffb4ab]'
              }`}
            >
              {asset.changePercent24h >= 0 ? '+' : ''}
              {asset.changePercent24h.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Timeframe & Overlays */}
        <div className="flex items-center gap-2">
          {/* Timeframes */}
          <div className="flex items-center bg-[#0f131b] border border-[#3a494b] rounded p-0.5">
            {(['1M', '5M', '15M', '1H', '1D'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors ${
                  timeframe === tf
                    ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                    : 'text-[#849495] hover:text-[#dfe2ed]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Toggle Projection */}
          <button
            onClick={() => setShowProjection(!showProjection)}
            className={`px-2.5 py-1 text-xs font-mono rounded border flex items-center gap-1.5 transition-all ${
              showProjection
                ? 'border-[#00f2fe]/50 bg-[#00f2fe]/10 text-[#00f2fe]'
                : 'border-[#3a494b] text-[#849495] hover:text-[#dfe2ed]'
            }`}
            title="Toggle AI Predictive Confidence Interval Cone"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">AI CONE</span>
          </button>

          {/* Toggle EMAs */}
          <button
            onClick={() => setShowEMA(!showEMA)}
            className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
              showEMA
                ? 'border-[#00dce6]/40 text-[#00dce6] bg-[#00dce6]/10'
                : 'border-[#3a494b] text-[#849495]'
            }`}
            title="Toggle EMA 20/50"
          >
            EMA
          </button>

          {/* Quick Trade */}
          <button
            onClick={onOpenOrderModal}
            className="px-2.5 py-1 text-xs font-mono font-medium rounded bg-[#00f2fe]/20 border border-[#00f2fe]/40 text-[#00f2fe] hover:bg-[#00f2fe]/30 transition-all ml-1"
          >
            BUY/SELL
          </button>
        </div>
      </div>

      {/* Metrics Banner Bar (OHLCV & AI Telemetry) */}
      <div className="px-3 py-1.5 bg-[#0f131b]/60 border-b border-[#262a32] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#849495] gap-2">
        {activePred ? (
          <div className="flex items-center gap-3 text-[#00f2fe]">
            <span className="font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> PREDICTIVE HORIZON: {activePred.timeLabel}
            </span>
            <span>
              Target: <strong className="text-[#e0fdff]">${activePred.projected.toFixed(2)}</strong>
            </span>
            <span>
              70% CI: [{activePred.lower70.toFixed(2)} — {activePred.upper70.toFixed(2)}]
            </span>
            <span>
              95% CI: [{activePred.lower95.toFixed(2)} — {activePred.upper95.toFixed(2)}]
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span>
              O: <strong className="text-[#dfe2ed]">{currentDisplay?.open.toFixed(2)}</strong>
            </span>
            <span>
              H: <strong className="text-[#4edea3]">{currentDisplay?.high.toFixed(2)}</strong>
            </span>
            <span>
              L: <strong className="text-[#ffb4ab]">{currentDisplay?.low.toFixed(2)}</strong>
            </span>
            <span>
              C: <strong className="text-[#dfe2ed]">{currentDisplay?.close.toFixed(2)}</strong>
            </span>
            {currentDisplay && (
              <span>
                Vol: <strong className="text-[#b9cacb]">{currentDisplay.volume.toLocaleString()}</strong>
              </span>
            )}
            {showEMA && currentDisplay && (
              <>
                <span className="text-[#00dce6]">EMA20: {currentDisplay.ema20.toFixed(2)}</span>
                <span className="text-[#e0fdff]/70">EMA50: {currentDisplay.ema50.toFixed(2)}</span>
              </>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          {showProjection && lastPrediction && (
            <div className="flex items-center gap-1.5 text-[#00f2fe]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse" />
              <span>
                Model 24h Target: <strong>${lastPrediction.projected.toFixed(2)}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main SVG Chart Canvas */}
      <div ref={containerRef} className="flex-1 relative bg-[#0a0e15] select-none min-h-[300px]">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          className="w-full h-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Subtle Grid Lines */}
          {[0.2, 0.4, 0.6, 0.8].map((pct) => {
            const y = priceAreaHeight * pct;
            const priceVal = maxPrice - (pct * (maxPrice - minPrice));
            return (
              <g key={pct}>
                <line
                  x1="0"
                  y1={y}
                  x2={chartWidth - 50}
                  y2={y}
                  stroke="#262a32"
                  strokeDasharray="2,3"
                  strokeWidth="0.8"
                />
                <text
                  x={chartWidth - 46}
                  y={y + 3}
                  fill="#849495"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                >
                  {priceVal < 5 ? priceVal.toFixed(4) : priceVal.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Volume baseline */}
          <line
            x1="0"
            y1={chartHeight - volumeAreaHeight}
            x2={chartWidth}
            y2={chartHeight - volumeAreaHeight}
            stroke="#262a32"
            strokeWidth="0.8"
          />

          {/* Volume Bars */}
          {showVolume &&
            candles.map((c, i) => {
              const x = i * barWidth + candleGap / 2;
              const y = getVolY(c.volume);
              const h = chartHeight - y;
              const isBull = c.close >= c.open;

              return (
                <rect
                  key={`vol-${i}`}
                  x={x}
                  y={y}
                  width={Math.max(1, barWidth - candleGap)}
                  height={Math.max(1, h)}
                  fill={isBull ? '#4edea3' : '#ffb4ab'}
                  opacity={0.3}
                />
              );
            })}

          {/* Candlesticks */}
          {candles.map((c, i) => {
            const x = i * barWidth + barWidth / 2;
            const yHigh = getY(c.high);
            const yLow = getY(c.low);
            const yOpen = getY(c.open);
            const yClose = getY(c.close);

            const isBull = c.close >= c.open;
            const bodyY = Math.min(yOpen, yClose);
            const bodyHeight = Math.max(1.5, Math.abs(yClose - yOpen));
            const w = Math.max(1.5, barWidth - candleGap);
            const color = isBull ? '#4edea3' : '#ffb4ab';

            return (
              <g key={`candle-${i}`}>
                {/* Wick */}
                <line
                  x1={x}
                  y1={yHigh}
                  x2={x}
                  y2={yLow}
                  stroke={color}
                  strokeWidth="1"
                />
                {/* Body */}
                <rect
                  x={x - w / 2}
                  y={bodyY}
                  width={w}
                  height={bodyHeight}
                  fill={color}
                  rx="0.5"
                />
              </g>
            );
          })}

          {/* EMAs */}
          {showEMA && (
            <>
              <path d={ema20Path} fill="none" stroke="#00dce6" strokeWidth="1.2" opacity="0.85" />
              <path d={ema50Path} fill="none" stroke="#e0fdff" strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />
            </>
          )}

          {/* AI Predictive Projection Cone */}
          {showProjection && (
            <g className="transition-opacity duration-300">
              {/* Vertical divider indicating projection boundary */}
              {candles.length > 0 && (
                <g>
                  <line
                    x1={(candles.length - 1) * barWidth + barWidth / 2}
                    y1="0"
                    x2={(candles.length - 1) * barWidth + barWidth / 2}
                    y2={priceAreaHeight}
                    stroke="#00f2fe"
                    strokeDasharray="3,3"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  <text
                    x={(candles.length - 1) * barWidth + barWidth / 2 + 4}
                    y="18"
                    fill="#00f2fe"
                    fontSize="9"
                    fontFamily="JetBrains Mono"
                    fontWeight="600"
                  >
                    AI FORECAST ➔
                  </text>
                </g>
              )}

              {/* 95% Bayesian Confidence Cone (outer) */}
              <path
                d={pathUpper95}
                fill="#00f2fe"
                fillOpacity="0.07"
                stroke="#00f2fe"
                strokeWidth="0.8"
                strokeDasharray="2,2"
                strokeOpacity="0.35"
              />

              {/* 70% Bayesian Confidence Cone (inner) */}
              <path
                d={pathUpper70}
                fill="#00f2fe"
                fillOpacity="0.14"
                stroke="#00f2fe"
                strokeWidth="1"
                strokeDasharray="4,2"
                strokeOpacity="0.6"
              />

              {/* Median Projection Trajectory */}
              <path
                d={pathMedian}
                fill="none"
                stroke="#00f2fe"
                strokeWidth="1.8"
                strokeDasharray="5,2"
              />

              {/* Terminal target nodes */}
              {lastPrediction && (
                <g>
                  <circle
                    cx={(totalPoints - 1) * barWidth + barWidth / 2}
                    cy={getY(lastPrediction.projected)}
                    r="3.5"
                    fill="#00f2fe"
                    className="shadow-[0_0_10px_#00f2fe]"
                  />
                  <circle
                    cx={(totalPoints - 1) * barWidth + barWidth / 2}
                    cy={getY(lastPrediction.projected)}
                    r="6"
                    fill="none"
                    stroke="#00f2fe"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                </g>
              )}
            </g>
          )}

          {/* Interactive Crosshair */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={hoverIndex * barWidth + barWidth / 2}
                y1="0"
                x2={hoverIndex * barWidth + barWidth / 2}
                y2={chartHeight}
                stroke="#dfe2ed"
                strokeWidth="0.8"
                strokeDasharray="3,3"
                opacity="0.7"
              />
            </g>
          )}
        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-2 left-3 flex items-center gap-3 text-[10px] font-mono text-[#849495] bg-[#0f131b]/80 px-2 py-1 rounded border border-[#262a32] backdrop-blur-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#4edea3] inline-block" />
            <span>Bull</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#ffb4ab] inline-block" />
            <span>Bear</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#00dce6] inline-block" />
            <span>EMA20</span>
          </div>
          {showProjection && (
            <div className="flex items-center gap-1.5 text-[#00f2fe]">
              <span className="w-2.5 h-0.5 bg-[#00f2fe] inline-block" />
              <span>Model Proj (70/95% CI)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

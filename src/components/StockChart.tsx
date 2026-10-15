import React, { useState, useMemo, useRef, useEffect } from 'react';
import { StockData, ChartCandle, generateRealisticStockChart } from '../data/stocksData';
import { TrendingUp, TrendingDown, BarChart2, LineChart, Layers, Eye } from 'lucide-react';

interface StockChartProps {
  stock: StockData;
}

export const StockChart: React.FC<StockChartProps> = ({ stock }) => {
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1D');
  const [chartType, setChartType] = useState<'CANDLE' | 'LINE'>('CANDLE');
  const [showMA, setShowMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Maintain candle series with persistent historical data and live ticking on latest candle
  const [candles, setCandles] = useState<ChartCandle[]>(() =>
    generateRealisticStockChart(stock, timeRange)
  );

  // Re-generate base candles when symbol or timeframe changes
  useEffect(() => {
    setCandles(generateRealisticStockChart(stock, timeRange));
  }, [stock.symbol, timeRange]);

  // Live real-time tick on the active candle
  useEffect(() => {
    setCandles((prev) => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      const last = { ...updated[updated.length - 1] };
      last.close = stock.price;
      last.high = Math.max(last.high, stock.price);
      last.low = Math.min(last.low, stock.price);
      last.volume += Math.floor(Math.random() * 1200 + 300);
      updated[updated.length - 1] = last;
      return updated;
    });
  }, [stock.price]);

  // Compute price and volume boundaries
  const { minPrice, maxPrice, maxVolume } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    let maxVol = 0;

    candles.forEach((c) => {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
      if (c.volume > maxVol) maxVol = c.volume;
    });

    // Also include previous close in 1D view so reference line is inside chart
    if (timeRange === '1D') {
      if (stock.previousClose < min) min = stock.previousClose;
      if (stock.previousClose > max) max = stock.previousClose;
    }

    const padding = (max - min) * 0.08 || 1;
    return {
      minPrice: Number((min - padding).toFixed(2)),
      maxPrice: Number((max + padding).toFixed(2)),
      maxVolume: maxVol * 1.25,
    };
  }, [candles, timeRange, stock.previousClose]);

  // SVG coordinate dimensions
  const svgWidth = 850;
  const svgHeight = 360;
  const priceHeight = showVolume ? 260 : 320;
  const volumeHeight = 70;
  const marginX = 15;
  const rightAxisWidth = 72;
  const plotWidth = svgWidth - rightAxisWidth - marginX;

  const curr = stock.currency || '₹';

  const barWidth = Math.max(3, plotWidth / candles.length);
  const candleBodyWidth = Math.max(3.5, Math.min(16, barWidth * 0.76));

  const getY = (val: number) => {
    if (maxPrice === minPrice) return priceHeight / 2;
    return priceHeight - ((val - minPrice) / (maxPrice - minPrice)) * (priceHeight - 20) - 10;
  };

  const getVolY = (vol: number) => {
    if (maxVolume === 0) return svgHeight;
    const h = (vol / maxVolume) * volumeHeight;
    return svgHeight - h - 5;
  };

  const getX = (index: number) => {
    return marginX + index * barWidth + barWidth / 2;
  };

  // Paths for Line / Area
  const linePath = useMemo(() => {
    return candles
      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(c.close)}`)
      .join(' ');
  }, [candles, barWidth, minPrice, maxPrice, priceHeight]);

  const areaPath = useMemo(() => {
    if (candles.length === 0) return '';
    const firstX = getX(0);
    const lastX = getX(candles.length - 1);
    const bottomY = priceHeight;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [linePath, candles, priceHeight]);

  // Moving Average Paths
  const ma20Path = useMemo(() => {
    if (!showMA) return '';
    const pts = candles
      .map((c, i) => (c.ma20 !== undefined ? { x: getX(i), y: getY(c.ma20) } : null))
      .filter((p): p is { x: number; y: number } => p !== null);
    if (pts.length < 2) return '';
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }, [candles, showMA, barWidth, minPrice, maxPrice, priceHeight]);

  const ma50Path = useMemo(() => {
    if (!showMA) return '';
    const pts = candles
      .map((c, i) => (c.ma50 !== undefined ? { x: getX(i), y: getY(c.ma50) } : null))
      .filter((p): p is { x: number; y: number } => p !== null);
    if (pts.length < 2) return '';
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }, [candles, showMA, barWidth, minPrice, maxPrice, priceHeight]);

  // Active hover candle
  const activeCandle = hoverIndex !== null && hoverIndex < candles.length ? candles[hoverIndex] : candles[candles.length - 1];
  const isUp = (activeCandle?.close || stock.price) >= stock.previousClose;
  const activeDiff = Number(((activeCandle?.close || stock.price) - stock.previousClose).toFixed(2));
  const activeDiffPercent = Number(((activeDiff / stock.previousClose) * 100).toFixed(2));

  // Color scheme
  const themeColor = isUp ? '#4edea3' : '#ffb4ab';

  // Handle mouse crosshair
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgX = (mouseX / rect.width) * svgWidth;
    const index = Math.floor((svgX - marginX) / barWidth);

    if (index >= 0 && index < candles.length) {
      setHoverIndex(index);
    }
  };

  const prevCloseY = getY(stock.previousClose);

  return (
    <div className="bg-[#181c23] border border-[#262a32] rounded flex flex-col overflow-hidden">
      {/* 1. Header Toolbar & Real-Time Stats HUD */}
      <div className="p-4 border-b border-[#262a32] flex flex-wrap items-center justify-between gap-3 bg-[#181c23]">
        {/* Live HUD Readout */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono font-mono-numbers text-[#dfe2ed]">
              {curr}{(activeCandle ? activeCandle.close : stock.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span
              className={`text-xs font-mono font-semibold flex items-center gap-0.5 ${
                activeDiff >= 0 ? 'text-[#4edea3]' : 'text-[#ffb4ab]'
              }`}
            >
              {activeDiff >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>
                {activeDiff >= 0 ? '+' : ''}{curr}{Math.abs(activeDiff).toFixed(2)} ({activeDiff >= 0 ? '+' : ''}
                {activeDiffPercent.toFixed(2)}%)
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#849495]">
              {activeCandle ? activeCandle.dateLabel : 'Market Live'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded border border-[#4edea3]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping" />
              LIVE 1s TICK
            </span>
          </div>
        </div>

        {/* Chart Style & Indicator Toggles */}
        <div className="flex items-center gap-2">
          {/* Timeframe Buttons */}
          <div className="flex items-center bg-[#0f131b] border border-[#3a494b] rounded p-0.5">
            {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setTimeRange(r);
                  setHoverIndex(null);
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  timeRange === r
                    ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                    : 'text-[#849495] hover:text-[#dfe2ed]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Candle vs Line Buttons */}
          <div className="flex items-center bg-[#0f131b] border border-[#3a494b] rounded p-0.5">
            <button
              onClick={() => setChartType('CANDLE')}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded flex items-center gap-1.5 transition-colors ${
                chartType === 'CANDLE'
                  ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold border border-[#00f2fe]/40'
                  : 'text-[#849495] hover:text-[#dfe2ed]'
              }`}
              title="Candlestick Chart"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Candles</span>
            </button>
            <button
              onClick={() => setChartType('LINE')}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded flex items-center gap-1.5 transition-colors ${
                chartType === 'LINE'
                  ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold border border-[#00f2fe]/40'
                  : 'text-[#849495] hover:text-[#dfe2ed]'
              }`}
              title="Line Chart"
            >
              <LineChart className="w-3.5 h-3.5" />
              <span>Line</span>
            </button>
          </div>

          {/* Indicators dropdown / toggle */}
          <button
            onClick={() => setShowMA(!showMA)}
            className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
              showMA
                ? 'border-[#00dce6]/50 bg-[#00dce6]/10 text-[#00dce6]'
                : 'border-[#3a494b] text-[#849495]'
            }`}
            title="Toggle Moving Averages (MA20 & MA50)"
          >
            MA 20/50
          </button>

          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
              showVolume
                ? 'border-[#00f2fe]/40 bg-[#00f2fe]/10 text-[#00f2fe]'
                : 'border-[#3a494b] text-[#849495]'
            }`}
            title="Toggle Volume Bars"
          >
            VOL
          </button>
        </div>
      </div>

      {/* 2. OHLCV Detail Sub-Bar (Active hover or current candle stats) */}
      <div className="px-4 py-1.5 bg-[#0f131b]/70 border-b border-[#262a32] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#849495] gap-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-[10px] font-bold text-[#00f2fe] bg-[#00f2fe]/10 px-1.5 py-0.5 rounded border border-[#00f2fe]/30">
            {chartType === 'CANDLE' ? 'CANDLESTICKS (OHLC)' : 'LINE AREA'}
          </span>
          <span>
            Open: <strong className="text-[#dfe2ed]">{curr}{activeCandle ? (activeCandle.open < 1000 ? activeCandle.open.toFixed(2) : activeCandle.open.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })) : '0.00'}</strong>
          </span>
          <span>
            High: <strong className="text-[#4edea3]">{curr}{activeCandle ? (activeCandle.high < 1000 ? activeCandle.high.toFixed(2) : activeCandle.high.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })) : '0.00'}</strong>
          </span>
          <span>
            Low: <strong className="text-[#ffb4ab]">{curr}{activeCandle ? (activeCandle.low < 1000 ? activeCandle.low.toFixed(2) : activeCandle.low.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })) : '0.00'}</strong>
          </span>
          <span>
            Close: <strong className="text-[#dfe2ed]">{curr}{activeCandle ? (activeCandle.close < 1000 ? activeCandle.close.toFixed(2) : activeCandle.close.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })) : '0.00'}</strong>
          </span>
          {activeCandle && (
            <span>
              Range: <strong className="text-[#e0fdff]">{curr}{(activeCandle.high - activeCandle.low).toFixed(2)}</strong>
            </span>
          )}
          {showVolume && activeCandle && (
            <span>
              Vol: <strong className="text-[#b9cacb]">{(activeCandle.volume / 1000000).toFixed(2)}M</strong>
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3">
          {timeRange === '1D' && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 border-t border-dashed border-[#849495] inline-block" />
              <span>Prev Close: {curr}{stock.previousClose < 1000 ? stock.previousClose.toFixed(2) : stock.previousClose.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
            </div>
          )}
          {showMA && (
            <>
              <div className="flex items-center gap-1 text-[#00dce6]">
                <span className="w-2 h-0.5 bg-[#00dce6] inline-block" />
                <span>MA20</span>
              </div>
              <div className="flex items-center gap-1 text-[#ffb2b7]">
                <span className="w-2 h-0.5 bg-[#ffb2b7] inline-block" />
                <span>MA50</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3. SVG High-Precision Chart Viewport */}
      <div ref={containerRef} className="relative bg-[#0a0e15] select-none h-72 sm:h-96">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          className="w-full h-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="realGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={themeColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={themeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Price Grid Lines & Labels */}
          {[0.2, 0.4, 0.6, 0.8].map((pct) => {
            const y = (priceHeight - 20) * pct + 10;
            const priceVal = maxPrice - pct * (maxPrice - minPrice);
            return (
              <g key={pct}>
                <line
                  x1={marginX}
                  y1={y}
                  x2={plotWidth}
                  y2={y}
                  stroke="#262a32"
                  strokeDasharray="2,3"
                  strokeWidth="0.8"
                />
                <text
                  x={plotWidth + 8}
                  y={y + 3.5}
                  fill="#849495"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                >
                  {curr}{priceVal < 1000 ? priceVal.toFixed(2) : priceVal.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </text>
              </g>
            );
          })}

          {/* Previous Close Reference Line (Crucial for 1D chart accuracy) */}
          {timeRange === '1D' && prevCloseY > 0 && prevCloseY < priceHeight && (
            <g>
              <line
                x1={marginX}
                y1={prevCloseY}
                x2={plotWidth}
                y2={prevCloseY}
                stroke="#849495"
                strokeDasharray="3,3"
                strokeWidth="1"
                opacity="0.8"
              />
              <rect
                x={plotWidth + 4}
                y={prevCloseY - 7}
                width={66}
                height={14}
                fill="#262a32"
                rx="2"
              />
              <text
                x={plotWidth + 7}
                y={prevCloseY + 3.5}
                fill="#dfe2ed"
                fontSize="8.5"
                fontFamily="JetBrains Mono"
              >
                {curr}{stock.previousClose < 1000 ? stock.previousClose.toFixed(2) : stock.previousClose.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              </text>
            </g>
          )}

          {/* Volume Baseline & Volume Bars */}
          {showVolume && (
            <g>
              <line
                x1={marginX}
                y1={priceHeight}
                x2={plotWidth}
                y2={priceHeight}
                stroke="#262a32"
                strokeWidth="0.8"
              />
              {candles.map((c, i) => {
                const x = marginX + i * barWidth + (barWidth - candleBodyWidth) / 2;
                const y = getVolY(c.volume);
                const h = svgHeight - y - 5;
                const isBull = c.close >= c.open;

                return (
                  <rect
                    key={`vol-${i}`}
                    x={x}
                    y={y}
                    width={candleBodyWidth}
                    height={Math.max(1, h)}
                    fill={isBull ? '#4edea3' : '#ffb4ab'}
                    opacity={0.35}
                  />
                );
              })}
            </g>
          )}

          {/* Line / Area Chart View */}
          {chartType === 'LINE' && (
            <g>
              <path d={areaPath} fill="url(#realGradient)" />
              <path d={linePath} fill="none" stroke={themeColor} strokeWidth="2.2" />

              {/* Pulsing live dot on the latest point */}
              {candles.length > 0 && (
                <g>
                  <circle
                    cx={getX(candles.length - 1)}
                    cy={getY(candles[candles.length - 1].close)}
                    r="4"
                    fill={themeColor}
                  />
                  <circle
                    cx={getX(candles.length - 1)}
                    cy={getY(candles[candles.length - 1].close)}
                    r="8"
                    fill="none"
                    stroke={themeColor}
                    strokeWidth="1.5"
                    className="animate-ping"
                    opacity="0.75"
                  />
                </g>
              )}
            </g>
          )}

          {/* Candlestick Chart View */}
          {chartType === 'CANDLE' && (
            <g>
              {candles.map((c, i) => {
                const x = getX(i);
                const yOpen = getY(c.open);
                const yClose = getY(c.close);
                const yHigh = getY(c.high);
                const yLow = getY(c.low);

                const isBull = c.close >= c.open;
                const candleFill = isBull ? '#22c55e' : '#ef4444';
                const candleStroke = isBull ? '#16a34a' : '#dc2626';
                const isHovered = hoverIndex === i;

                const bodyY = Math.min(yOpen, yClose);
                const rawH = Math.abs(yClose - yOpen);
                const bodyH = Math.max(2, rawH); // Ensures crisp Doji bar visibility

                return (
                  <g key={`candle-${i}`}>
                    {/* Upper & Lower Shadow / Wick */}
                    <line
                      x1={x}
                      y1={yHigh}
                      x2={x}
                      y2={yLow}
                      stroke={isHovered ? '#ffffff' : candleStroke}
                      strokeWidth={isHovered ? '2' : '1.3'}
                    />
                    {/* Candle Real Body */}
                    <rect
                      x={x - candleBodyWidth / 2}
                      y={bodyY}
                      width={candleBodyWidth}
                      height={bodyH}
                      fill={candleFill}
                      stroke={isHovered ? '#ffffff' : candleStroke}
                      strokeWidth={isHovered ? '1.8' : '1'}
                      rx="0.5"
                    />
                  </g>
                );
              })}

              {/* Pulsing live beacon at the latest candle */}
              {candles.length > 0 && (
                <g>
                  <circle
                    cx={getX(candles.length - 1)}
                    cy={getY(candles[candles.length - 1].close)}
                    r="4"
                    fill={candles[candles.length - 1].close >= candles[candles.length - 1].open ? '#22c55e' : '#ef4444'}
                  />
                  <circle
                    cx={getX(candles.length - 1)}
                    cy={getY(candles[candles.length - 1].close)}
                    r="9"
                    fill="none"
                    stroke={candles[candles.length - 1].close >= candles[candles.length - 1].open ? '#22c55e' : '#ef4444'}
                    strokeWidth="1.5"
                    className="animate-ping"
                    opacity="0.8"
                  />
                </g>
              )}
            </g>
          )}

          {/* Moving Averages */}
          {showMA && (
            <>
              {ma20Path && (
                <path d={ma20Path} fill="none" stroke="#00dce6" strokeWidth="1.4" opacity="0.9" />
              )}
              {ma50Path && (
                <path d={ma50Path} fill="none" stroke="#ffb2b7" strokeWidth="1.4" strokeDasharray="3,2" opacity="0.8" />
              )}
            </>
          )}

          {/* Interactive Crosshair & Cursor HUD */}
          {hoverIndex !== null && activeCandle && (
            <g>
              {/* Vertical Crosshair Line */}
              <line
                x1={getX(hoverIndex)}
                y1={5}
                x2={getX(hoverIndex)}
                y2={svgHeight - 15}
                stroke="#dfe2ed"
                strokeWidth="0.8"
                strokeDasharray="3,3"
                opacity="0.75"
              />

              {/* Horizontal Crosshair Line */}
              <line
                x1={marginX}
                y1={getY(activeCandle.close)}
                x2={plotWidth}
                y2={getY(activeCandle.close)}
                stroke="#dfe2ed"
                strokeWidth="0.8"
                strokeDasharray="3,3"
                opacity="0.75"
              />

              {/* Price Tag Box on Right Axis */}
              <g>
                <rect
                  x={plotWidth + 4}
                  y={getY(activeCandle.close) - 8}
                  width={66}
                  height={16}
                  fill={isUp ? '#003824' : '#690005'}
                  stroke={themeColor}
                  strokeWidth="0.8"
                  rx="2"
                />
                <text
                  x={plotWidth + 7}
                  y={getY(activeCandle.close) + 3.5}
                  fill="#ffffff"
                  fontSize="8.5"
                  fontFamily="JetBrains Mono"
                  fontWeight="bold"
                >
                  {curr}{activeCandle.close < 1000 ? activeCandle.close.toFixed(2) : activeCandle.close.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </text>
              </g>

              {/* Active Marker Dot */}
              <circle
                cx={getX(hoverIndex)}
                cy={getY(activeCandle.close)}
                r="4.5"
                fill="#ffffff"
                stroke={themeColor}
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {/* X-Axis Time Ticks */}
        <div className="absolute bottom-1 left-4 right-16 flex justify-between text-[9px] font-mono text-[#849495] pointer-events-none">
          <span>{candles[0]?.time}</span>
          <span>{candles[Math.floor(candles.length / 2)]?.time}</span>
          <span>{candles[candles.length - 1]?.time}</span>
        </div>
      </div>
    </div>
  );
};

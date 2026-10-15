import React, { useState } from 'react';
import { Asset, AssetCategory } from '../../types/terminal';
import { Search, ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';

interface AssetMatrixProps {
  assets: Asset[];
  selectedAsset: Asset;
  onSelectAsset: (asset: Asset) => void;
  onTradeAsset: (asset: Asset) => void;
}

export const AssetMatrix: React.FC<AssetMatrixProps> = ({
  assets,
  selectedAsset,
  onSelectAsset,
  onTradeAsset,
}) => {
  const [category, setCategory] = useState<AssetCategory>('ALL');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'alphaScore' | 'changePercent24h' | 'price' | 'volume'>('alphaScore');
  const [sortAsc, setSortAsc] = useState(false);

  const categories: AssetCategory[] = ['ALL', 'EQUITIES', 'CRYPTO', 'FX', 'FUTURES', 'COMMODITIES'];

  const filteredAssets = assets
    .filter((a) => (category === 'ALL' ? true : a.category === category))
    .filter(
      (a) =>
        a.symbol.toLowerCase().includes(search.toLowerCase()) ||
        a.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let valA = a[sortField === 'volume' ? 'volatilityPercentile' : sortField];
      let valB = b[sortField === 'volume' ? 'volatilityPercentile' : sortField];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return 0;
    });

  const handleSort = (field: 'alphaScore' | 'changePercent24h' | 'price' | 'volume') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="bg-[#181c23] border border-[#262a32] rounded flex flex-col h-full overflow-hidden">
      {/* Matrix Header */}
      <div className="p-3 border-b border-[#262a32] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold tracking-wider text-[#00f2fe] uppercase">
              Asset Universe & Alpha Matrix
            </span>
            <span className="text-[11px] font-mono text-[#849495]">({filteredAssets.length})</span>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-[#849495]" />
            <input
              type="text"
              placeholder="Filter ticker / name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 pr-2.5 py-1 text-xs bg-[#0f131b] border border-[#3a494b] rounded text-[#dfe2ed] placeholder-[#849495] focus:outline-none focus:border-[#00f2fe] w-40 sm:w-48 font-mono"
            />
          </div>
        </div>

        {/* Categories segmented buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-2.5 py-1 text-[11px] font-mono font-medium rounded transition-colors whitespace-nowrap ${
                category === cat
                  ? 'bg-[#00f2fe]/15 text-[#00f2fe] border border-[#00f2fe]/40'
                  : 'text-[#b9cacb] hover:text-[#dfe2ed] hover:bg-[#262a32]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* High-Density Ticker Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#262a32] bg-[#0f131b]/70 sticky top-0 z-10 text-[11px] font-mono text-[#849495]">
              <th className="py-2 px-3 font-medium">TICKER</th>
              <th
                onClick={() => handleSort('price')}
                className="py-2 px-3 font-medium text-right cursor-pointer hover:text-[#dfe2ed]"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>LAST</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('changePercent24h')}
                className="py-2 px-3 font-medium text-right cursor-pointer hover:text-[#dfe2ed]"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>24H CHG</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('alphaScore')}
                className="py-2 px-3 font-medium text-right cursor-pointer hover:text-[#dfe2ed]"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>ALPHA</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-2 px-2.5 font-medium text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262a32]/60 font-mono text-xs">
            {filteredAssets.map((asset) => {
              const isSelected = selectedAsset.symbol === asset.symbol;
              const isPositive = asset.changePercent24h >= 0;

              return (
                <tr
                  key={asset.symbol}
                  onClick={() => onSelectAsset(asset)}
                  className={`cursor-pointer transition-colors group ${
                    isSelected
                      ? 'bg-[#00f2fe]/10 border-l-2 border-l-[#00f2fe]'
                      : 'hover:bg-[#1c2027]'
                  }`}
                >
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-[#dfe2ed] flex items-center gap-1.5">
                      <span>{asset.symbol}</span>
                      <span className="text-[10px] text-[#849495] font-normal truncate max-w-[80px]">
                        {asset.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-right font-mono-numbers text-[#dfe2ed]">
                    {asset.price < 5
                      ? asset.price.toFixed(4)
                      : asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  <td className="py-2.5 px-3 text-right font-mono-numbers">
                    <span
                      className={`inline-flex items-center justify-end gap-0.5 font-medium ${
                        isPositive ? 'text-[#4edea3]' : 'text-[#ffb4ab]'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>
                        {isPositive ? '+' : ''}
                        {asset.changePercent24h.toFixed(2)}%
                      </span>
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-right font-mono-numbers">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-semibold text-[#00f2fe]">
                        {asset.alphaScore.toFixed(1)}
                      </span>
                      <div className="w-8 h-1.5 bg-[#0f131b] rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="h-full bg-gradient-to-r from-[#00f2fe] to-[#4edea3]"
                          style={{ width: `${asset.alphaScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 px-2.5 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTradeAsset(asset);
                      }}
                      className="px-2 py-0.5 text-[10px] font-mono font-medium rounded border border-[#3a494b] text-[#b9cacb] hover:text-[#00f2fe] hover:border-[#00f2fe] hover:bg-[#00f2fe]/10 transition-colors"
                    >
                      TRADE
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredAssets.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#849495] text-xs font-mono">
                  No assets matching "{search}" in {category}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

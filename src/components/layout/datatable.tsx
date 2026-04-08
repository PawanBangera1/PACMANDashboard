import { useMemo, useState } from 'react';
import { Funnel, Search, ChevronUp, ChevronDown } from 'lucide-react';

export default function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  rowKey,
  className,
  title = 'Showing 20 Records',
  showToolbar = true,
  searchPlaceholder = 'SEARCH',
}: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const processedRows = useMemo(() => {
    let items = [...rows];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(row => columns.some((col: any) => String(row[col.key]).toLowerCase().includes(q)));
    }
    if (sortConfig) {
      items.sort((a, b) => {
        const aV = a[sortConfig.key];
        const bV = b[sortConfig.key];
        // Date sorting logic
        if (sortConfig.key === 'date') {
          const toTime = (s: string) => {
            const [d, m, y] = s.split('/');
            return new Date(2000 + Number(y), Number(m) - 1, Number(d)).getTime();
          };
          return sortConfig.direction === 'asc' ? toTime(aV) - toTime(bV) : toTime(bV) - toTime(aV);
        }
        // Number vs String logic
        return sortConfig.direction === 'asc' 
          ? (isNaN(aV) ? String(aV).localeCompare(String(bV)) : aV - bV)
          : (isNaN(bV) ? String(bV).localeCompare(String(aV)) : bV - aV);
      });
    }
    return items;
  }, [rows, searchQuery, sortConfig, columns]);

  return (
    <div className={`flex flex-col font-sans ${className ?? ''}`}>
      {/* TOOLBAR */}
      {showToolbar && (
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-[15px] font-medium text-gray-500">{title}</h3>
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center bg-[#f1f5f9] border border-slate-400 text-slate-400 hover:bg-slate-200 transition-colors">
              <Funnel size={16} />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={12} />
              <input
                className="h-8 border border-slate-500 pl-9 pr-4 text-[12px] font-bold tracking-wider outline-none w-60 placeholder:text-slate-300 text-slate-600 shadow-sm"
                placeholder={searchPlaceholder}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="border-b border-slate-200">
              {columns.map((col: any) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="group cursor-pointer border-b border-gray-400 px-4 py-4 text-left text-[12px] font-semibold text-[#1e293b] hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    <div className="flex flex-col text-gray-800 opacity-100 group-hover:opacity-100 transition-opacity">
                      <ChevronUp size={10} className={sortConfig?.key === col.key && sortConfig.direction === 'asc' ? 'text-blue-600' : 'text-slate-400'} />
                      <ChevronDown size={10} className={sortConfig?.key === col.key && sortConfig.direction === 'desc' ? 'text-blue-600' : 'text-slate-400'} />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedRows.map((row, idx) => (
              <tr 
                key={rowKey(row, idx)} 
                className={`transition-colors hover:bg-blue-50/30 ${idx % 2 === 1 ? 'bg-gray-200' : 'bg-white'}`}
              >
                {columns.map((col: any) => (
                  <td key={col.key} className="px-4 py-1.5 text-[12px] text-[#475569] border-b border-transparent">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
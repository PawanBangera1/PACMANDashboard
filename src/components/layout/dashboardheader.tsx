import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronRight, Search, Calendar, MinusSquare } from 'lucide-react';

type DashboardHeaderProps = {
  compact?: boolean;
};

const Dashboardheader = ({ compact = false }: DashboardHeaderProps) => {
  const [isAppOpen, setIsAppOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const isAnyDropdownOpen = isAppOpen || isDateOpen;
  
  // State for Date Selection Logic
  const [dateMode, setDateMode] = useState<'period' | 'range'>('period');
  const [timePeriod, setTimePeriod] = useState('Last 6 Months');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const apps = Array.from({ length: 9 }, (_, i) => `App ${i + 1}`);

  type TreeNode = {
    label: string;
    children?: TreeNode[];
  };

  const compactAppTree: TreeNode[] = apps.map((app) => ({
    label: app,
    children: Array.from({ length: 3 }, (_, envIndex) => ({
      label: `Environment ${envIndex + 1}`,
      children: Array.from({ length: 2 }, (_, stackIndex) => ({
        label: `Stack ${stackIndex + 1}`,
      })),
    })),
  }));

  const renderCompactNodes = (
    nodes: TreeNode[],
    depth = 0,
    lineage = ''
  ) =>
    nodes.map((node) => {
      const hasChildren = Boolean(node.children && node.children.length);
      const selectedValue = lineage ? `${lineage} > ${node.label}` : node.label;
      const isExpanded = expandedNodes.has(selectedValue);

      return (
        <div key={selectedValue}>
          <div
            className={`flex items-center gap-2 text-[11px] cursor-pointer hover:text-pink-400 ${depth > 0 ? 'pl-3 border-l border-pink-600' : ''}`}
            onClick={() => {
              setSelectedApp(selectedValue);
              if (hasChildren) {
                setExpandedNodes((prev) => {
                  const next = new Set(prev);

                  if (depth === 0) {
                    Array.from(next).forEach((key) => {
                      if (key === selectedValue || key.startsWith(`${selectedValue} > `)) {
                        return;
                      }
                      const root = key.split(' > ')[0];
                      if (root !== selectedValue) {
                        next.delete(key);
                      }
                    });
                  }

                  if (next.has(selectedValue)) {
                    Array.from(next).forEach((key) => {
                      if (key === selectedValue || key.startsWith(`${selectedValue} > `)) {
                        next.delete(key);
                      }
                    });
                  } else {
                    next.add(selectedValue);
                  }

                  return next;
                });
              } else {
                setIsAppOpen(false);
              }
            }}
          >
            <span className="inline-flex h-3 w-3 items-center justify-center bg-slate-100 text-[10px] font-bold leading-none text-pink-600">
              {hasChildren ? (isExpanded ? '-' : '+') : '+'}
            </span>
            <span className="text-left">{node.label}</span>
          </div>

          {hasChildren && isExpanded && <div className="mt-1 ml-3 space-y-2">{renderCompactNodes(node.children || [], depth + 1, selectedValue)}</div>}
        </div>
      );
    });

  const handleBackToAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedApp("");
    setIsAppOpen(false);
  };

  const closeAllDropdowns = () => {
    setIsAppOpen(false);
    setIsDateOpen(false);
  };

  const toggleAppDropdown = () => {
    setIsAppOpen((prev) => {
      const next = !prev;
      if (next) {
        setIsDateOpen(false);
      }
      return next;
    });
  };

  const toggleDateDropdown = () => {
    setIsDateOpen((prev) => {
      const next = !prev;
      if (next) {
        setIsAppOpen(false);
      }
      return next;
    });
  };

  const DateDropdown = () => (
    <div className="absolute top-full right-0 z-10 mt-1 w-72 bg-[#555555] text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="p-6 space-y-6">
        <div className="flex gap-3 text-left cursor-pointer" onClick={() => setDateMode('period')}>
          <div className="mt-1 h-4 w-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
            {dateMode === 'period' && <div className="h-2 w-2 rounded-full bg-white" />}
          </div>
          <div className={`flex-1 ${dateMode !== 'period' ? 'opacity-50' : ''}`}>
            <label className="text-[10px] font-bold uppercase block mb-2">Time Period</label>
            <div className="relative">
              <select 
                disabled={dateMode !== 'period'}
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="w-full bg-[#444444] border border-slate-500 p-2 text-xs appearance-none focus:outline-none cursor-pointer"
              >
                <option>Last 6 Months</option>
                <option>Last 9 Months</option>
                <option>Last 12 Months</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-3 w-3 text-white pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 text-left cursor-pointer" onClick={() => setDateMode('range')}>
          <div className={`mt-1 h-4 w-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${dateMode === 'range' ? 'border-white' : 'border-slate-400'}`}>
            {dateMode === 'range' && <div className="h-2 w-2 rounded-full bg-white" />}
          </div>
          <div className={`flex-1 space-y-3 ${dateMode !== 'range' ? 'opacity-50' : ''}`}>
            <label className="text-[10px] font-bold uppercase block">Date Range</label>
            <div className="relative">
              <input 
                type="date" 
                disabled={dateMode !== 'range'}
                value={dateRange.from}
                onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                className="w-full bg-[#444444] border border-slate-500 p-2 text-xs text-white focus:outline-none [color-scheme:dark]" 
              />
            </div>
            <div className="relative">
              <input 
                type="date"
                disabled={dateMode !== 'range'}
                value={dateRange.to}
                onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                className="w-full bg-[#444444] border border-slate-500 p-2 text-xs text-white focus:outline-none [color-scheme:dark]" 
              />
            </div>
          </div>
        </div>
      </div>
      <button 
        onClick={() => setIsDateOpen(false)}
        className="w-full bg-[#0099cc] py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#0088bb] transition-colors"
      >
        Apply
      </button>
    </div>
  );

  const AppDropdown = () => (
    <div className="absolute top-full left-0 z-10 mt-1 w-64 bg-[#555555] text-white shadow-2xl p-4 cursor-default" onClick={(e) => e.stopPropagation()}>
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-3 w-3 text-slate-400" />
        <input 
          className="w-full bg-[#444444] border border-slate-500 py-1.5 pl-7 pr-2 text-xs focus:outline-none text-white"
          placeholder="SEARCH"
        />
      </div>
      {compact ? (
        <div className="max-h-[430px] overflow-y-auto pr-1 space-y-2">
          <div
            className="flex items-center gap-2 text-[10px] font-bold uppercase cursor-pointer hover:text-pink-400"
            onClick={() => {
              setSelectedApp('');
              setIsAppOpen(false);
            }}
          >
            <MinusSquare className="h-3.5 w-3.5" />
            All applications
          </div>
          <div className="ml-4 space-y-2">{renderCompactNodes(compactAppTree)}</div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase cursor-pointer hover:text-pink-400"
               onClick={() => { setSelectedApp(""); setIsAppOpen(false); }}>
            <MinusSquare className="h-3.5 w-3.5" />
            All applications
          </div>
          <div className="ml-4 border-l border-pink-600 pl-4 space-y-3">
            {apps.map(app => (
              <div key={app} className="text-[10px] hover:text-pink-400 cursor-pointer text-left"
                   onClick={() => { setSelectedApp(app); setIsAppOpen(false); }}>
                {app}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (compact) {
    return (
      <>
        {isAnyDropdownOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={closeAllDropdowns}
            aria-hidden="true"
          />
        )}
        <div className="relative z-10 mx-auto mb-4 rounded-sm bg-white shadow-lg">
          <div className="flex items-center justify-between gap-3 px-3 py-2 md:px-6 md:py-3">
            <div className="flex items-center gap-3 cursor-pointer" onClick={toggleAppDropdown}>
              <Filter className="h-4 w-4 flex-shrink-0 text-pink-600" />
              <h1 className="font-['Montserrat'] text-[10px] font-bold uppercase text-slate-900 md:text-[10px]">
                <span onClick={handleBackToAll} className="hover:text-pink-600 transition-colors">All Applications</span>
                {selectedApp && ` > ${selectedApp}`}
              </h1>
              {isAppOpen && <AppDropdown />}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={toggleDateDropdown}
                className="inline-flex min-w-[150px] items-center justify-between border border-slate-300 px-3 py-1 text-[10px] font-semibold text-slate-800 md:min-w-[200px] md:text-[10px]"
              >
                <span>{dateMode === 'period' ? timePeriod : 'Custom Range'}</span>
                <ChevronDown className={`h-4 w-4 text-pink-600 transition-transform ${isDateOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDateOpen && <DateDropdown />}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {isAnyDropdownOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
          onClick={closeAllDropdowns}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 mx-auto mb-4 bg-white shadow-lg rounded-sm">
        <div className="flex justify-between md:grid grid-cols-1 md:grid-cols-[1fr_1.2fr_auto] gap-0 items-stretch">
        
        <div className="relative flex items-center gap-3 px-4 py-2 cursor-pointer" onClick={toggleAppDropdown}>
          <Filter className="h-4 w-4 text-pink-600 flex-shrink-0" />
          <div className="flex items-center gap-2">
            <h1 
              onClick={handleBackToAll}
              className="text-[10px] md:text-[10px] font-bold uppercase font-['Montserrat'] text-pink-600 whitespace-nowrap"
            >
              All Applications
            </h1>
            {selectedApp && (
              <>
                <ChevronRight className="h-4 w-4 text-slate-900 stroke-[3px]" />
                <span className="text-[10px] md:text-[10px] font-bold uppercase text-slate-900 whitespace-nowrap">
                  {selectedApp}
                </span>
              </>
            )}
          </div>
          {isAppOpen && <AppDropdown />}
        </div>

        <div className="hidden md:flex items-center justify-center gap-6 px-5 py-2 text-xs border-l border-slate-100 ">
          <div className="h-5 border-r border-slate-500" aria-hidden="true">
          </div>
          <span className='text-slate-800 font-semibold text-[10px] md:text-[10px] uppercase'>Application Status :</span>
          <div className='flex gap-6'>
            {[ {n: 43, l: 'PRODUCTION'}, {n: 7, l: 'BUILD'}, {n: 5, l: 'INTAKE'} ].map(stat => (
              <div key={stat.l} className='flex items-center gap-2'>
                <span className="text-pink-600 font-bold text-xs">{stat.n}</span>
                <span className='text-slate-500 font-semibold text-[10px] md:text-[10px]'>{stat.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-stretch">
          <div className="flex items-center justify-center gap-3 px-5 py-1 md:py-2.5 bg-[#3c3c3c] border-l border-slate-300">
            <span className="text-[10px] md:text-[10px] font-semibold uppercase text-white tracking-wider">Security</span>
            <span className="h-3.5 w-3.5 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.7)]" />
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Dashboardheader;
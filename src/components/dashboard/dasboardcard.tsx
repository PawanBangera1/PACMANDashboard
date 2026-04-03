import { useState, type ReactNode } from 'react';
import { DollarSign, Cloud, ShieldCheck, Activity, PieChart, Database } from 'lucide-react';
import Dashboardheader from '../layout/dashboardheader';

type CardId = 'cost' | 'inventory' | 'compliance' | 'monitoring' | 'utilization' | 'storage';

export default function Dashboard() {
  const [activeCard, setActiveCard] = useState<CardId>('cost');

  const getColumnIndex = (id: CardId) => {
    if (id === 'cost' || id === 'monitoring') return 1;
    if (id === 'inventory' || id === 'utilization') return 2;
    return 3;
  };

  const getColSpan = (id: CardId) => {
    if (!activeCard) return 'col-span-12';
    const activeCol = getColumnIndex(activeCard);
    const myCol = getColumnIndex(id);

    if (myCol === activeCol) return 'col-span-12 md:col-span-6';
    return 'col-span-12 md:col-span-3';
  };

  const handleCardClick = (id: CardId) => {
    if (activeCard === id) return;
    setActiveCard(id);
  };

  const renderEmptyThreeGrid = () => {
    return (
      <div className="mt-4 w-full">
        <div className="h-32 rounded border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 text-xs uppercase tracking-widest">
          Detailed View Content
        </div>
      </div>
    );
  };

  const renderCard = (
    id: CardId,
    title: string,
    icon: ReactNode,
    summaryContent: ReactNode,
    expandedContent?: ReactNode
  ) => {
    const isActive = activeCard === id;

    return (
      <div
        onClick={() => handleCardClick(id)}
        className={`bg-white shadow-sm border border-gray-100 overflow-hidden cursor-pointer flex flex-col transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] ${getColSpan(id)}`}
        style={{ minHeight: '140px' }}
      >
        <div className="p-5 flex flex-col items-center justify-center flex-grow">
          <div className="flex items-center justify-center space-x-2 text-gray-400 mb-4 uppercase tracking-[0.2em] font-bold text-[10px]">
            <span className="opacity-70">{icon}</span>
            <span>{title}</span>
          </div>

          <div className="w-full flex justify-center">
            {summaryContent}
          </div>
        </div>

        <div
          className={`grid transition-all duration-700 ease-in-out ${
            isActive ? 'grid-rows-[1fr] opacity-100 border-t border-gray-50' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-6 bg-white">{expandedContent}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Dashboardheader />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {renderCard(
          'cost', 'Cost', <DollarSign size={16} />,
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-bold text-[#e91e85]">$24.0K</h2>
            <div className="flex flex-col text-[#e91e85] leading-none text-[10px] font-bold">
              <span>/Day</span>
              <span className="text-gray-400 font-medium">Run Rate</span>
            </div>
          </div>,
          renderEmptyThreeGrid()
        )}

        {renderCard(
          'inventory', 'Inventory', <Cloud size={16} />,
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-bold text-[#e91e85]">6.5K</h2>
              <div className="flex flex-col text-[#e91e85] leading-[1.1] text-[9px] font-bold uppercase">
                <span>current</span>
                <span>instances</span>
              </div>
            </div>
            <p className="text-gray-400 text-[11px] mt-1.5">25.0K Unique Last 30 days</p>
          </div>,
          renderEmptyThreeGrid()
        )}

        {renderCard(
          'compliance', 'Compliance', <ShieldCheck size={16} />,
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-bold text-[#e91e85]">99.82%</h2>
              <div className="flex flex-col text-[#e91e85] leading-[1.1] text-[9px] font-bold">
                <span>Compliance</span>
                <span>All Apps</span>
              </div>
            </div>
            <p className="text-gray-800 text-[11px] font-bold mt-1">
              58 <span className="text-gray-400 font-normal">Rules</span>
            </p>
            <div className="flex gap-3 mt-2">
               {['TMNG', 'REBL', 'SOCL'].map((label, i) => (
                 <div key={label} className="text-center">
                   <p className="text-[#e91e85] font-bold text-xs">{[98.4, 98.1, 96.7][i]}%</p>
                   <p className="text-gray-400 text-[8px] font-bold uppercase tracking-widest">{label}</p>
                 </div>
               ))}
            </div>
          </div>,
          renderEmptyThreeGrid()
        )}

        {renderCard(
          'monitoring', 'Monitoring', <Activity size={16} />,
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-bold text-[#e91e85]">3.4M</h2>
              <span className="text-[#e91e85] text-[10px] font-bold">Requests</span>
            </div>
            <p className="text-gray-400 text-[11px] mt-1">3,412 Unique Visitors</p>
          </div>,
          renderEmptyThreeGrid()
        )}

        {renderCard(
          'utilization', 'Utilization', <PieChart size={16} />,
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-bold text-[#e91e85]">39%</h2>
              <span className="text-gray-400 text-[10px] font-medium uppercase">Overall</span>
            </div>
          </div>,
          renderEmptyThreeGrid()
        )}

        {renderCard(
          'storage', 'Storage', <Database size={16} />,
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-bold text-[#e91e85]">4.15</h2>
            <div className="flex flex-col text-[#e91e85] leading-none text-[10px] font-bold uppercase">
              <span>PB</span>
              <span className="text-gray-400 font-medium">In Use</span>
            </div>
          </div>,
          renderEmptyThreeGrid()
        )}

      </div>
    </div>
  );
}
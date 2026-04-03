import React, { useState } from 'react';
import { DollarSign, Cloud, ShieldCheck, Activity, PieChart, Database, Filter } from 'lucide-react';
import Dashboardheader from '../layout/dashboardheader'; 

type CardId = 'cost' | 'inventory' | 'compliance' | 'monitoring' | 'utilization' | 'storage' | null;

export default function Dashboard() {
  const [activeCard, setActiveCard] = useState<CardId>('cost');

  const getColumnIndex = (id: CardId) => {
    if (['cost', 'monitoring'].includes(id as string)) return 1;
    if (['inventory', 'utilization'].includes(id as string)) return 2;
    if (['compliance', 'storage'].includes(id as string)) return 3;
    return null;
  };
  const monitoringWide = getColumnIndex(activeCard) === getColumnIndex('monitoring');
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
      <div className="mt-4 grid grid-cols-1 gap-3">
        <div className="h-28 rounded border-gray-300 bg-gray-50" />
      </div>
    );
  };

  const renderCard = (
    id: CardId, 
    title: string, 
    icon: React.ReactNode, 
    summaryContent: React.ReactNode, 
    expandedContent?: React.ReactNode
  ) => {
    const isActive = activeCard === id;
    const isColExpanded = getColumnIndex(activeCard) === getColumnIndex(id);
    return (
      <div 
        onClick={() => handleCardClick(id)}
        className={`bg-white shadow-sm border border-gray-200 overflow-hidden cursor-pointer flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${getColSpan(id)}`}
        style={{ minHeight: '160px' }}
      >
        <div className={`p-4 flex ${isColExpanded && !isActive ? 'flex-row items-center justify-between' : 'flex-col'} transition-all duration-800`}>
          
          <div className="flex items-center justify-center text-gray-500 text-xs font-bold tracking-widest uppercase mb-7 shrink-0">
            <div className='flex items-center'>{icon}
            <span>{title}</span>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            {summaryContent}
          </div>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isActive && expandedContent ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-4 pt-0 bg-white w-full">
              <div className="flex-grow w-full">{expandedContent}</div>
            </div>
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
          'cost', 'COST', <DollarSign size={14} />,
          <div className="flex flex-row items-baseline space-x-2 justify-center lg:justify-start">
            <h2 className="text-3xl lg:text-4xl font-bold text-pink-600">$24.0K</h2>
            <span className="text-[10px] text-pink-600 font-bold leading-tight">/Day<br/><span className="text-gray-400 font-normal">Run Rate</span></span>
          </div>,
          renderEmptyThreeGrid()
        )}

        {renderCard(
          'inventory', 'INVENTORY', <Cloud size={14} />,
          <div className="flex flex-col items-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-pink-600 flex items-baseline">
              6.5K <span className="text-[10px] text-pink-600 font-bold ml-1 leading-tight">current<br/>instances</span>
            </h2>
            <p className="text-gray-400 text-[10px] mt-1 text-center">25.0K Unique Last 30 days</p>
          </div>,
          renderEmptyThreeGrid()
        )}

        {renderCard(
          'compliance', 'COMPLIANCE', <ShieldCheck size={14} />,
          <div className="flex flex-col items-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-pink-600 flex items-baseline">
              99.82% <span className="text-[10px] text-pink-600 font-bold ml-1 leading-tight">Compliance<br/>All Apps</span>
            </h2>
            <p className="text-gray-400 text-[10px] mt-1 text-center">58 Rules</p>
          </div>,
          renderEmptyThreeGrid()
        )}

        {renderCard(
          'monitoring', 'MONITORING', <Activity size={14} />,
            <div className="flex items-end justify-between gap-3">
              <h2 className="text-3xl lg:text-4xl font-bold text-pink-600">3.4M</h2>
              <span className="text-xs font-bold leading-tight text-pink-600">Requests Last 5 hrs</span>
              <p className="text-xs text-gray-400">3,412 Unique Visitors</p>
            </div>,
          renderEmptyThreeGrid()
        )}

        {renderCard(
          'utilization', 'UTILIZATION', <PieChart size={14} />,
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl lg:text-3xl font-bold text-pink-600 flex items-baseline">
              39% <span className="text-[10px] text-gray-500 font-normal ml-1">Overall</span>
            </h2>
          </div>,
          renderEmptyThreeGrid()
        )}

        {renderCard(
          'storage', 'STORAGE', <Database size={14} />,
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl lg:text-3xl font-bold text-pink-600 flex items-baseline">
              4.15 <span className="text-[10px] text-pink-600 font-bold ml-1 leading-tight">PB<br/><span className="text-gray-400 font-normal">In Use</span></span>
            </h2>
          </div>,
          renderEmptyThreeGrid()
        )}

      </div>
    </div>
  );
}
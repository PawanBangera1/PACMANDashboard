import { useState, type ReactNode } from 'react';
import { Cloud, ShieldCheck, Activity, PieChart, Database } from 'lucide-react';
import Dashboardheader from '../layout/dashboardheader';
import CostGraph from '../graphs/costgraph';
import InventoryGraph from '../graphs/inventorygraph';
import MonitoringGraph from '../graphs/monitoringgraph';
import StorageGraph from '../graphs/storagegraph';
import { LuCircleDollarSign } from 'react-icons/lu';

type CardId = 'cost' | 'inventory' | 'compliance' | 'monitoring' | 'utilization' | 'storage';

export default function Dashboard() {
  const [activeCard, setActiveCard] = useState<CardId>('cost');

  const getGridPosition = (id: CardId) => {
    const layoutMap: Record<CardId, Record<CardId, string>> = {
      cost: {
        cost: "md:col-start-1 md:col-end-7 md:row-start-1 md:row-end-10",
        monitoring: "md:col-start-1 md:col-end-7 md:row-start-10 md:row-end-13",
        inventory: "md:col-start-7 md:col-end-10 md:row-start-1 md:row-end-7",
        utilization: "md:col-start-7 md:col-end-10 md:row-start-7 md:row-end-13",
        compliance: "md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-7",
        storage: "md:col-start-10 md:col-end-13 md:row-start-7 md:row-end-13",
      },
      inventory: {
        inventory: "md:col-start-4 md:col-end-10 md:row-start-1 md:row-end-10",
        utilization: "md:col-start-4 md:col-end-10 md:row-start-10 md:row-end-13",
        cost: "md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-7",
        monitoring: "md:col-start-1 md:col-end-4 md:row-start-7 md:row-end-13",
        compliance: "md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-7",
        storage: "md:col-start-10 md:col-end-13 md:row-start-7 md:row-end-13",
      },
      compliance: {
        compliance: "md:col-start-7 md:col-end-13 md:row-start-1 md:row-end-10",
        storage: "md:col-start-7 md:col-end-13 md:row-start-10 md:row-end-13",
        cost: "md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-7",
        monitoring: "md:col-start-1 md:col-end-4 md:row-start-7 md:row-end-13",
        inventory: "md:col-start-4 md:col-end-7 md:row-start-1 md:row-end-7",
        utilization: "md:col-start-4 md:col-end-7 md:row-start-7 md:row-end-13",
      },
      monitoring: {
        monitoring: "md:col-start-1 md:col-end-7 md:row-start-4 md:row-end-13",
        cost: "md:col-start-1 md:col-end-7 md:row-start-1 md:row-end-4",
        inventory: "md:col-start-7 md:col-end-10 md:row-start-1 md:row-end-7",
        utilization: "md:col-start-7 md:col-end-10 md:row-start-7 md:row-end-13",
        compliance: "md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-7",
        storage: "md:col-start-10 md:col-end-13 md:row-start-7 md:row-end-13",
      },
      utilization: {
        utilization: "md:col-start-4 md:col-end-10 md:row-start-4 md:row-end-13",
        inventory: "md:col-start-4 md:col-end-10 md:row-start-1 md:row-end-4",
        cost: "md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-7",
        monitoring: "md:col-start-1 md:col-end-4 md:row-start-7 md:row-end-13",
        compliance: "md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-7",
        storage: "md:col-start-10 md:col-end-13 md:row-start-7 md:row-end-13",
      },
      storage: {
        storage: "md:col-start-7 md:col-end-13 md:row-start-4 md:row-end-13",
        compliance: "md:col-start-7 md:col-end-13 md:row-start-1 md:row-end-4",
        cost: "md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-7",
        monitoring: "md:col-start-1 md:col-end-4 md:row-start-7 md:row-end-13",
        inventory: "md:col-start-4 md:col-end-7 md:row-start-1 md:row-end-7",
        utilization: "md:col-start-4 md:col-end-7 md:row-start-7 md:row-end-13",
      }
    };
    return layoutMap[activeCard][id] || "";
  };

  const renderCard = (id: CardId, title: string, icon: ReactNode, mainVal: string, subLabel: string, subGrid?: {val: string, label: string}[]) => {
    const isActive = activeCard === id;
    
    return (
      <div
        onClick={() => setActiveCard(id)}
        className={`bg-white shadow-sm border border-gray-100 cursor-pointer flex flex-col overflow-hidden
          transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] 
          col-span-12 ${getGridPosition(id)}
          ${isActive ? 'ring-1 ring-[#e91e85]/20 z-10' : 'z-0'}
          rounded-sm p-3`}
      >
        <div className="flex flex-col items-center justify-center h-full text-center grid-cols-12">
          <div className="flex items-center  space-x-2 text-slate-500 mb-2 md:mb-4 uppercase font-bold text-sm grid-cols-4">
            {icon} <span>{title}</span>
          </div>

          {id === 'cost' && isActive ? (
            <div className="w-full mb-2 text-left overflow-hidden">
              <CostGraph />
            </div>
          ) : null}

          {id === 'inventory' && isActive ? (
            <div className="w-full mb-2 text-left overflow-hidden">
              <InventoryGraph />
            </div>
          ) : null}

          {id === 'storage' && isActive ? (
            <div className="w-full mb-2 text-left overflow-hidden">
              <StorageGraph />
            </div>
          ) : null}

          {id === 'monitoring' && isActive ? (
            <div className="w-full mb-2 text-left overflow-hidden">
              <MonitoringGraph />
            </div>
          ) : null}
          
          <div className={`flex w-full flex-col ${isActive ? 'items-start text-left px-6' : 'items-center text-center'}`}>
            <div className="flex items-baseline gap-1">
               <h2 className={`font-bold text-[#e91e85] transition-all duration-500 ${isActive ? 'text-2xl md:text-3xl' : 'text-2xl md:text-3xl'}`}>
                 {mainVal}
               </h2>
               <span className={`text-[#e91e85] font-bold leading-none transition-all ${isActive ? 'text-[10px]' : 'text-[8px]'}`}>
                 {subLabel}
               </span>
            </div>
            <p className="text-gray-400 text-[10px] font-semibold mt-0.5">Unique Last 30 days</p>
          </div>

          <div
            className={`grid transition-all duration-700 ease-in-out w-full ${
              isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              {id === 'cost' || id === 'inventory' || id === 'storage' || id === 'monitoring' ? null : (
                <div className="h-32 md:h-48 rounded border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 text-[10px]">
                  DETAILED CHART VIEW
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-4 px-16">
      <Dashboardheader />
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 md:grid-rows-12 gap-3 h-auto md:h-[90vh]">
        
        {renderCard('cost', 'Cost', <LuCircleDollarSign size={18}/>, "$24.0K", "/Day Run Rate")}

        {renderCard('inventory', 'Inventory', <Cloud size={12}/>, "6.5K", "instances", [
          {val: "153", label: "LBs"}, {val: "57", label: "ASG"}, {val: "132", label: "S3"}, {val: "9000", label: "EBS"}
        ])}

        {renderCard('compliance', 'Compliance', <ShieldCheck size={12}/>, "99.82%", "All Apps", [
          {val: "98.4%", label: "TMNG"}, {val: "98.1%", label: "REBL"}, {val: "96.7%", label: "SOCL"}, {val: "58", label: "Rules"}
        ])}

        {renderCard('monitoring', 'Monitoring', <Activity size={12}/>, "3.4M", "Requests")}

        {renderCard('utilization', 'Utilization', <PieChart size={12}/>, "39%", "Overall")}

        {renderCard('storage', 'Storage', <Database size={12}/>, "4.15", "PB In Use", [
          {val: "1.25", label: "EBS"}, {val: "1.50", label: "S3"}, {val: "0.65", label: "Other"}
        ])}

      </div>
    </div>
  );
}
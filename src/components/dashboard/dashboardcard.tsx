import { useState } from 'react';
import { Cloud, ShieldCheck, Activity, PieChart, Database } from 'lucide-react';
import { LuCircleDollarSign } from 'react-icons/lu';
import Dashboardheader from '../layout/dashboardheader';
import CostGraph from '../graphs/costgraph';
import InventoryGraph from '../graphs/inventorygraph';
import MonitoringGraph from '../graphs/monitoringgraph';
import StorageGraph from '../graphs/storagegraph';
import UtilizationGraph from '../graphs/utilizationgraph';
import ComplianceGraph from '../graphs/compliancegraph';
import DashboardTile from './dashboardtile';
import type { CardConfig, CardId, SubGridItem } from '../../types/dashboard.types';

const layoutMap: Record<CardId, Record<CardId, string>> = {
  cost: {
    cost: 'md:col-start-1 md:col-end-7 md:row-start-1 md:row-end-10',
    monitoring: 'md:col-start-1 md:col-end-7 md:row-start-10 md:row-end-13',
    inventory: 'md:col-start-7 md:col-end-10 md:row-start-1 md:row-end-7',
    utilization: 'md:col-start-7 md:col-end-10 md:row-start-7 md:row-end-13',
    compliance: 'md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-7',
    storage: 'md:col-start-10 md:col-end-13 md:row-start-7 md:row-end-13',
  },
  inventory: {
    inventory: 'md:col-start-4 md:col-end-10 md:row-start-1 md:row-end-10',
    utilization: 'md:col-start-4 md:col-end-10 md:row-start-10 md:row-end-13',
    cost: 'md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-7',
    monitoring: 'md:col-start-1 md:col-end-4 md:row-start-7 md:row-end-13',
    compliance: 'md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-7',
    storage: 'md:col-start-10 md:col-end-13 md:row-start-7 md:row-end-13',
  },
  compliance: {
    compliance: 'md:col-start-7 md:col-end-13 md:row-start-1 md:row-end-10',
    storage: 'md:col-start-7 md:col-end-13 md:row-start-10 md:row-end-13',
    cost: 'md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-7',
    monitoring: 'md:col-start-1 md:col-end-4 md:row-start-7 md:row-end-13',
    inventory: 'md:col-start-4 md:col-end-7 md:row-start-1 md:row-end-7',
    utilization: 'md:col-start-4 md:col-end-7 md:row-start-7 md:row-end-13',
  },
  monitoring: {
    monitoring: 'md:col-start-1 md:col-end-7 md:row-start-4 md:row-end-13',
    cost: 'md:col-start-1 md:col-end-7 md:row-start-1 md:row-end-4',
    inventory: 'md:col-start-7 md:col-end-10 md:row-start-1 md:row-end-7',
    utilization: 'md:col-start-7 md:col-end-10 md:row-start-7 md:row-end-13',
    compliance: 'md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-7',
    storage: 'md:col-start-10 md:col-end-13 md:row-start-7 md:row-end-13',
  },
  utilization: {
    utilization: 'md:col-start-4 md:col-end-10 md:row-start-4 md:row-end-13',
    inventory: 'md:col-start-4 md:col-end-10 md:row-start-1 md:row-end-4',
    cost: 'md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-7',
    monitoring: 'md:col-start-1 md:col-end-4 md:row-start-7 md:row-end-13',
    compliance: 'md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-7',
    storage: 'md:col-start-10 md:col-end-13 md:row-start-7 md:row-end-13',
  },
  storage: {
    storage: 'md:col-start-7 md:col-end-13 md:row-start-4 md:row-end-13',
    compliance: 'md:col-start-7 md:col-end-13 md:row-start-1 md:row-end-4',
    cost: 'md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-7',
    monitoring: 'md:col-start-1 md:col-end-4 md:row-start-7 md:row-end-13',
    inventory: 'md:col-start-4 md:col-end-7 md:row-start-1 md:row-end-7',
    utilization: 'md:col-start-4 md:col-end-7 md:row-start-7 md:row-end-13',
  },
};

const cards: CardConfig[] = [
  { id: 'cost', title: 'Cost', icon: <LuCircleDollarSign size={18} />, mainVal: '$24.0K', subLabel: '/Day\nRun Rate' },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: <Cloud size={12} />,
    mainVal: '6.5K',
    subLabel: 'current\ninstances',
    subGrid: [
      { val: '153', label: 'LBs' },
      { val: '57', label: 'ASG' },
      { val: '132', label: 'S3' },
      { val: '9000', label: 'EBS' },
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance',
    icon: <ShieldCheck size={12} />,
    mainVal: '99.82%',
    subLabel: 'compliance\nAll Apps',
    subGrid: [
      { val: '98.4%', label: 'TMNG' },
      { val: '98.1%', label: 'REBL' },
      { val: '96.7%', label: 'SOCL' },
      { val: '58', label: 'Rules' },
    ],
  },
  { id: 'monitoring', title: 'Monitoring', icon: <Activity size={12} />, mainVal: '3.4M', subLabel: 'Requests' },
  { id: 'utilization', title: 'Utilization', icon: <PieChart size={12} />, mainVal: '39%', subLabel: 'Overall' },
  {
    id: 'storage',
    title: 'Storage',
    icon: <Database size={12} />,
    mainVal: '4.15',
    subLabel: 'PB In Use',
    subGrid: [
      { val: '1.25', label: 'EBS' },
      { val: '1.50', label: 'S3' },
      { val: '0.65', label: 'Other' },
    ],
  },
];

export default function Dashboard() {
  const [activeCard, setActiveCard] = useState<CardId>('cost');

  const getGridPosition = (id: CardId) => layoutMap[activeCard][id] || '';

  const handleCardClick = (id: CardId) => {
    if (id === 'cost' && activeCard === 'cost') {
      window.location.assign('/dashbord/code');
      return;
    }

    if (id === 'inventory' && activeCard === 'inventory') {
      window.location.assign('/dashbord/inventory');
      return;
    }

    if (id === 'monitoring' && activeCard === 'monitoring') {
      window.location.assign('/dashbord/monitoring');
      return;
    }

    if (id === 'storage' && activeCard === 'storage') {
      window.location.assign('/dashbord/storage');
      return;
    }

    setActiveCard(id);
  };

  const renderSubGrid = (subGrid?: SubGridItem[]) => {
    if (!subGrid?.length) {
      return null;
    }

    return (
      <div className="mt-4 grid w-full px-8 grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-4">
        {subGrid.map((item) => (
          <div key={`${item.label}-${item.val}`} className="text-center md:text-left">
            <div className="text-sm font-semibold leading-none text-[#e91e85]">{item.val}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderPreviewFooter = (id: CardId, isActive: boolean, subGrid?: SubGridItem[]) => {
    if (isActive) {
      return null;
    }

    if (id === 'cost') {
      return (
        <div className="mt-10 text-center justify-end">
          <div className="text-sm font-semibold text-[#e91e85]">$0.40</div>
          <div className="text-xs font-semibold text-gray-400">/Instance HR</div>
        </div>
      );
    }

    if (id === 'inventory') {
      return (
        <div className="w-full">
          <p className="text-center font-semibold text-gray-500">
            <span className=" text-sm font-bold text-slate-600">25.0K</span>
            <span className="text-xs ml-1">Unique Last 30 days</span>
          </p>
          <div className="mt-8">{renderSubGrid(subGrid)}</div>
        </div>
      );
    }

    if (id === 'compliance') {
      return (
        <div className=" w-full">
          <div className="text-center">
            <span className="text-sm font-bold text-slate-700">58</span>
            <span className="ml-1 text-xs font-semibold text-slate-500">Rules</span>
          </div>
          <div className="mt-8 px-4 grid grid-cols-3 gap-3 text-center">
            {[
              { val: '98.4%', label: 'TMNG' },
              { val: '98.1%', label: 'REBL' },
              { val: '96.7%', label: 'SOCL' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-[13px] font-semibold text-[#e91e85]">{item.val}</div>
                <div className="text-[10px]  text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (id === 'monitoring') {
      return (
        <div className="mt-8 w-full">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { val: '30.5K', label: 'TMNG' },
              { val: '10.0K', label: 'SOCL' },
              { val: '17.4K', label: 'REBL' },
            ].map((item) => (
              <div className='' key={item.label}>
                <div className="text-[13px] font-bold text-[#e91e85]">{item.val}</div>
                <div className="text-[10px] font-semibold text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (id === 'utilization') {
      return (
        <div className="mt-8 w-full">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'CPU', arc: 'border-slate-300' },
              { label: 'I/O', arc: 'border-[#e91e85]' },
                                                                                                                                                 { label: 'DISK', arc: 'border-[#e91e85]' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className={`h-5 w-5 rounded-full border-4 border-b-transparent ${item.arc}`} />
                <div className="mt-1 text-[10px] font-semibold text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (id === 'storage') {
      return (
        <div className="mt-8 w-full">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { val: '1.25PB', label: 'EBS' },
              { val: '1.50PB', label: 'S3' },
              { val: '0.65PB', label: 'Other' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-[13px] font-bold text-[#e91e85]">{item.val}</div>
                <div className="text-[10px] font-semibold text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderActiveDetails = (id: CardId, subGrid?: SubGridItem[]) => {
    if (id === 'cost') {
      return (
        <div className="mb-2 w-full overflow-hidden text-left">
          <CostGraph />
        </div>
      );
    }

    if (id === 'inventory') {
      return (
        <>
          <div className="mb-2 w-full overflow-hidden text-left">
            <InventoryGraph />
          </div>
        </>
      );
    }

     if (id === 'compliance') {
      return (
        <>
          <div className="mb-2 w-full overflow-hidden text-left">
            <ComplianceGraph />
          </div>
        </>
      );
    }

    if (id === 'storage') {
      return (
        <>
          <div className="mb-2 w-full overflow-hidden text-left">
            <StorageGraph />
          </div>
        </>
      );
    }

    if (id === 'monitoring') {
      return (
        <div className="mb-2 w-full overflow-hidden text-left">
          <MonitoringGraph />
        </div>
      );
    }

    if (id === 'utilization') {
      return (
        <div className="mb-2 w-full overflow-hidden text-left">
          <UtilizationGraph />
        </div>
      );
    }

  };

  return (
    <div className="min-h-screen px-16 py-4">
      <Dashboardheader />
      <div className="mx-auto grid h-auto max-w-[1600px] grid-cols-1 gap-3 md:h-[90vh] md:grid-cols-12 md:grid-rows-12">
        {cards.map((card) => {
          const isActive = activeCard === card.id;

          return (
            <DashboardTile
              key={card.id}
              title={card.title}
              icon={card.icon}
              mainVal={card.mainVal}
              subLabel={card.subLabel}
              isActive={isActive}
              gridClass={getGridPosition(card.id)}
              onClick={() => handleCardClick(card.id)}
              footerContent={renderPreviewFooter(card.id, isActive, card.subGrid)}
            >
              {isActive ? renderActiveDetails(card.id, card.subGrid) : null}
            </DashboardTile>
          );
        })}
      </div>
    </div>
  );
}

import { useMemo, useState, type ReactNode } from 'react';
import { Cloud, ShieldCheck, Activity, PieChart, Database } from 'lucide-react';
import { LuCircleDollarSign } from 'react-icons/lu';
import { AiOutlineCloud, AiOutlineCloudServer } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import { GrStorage } from "react-icons/gr";
import Dashboardheader from '../layout/dashboardheader';
import CostGraph from '../graphs/costgraph';
import InventoryGraph from '../graphs/inventorygraph';
import MonitoringGraph from '../graphs/monitoringgraph';
import StorageGraph from '../graphs/storagegraph';
import UtilizationGraph from '../graphs/utilizationgraph';
import ComplianceGraph from '../graphs/compliancegraph';
import DashboardTile from '../layout/dashboardtile';
import type { CardConfig, CardId, SubGridItem } from '../../types/dashboard.types';

type DashboardCardConfig = CardConfig & {
  activeContent?: () => ReactNode;
  previewFooter?: (subGrid?: SubGridItem[]) => ReactNode;
};

const COLUMN_COUNT = 3;
const CARD_HEIGHT_NORMAL = 'h-[240px]';
const CARD_HEIGHT_ACTIVE = 'h-[390px]';
const CARD_HEIGHT_COMPACT = 'h-[90px]';

const cards: DashboardCardConfig[] = [
  {
    id: 'cost',
    title: 'Cost',
    icon: <LuCircleDollarSign size={18} />,
    mainVal: '$24.0K',
    subLabel: '/Day\nRun Rate',
    detailPath: '/dashbord/cost',
    activeContent: () => (
      <div className="mb-2 w-full overflow-hidden text-left">
        <CostGraph />
      </div>
    ),
    previewFooter: () => (
      <div className="mt-10 text-center justify-end">
        <div className="text-sm font-semibold text-[#e91e85]">$0.40</div>
        <div className="text-xs font-semibold text-gray-400">/Instance HR</div>
      </div>
    ),
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: <AiOutlineCloudServer size={24} />,
    mainVal: '6.5K',
    subLabel: 'current\ninstances',
    detailPath: '/dashbord/inventory',
    subGrid: [
      { val: '153', label: 'LBs' },
      { val: '57', label: 'ASG' },
      { val: '132', label: 'S3' },
      { val: '9000', label: 'EBS' },
    ],
    activeContent: () => (
      <div className="mb-2 w-full overflow-hidden text-left">
        <InventoryGraph />
      </div>
    ),
    previewFooter: (subGrid) => (
      <div className="w-full">
        <p className="text-center font-semibold text-gray-500">
          <span className=" text-sm font-bold text-slate-600">25.0K</span>
          <span className="text-xs ml-1">Unique Last 30 days</span>
        </p>
        <div className="mt-8">
          <div className="mt-4 grid w-full px-8 grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-4">
            {subGrid?.map((item) => (
              <div key={`${item.label}-${item.val}`} className="text-center md:text-left">
                <div className="text-sm font-semibold leading-none text-[#e91e85]">{item.val}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'compliance',
    title: 'Compliance',
    icon: <FaCheckCircle size={18} />,
    mainVal: '99.82%',
    subLabel: 'compliance\nAll Apps',
    detailPath: '/dashbord/compliance',
    subGrid: [
      { val: '98.4%', label: 'TMNG' },
      { val: '98.1%', label: 'REBL' },
      { val: '96.7%', label: 'SOCL' },
      { val: '58', label: 'Rules' },
    ],
    activeContent: () => (
      <div className="mb-2 w-full overflow-hidden text-left">
        <ComplianceGraph />
      </div>
    ),
    previewFooter: () => (
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
    ),
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    icon: <Activity size={12} />,
    mainVal: '3.4M',
    subLabel: 'Requests\nLast 5 hours 30 minutes',
    detailPath: '/dashbord/monitoring',
    activeContent: () => (
      <div className="mb-2 w-full overflow-hidden text-left">
        <MonitoringGraph />
      </div>
    ),
    previewFooter: () => (
      <div className=" w-full">
        <div className="w-full">
          <p className="text-center font-semibold text-gray-500">
            <span className=" text-sm font-bold text-slate-600">3416</span>
            <span className="text-xs ml-1">Unique Visitors</span>
          </p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          {[
            { val: '30.5K', label: 'TMNG' },
            { val: '10.0K', label: 'SOCL' },
            { val: '17.4K', label: 'REBL' },
          ].map((item) => (
            <div className="" key={item.label}>
              <div className="text-[13px] font-semibold text-[#e91e85]">{item.val}</div>
              <div className="text-[10px]  text-slate-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'utilization',
    title: 'Utilization',
    icon: <PieChart size={18} />,
    mainVal: '39%',
    subLabel: 'Overall',
    detailPath: '/dashbord/utilization',
    activeContent: () => (
      <div className="mb-2 w-full overflow-hidden text-left">
        <UtilizationGraph />
      </div>
    ),
    previewFooter: () => (
      <div className="mt-10 w-full">
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
    ),
  },
  {
    id: 'storage',
    title: 'Storage',
    icon: <GrStorage size={18} />,
    mainVal: '4.15',
    subLabel: 'PB In Use',
    detailPath: '/dashbord/storage',
    subGrid: [
      { val: '1.25', label: 'EBS' },
      { val: '1.50', label: 'S3' },
      { val: '0.65', label: 'Other' },
    ],
    activeContent: () => (
      <div className="mb-2 w-full overflow-hidden text-left">
        <StorageGraph />
      </div>
    ),
    previewFooter: () => (
      <div className="mt-10 w-full">
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
    ),
  },

];

export default function Dashboard() {
  const [activeCard, setActiveCard] = useState<CardId>(cards[0]?.id || '');

  const columns = useMemo(() => {
    const grouped: DashboardCardConfig[][] = Array.from({ length: COLUMN_COUNT }, () => []);
    cards.forEach((card, index) => {
      grouped[index % COLUMN_COUNT].push(card);
    });
    return grouped;
  }, []);

  const activeColumn = useMemo(() => {
    const activeIndex = cards.findIndex((card) => card.id === activeCard);
    return activeIndex === -1 ? 0 : activeIndex % COLUMN_COUNT;
  }, [activeCard]);

  const getTileHeightClass = (columnCards: DashboardCardConfig[], id: CardId) => {
    const isActiveColumn = columnCards.some((card) => card.id === activeCard);

    if (!isActiveColumn) {
      return CARD_HEIGHT_NORMAL;
    }

    return id === activeCard ? CARD_HEIGHT_ACTIVE : CARD_HEIGHT_COMPACT;
  };

  const handleCardClick = (card: DashboardCardConfig) => {
    if (card.id === activeCard && card.detailPath) {
      window.location.assign(card.detailPath);
      return;
    }

    setActiveCard(card.id);
  };

  return (
    <div className="min-h-screen px-16 py-4">
      <Dashboardheader />
      <div className="mx-auto flex max-w-[1500px]  flex-col gap-2  md:flex-row">
        {columns.map((columnCards, columnIndex) => {
          const isActiveColumn = columnIndex === activeColumn;

          return (
            <div
              key={`column-${columnIndex}`}
              className={`flex w-full flex-col gap-2 transition-all duration-300 ${
                isActiveColumn ? 'md:w-1/2' : 'md:w-1/4'
              }`}
            >
              {columnCards.map((card) => {
                const isActive = activeCard === card.id;

                return (
                  <DashboardTile
                    key={card.id}
                    title={card.title}
                    icon={card.icon}
                    mainVal={card.mainVal}
                    subLabel={card.subLabel}
                    isActive={isActive}
                    gridClass={getTileHeightClass(columnCards, card.id)}
                    onClick={() => handleCardClick(card)}
                    footerContent={isActive ? null : card.previewFooter?.(card.subGrid) ?? null}
                  >
                    {isActive ? card.activeContent?.() ?? null : null}
                  </DashboardTile>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

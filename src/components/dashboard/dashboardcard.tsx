import { useState, type ReactNode } from 'react';
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

type DashboardCardConfig = CardConfig & {
  activeContent?: () => ReactNode;
  previewFooter?: (subGrid?: SubGridItem[]) => ReactNode;
};

const defaultActiveLayout = 'md:col-start-4 md:col-end-10 md:row-start-1 md:row-end-10';
const COLUMN_COUNT = 3;

const columnLayoutsByActiveColumn = [
  [
    'md:col-start-1 md:col-end-7',
    'md:col-start-7 md:col-end-10',
    'md:col-start-10 md:col-end-13',
  ],
  [
    'md:col-start-1 md:col-end-4',
    'md:col-start-4 md:col-end-10',
    'md:col-start-10 md:col-end-13',
  ],
  [
    'md:col-start-1 md:col-end-4',
    'md:col-start-4 md:col-end-7',
    'md:col-start-7 md:col-end-13',
  ],
] as const;

const rowTop = 'md:row-start-1 md:row-end-7';
const rowBottom = 'md:row-start-7 md:row-end-13';
const rowActiveTop = 'md:row-start-1 md:row-end-10';
const rowActiveBottom = 'md:row-start-4 md:row-end-13';
const rowCompactTop = 'md:row-start-1 md:row-end-4';
const rowCompactBottom = 'md:row-start-10 md:row-end-13';

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
    icon: <Cloud size={12} />,
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
    icon: <ShieldCheck size={12} />,
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
    icon: <PieChart size={12} />,
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
    icon: <Database size={12} />,
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

  const getGridPosition = (id: CardId) => {
    const activeIndex = cards.findIndex((card) => card.id === activeCard);
    const cardIndex = cards.findIndex((card) => card.id === id);

    if (activeIndex === -1 || cardIndex === -1) {
      return '';
    }

    const activeColumn = activeIndex % COLUMN_COUNT;
    const cardColumn = cardIndex % COLUMN_COUNT;
    const columnClass = columnLayoutsByActiveColumn[activeColumn]?.[cardColumn] || 'md:col-start-1 md:col-end-13';

    const cardsInColumn = cards.filter((_, index) => index % COLUMN_COUNT === cardColumn);
    const indexInColumn = cardsInColumn.findIndex((card) => card.id === id);
    const activeInColumn = cardsInColumn.findIndex((card) => card.id === activeCard);

    if (cardColumn !== activeColumn) {
      if (indexInColumn === 0) {
        return `${columnClass} ${rowTop}`;
      }
      if (indexInColumn === 1) {
        return `${columnClass} ${rowBottom}`;
      }
    } else {
      if (id === activeCard) {
        const activeRow = activeInColumn === 0 ? rowActiveTop : rowActiveBottom;
        return `${columnClass} ${activeRow}`;
      }

      if (indexInColumn === 0) {
        return `${columnClass} ${rowCompactTop}`;
      }
      if (indexInColumn === 1) {
        return `${columnClass} ${rowCompactBottom}`;
      }
    }

    if (id === activeCard) {
      return `${columnClass} ${defaultActiveLayout.split(' ').slice(2).join(' ')}`;
    }

    const sameColumnIds = cardsInColumn.map((card) => card.id);
    const overflowIndex = sameColumnIds.indexOf(id) - 2;
    if (overflowIndex < 0) {
      return '';
    }

    const rowStart = 13 + overflowIndex * 3;
    const rowEnd = rowStart + 3;
    return `${columnClass} md:row-start-${rowStart} md:row-end-${rowEnd}`;
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
              onClick={() => handleCardClick(card)}
              footerContent={isActive ? null : card.previewFooter?.(card.subGrid) ?? null}
            >
              {isActive ? card.activeContent?.() ?? null : null}
            </DashboardTile>
          );
        })}
      </div>
    </div>
  );
}

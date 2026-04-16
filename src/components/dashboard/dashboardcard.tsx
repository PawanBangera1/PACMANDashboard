import { useMemo, useState, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, PieChart } from 'lucide-react';
import { LuCircleDollarSign } from 'react-icons/lu';
import { AiOutlineCloudServer } from 'react-icons/ai';
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
import { fetchDashboardOverview } from '../../services/dashboard.service';
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
    mainVal: '',
    subLabel: '',
    detailPath: '/dashbord/cost',
    activeContent: () => (
      <div className="mb-2 w-full overflow-hidden text-left">
        <CostGraph />
      </div>
    ),
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: <AiOutlineCloudServer size={24} />,
    mainVal: '',
    subLabel: 'current\ninstances',
    detailPath: '/dashbord/inventory',
    activeContent: () => (
      <div className="mb-2 w-full overflow-hidden text-left">
        <InventoryGraph />
      </div>
    ),
  },
  {
    id: 'compliance',
    title: 'Compliance',
    icon: <FaCheckCircle size={18} />,
    mainVal: '',
    subLabel: '',
    detailPath: '/dashbord/compliance',
    activeContent: () => (
      <div className="mb-2 w-full overflow-hidden text-left">
        <ComplianceGraph />
      </div>
    ),
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    icon: <Activity size={12} />,
    mainVal: '',
    subLabel: '',
    detailPath: '/dashbord/monitoring',
    activeContent: () => (
      <div className="mb-2 w-full overflow-hidden text-left">
        <MonitoringGraph />
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
    mainVal: '',
    subLabel: '',
    detailPath: '/dashbord/storage',
    activeContent: () => (
      <div className="mb-2 w-full overflow-hidden text-left">
        <StorageGraph />
      </div>
    ),
  },
];

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: fetchDashboardOverview,
  });

  const overview = data?.data as any;
  const apps = overview?.applications?.list ?? [];
  const statuses = overview?.applications?.statuses ?? [];
  const summary = overview?.summary;

  const cardsWithOverview = useMemo(() => {
    return cards.map((card) => {
      if (card.id === 'cost') {
        return {
          ...card,
          mainVal: summary?.cost?.dailyCost ?? '',
          subLabel: summary?.cost?.runRateUnit ? `/Day\nRun Rate` : '',
          previewFooter: () => (
            <div className="mt-10 text-center justify-end">
              <div className="text-sm font-semibold text-[#e91e85]">{summary?.cost?.runRate ?? ''}</div>
              <div className="text-xs font-semibold text-gray-400">{summary?.cost?.runRateUnit ?? ''}</div>
            </div>
          ),
        };
      }

      if (card.id === 'inventory') {
        const resources = (summary?.inventory?.resources ?? []).map((item: { count: number; label: string }) => ({
          val: String(item.count),
          label: item.label,
        }));

        return {
          ...card,
          mainVal: summary?.inventory?.currentInstances ?? '',
          subGrid: resources,
          previewFooter: (subGrid?: SubGridItem[]) => (
            <div className="w-full">
              <p className="text-center font-semibold text-gray-500">
                <span className=" text-sm font-bold text-slate-600">{summary?.inventory?.uniqueLast30Days ?? ''}</span>
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
        };
      }

      if (card.id === 'compliance') {
        return {
          ...card,
          mainVal: summary?.compliance?.overallCompliance ?? '',
          subLabel: summary?.compliance?.overallApps ? `compliance\n${summary.compliance.overallApps}` : '',
          previewFooter: () => (
            <div className=" w-full">
              <div className="text-center">
                <span className="text-sm font-bold text-slate-700">{summary?.compliance?.rules ?? ''}</span>
              </div>
              <div className="mt-8 px-4 grid grid-cols-3 gap-3 text-center">
                {(summary?.compliance?.regions ?? []).map((item: { percentage: string; label: string }) => (
                  <div key={item.label}>
                    <div className="text-[13px] font-semibold text-[#e91e85]">{item.percentage}</div>
                    <div className="text-[10px]  text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        };
      }

      if (card.id === 'monitoring') {
        return {
          ...card,
          mainVal: summary?.monitoring?.requests ?? '',
          subLabel: summary?.monitoring?.requestsTimeframe ? `Requests\n${summary.monitoring.requestsTimeframe}` : '',
          previewFooter: () => (
            <div className=" w-full">
              <div className="w-full">
                <p className="text-center font-semibold text-gray-500">
                  <span className=" text-sm font-bold text-slate-600">{summary?.monitoring?.uniqueVisitors ?? ''}</span>
                  <span className="text-xs ml-1">Unique Visitors</span>
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                {(summary?.monitoring?.breakdown ?? []).map((item: { count: string; label: string }) => (
                  <div key={item.label}>
                    <div className="text-[13px] font-semibold text-[#e91e85]">{item.count}</div>
                    <div className="text-[10px]  text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        };
      }

      if (card.id === 'utilization') {
        return { ...card, mainVal: summary?.utilization?.overall ?? '' };
      }

      if (card.id === 'storage') {
        const total = String(summary?.storage?.total ?? '');
        const numeric = total.split(' ')[0];

        return {
          ...card,
          mainVal: numeric || '',
          subLabel: summary?.storage?.label ? `PB ${summary.storage.label}` : '',
          previewFooter: () => (
            <div className="mt-10 w-full">
              <div className="grid grid-cols-3 gap-3 text-center">
                {(summary?.storage?.breakdown ?? []).map((item: { size: string; label: string }) => (
                  <div key={item.label}>
                    <div className="text-[13px] font-bold text-[#e91e85]">{item.size}</div>
                    <div className="text-[10px] font-semibold text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        };
      }

      return card;
    });
  }, [summary]);

  const [activeCard, setActiveCard] = useState<CardId>(cards[0]?.id || '');

  const columns = useMemo(() => {
    const grouped: DashboardCardConfig[][] = Array.from({ length: COLUMN_COUNT }, () => []);
    cardsWithOverview.forEach((card, index) => {
      grouped[index % COLUMN_COUNT].push(card);
    });
    return grouped;
  }, [cardsWithOverview]);

  const activeColumn = useMemo(() => {
    const activeIndex = cardsWithOverview.findIndex((card) => card.id === activeCard);
    return activeIndex === -1 ? 0 : activeIndex % COLUMN_COUNT;
  }, [activeCard, cardsWithOverview]);

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
      <Dashboardheader apps={apps} statuses={statuses} />
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

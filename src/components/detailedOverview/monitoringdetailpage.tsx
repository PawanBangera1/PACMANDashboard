import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import Dashboardheader from '../layout/dashboardheader';
import MonitoringGraph from '../graphs/monitoringgraph';
import { fetchMonitoringDetail } from '../../services/dashboard.service';

type MonitoringPanel = {
  id: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  requests: string;
  users: string;
  network: string;
  latency: string;
};

function MonitoringPanelCard({
  panel,
  expanded,
  onExpand,
}: {
  panel: MonitoringPanel;
  expanded: boolean;
  onExpand: () => void;
}) {
  return (
    <section className={`border bg-white p-6 shadow-sm ${expanded ? 'min-h-[500px]' : 'min-h-[640px]'}`}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold uppercase leading-none text-gray-500 md:text-2xl">{panel.title}</h2>
            <span className="rounded-sm bg-lime-400 px-2 py-0.5 text-[8px] font-bold uppercase text-white md:text-[9px]">Live</span>
          </div>
          <p className="mt-2 text-base text-slate-500 md:text-lg">{panel.subtitle}</p>
        </div>

        <button type="button" onClick={onExpand} aria-label={expanded ? 'Back to dashboard' : 'Expand monitoring view'} className="text-slate-500 p-0.5 border rounded-full bg-gray-500 hover:text-slate-800">
          <X className="h-5 w-5 md:h-6 md:w-6 text-white font-bold" />
        </button>
      </div>

      <div className="mb-8 text-right text-[11px] font-semibold text-slate-600 md:text-xs">{panel.updatedAt}</div>

      <div className="mb-6 w-full overflow-hidden">
        <MonitoringGraph />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
        <div>
          <div className="text-xs font-semibold text-[#e10098]">{panel.requests}</div>
          <div className="text-xs font-semibold uppercase text-slate-500">Requests</div>
        </div>
        <div>
          <div className="text-xs font-semibold text-[#e10098]">{panel.users}</div>
          <div className="text-xs font-semibold uppercase text-slate-500"># Unique Users</div>
        </div>
        <div>
          <div className="text-xs font-semibold text-[#e10098]">{panel.network}</div>
          <div className="text-xs font-semibold uppercase text-slate-500">Network Bytes</div>
        </div>
        <div>
          <div className="text-xs font-semibold text-[#e10098]">{panel.latency}</div>
          <div className="text-xs font-semibold uppercase text-slate-500">CPU Latency</div>
        </div>
      </div>
    </section>
  );
}

export default function MonitoringDetailPage() {
  const [expandedPanelId, setExpandedPanelId] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['monitoring-detail'],
    queryFn: fetchMonitoringDetail,
  });

  const monitoringPanels = (data?.data?.panels ?? []) as MonitoringPanel[];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-slate-500">
        Loading monitoring detail...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-red-600">
        {(error as Error).message}
      </div>
    );
  }

  const visiblePanels = expandedPanelId ? monitoringPanels.filter((panel) => panel.id === expandedPanelId) : monitoringPanels;

  return (
    <div className="min-h-screen px-16 py-4">
      <Dashboardheader compact />

      <div className="flex min-h-[calc(100vh-110px)] flex-col">


        <div className={`grid gap-4 ${expandedPanelId ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-2'}`}>
          {visiblePanels.map((panel) => (
            <MonitoringPanelCard
              key={panel.id}
              panel={panel}
              expanded={!!expandedPanelId}
              onExpand={() => {
                if (expandedPanelId) {
                  window.location.assign('/dashbord');
                  return;
                }

                setExpandedPanelId(panel.id);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

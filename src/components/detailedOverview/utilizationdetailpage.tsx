import { Download, Share2, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import UtilizationGraph from '../graphs/utilizationgraph';
import Dashboardheader from '../layout/dashboardheader';
import DataTable from '../layout/datatable';
import type { UtilizationDetailApiRow, UtilizationDetailRow } from '../../types/dashboard.types';
import { fetchUtilizationDetail } from '../../services/dashboard.service';

const utilizationDetailColumns = [
  { key: 'label1', label: 'Sample' },
  { key: 'number', label: 'CPU %' },
  { key: 'date', label: 'I/O Avg (kb/s)' },
  { key: 'label4', label: 'DISK Avg (MB)' },
  { key: 'label5', label: 'I/O Spread' },
  { key: 'label6', label: 'DISK Spread' },
  { key: 'label7', label: 'Status' },
];

const buildUtilizationRows = (rows: UtilizationDetailApiRow[]): UtilizationDetailRow[] => rows.map((point, index) => {
  const ioAvg = (point.io1 + point.io2) / 2;
  const diskAvg = (point.disk1 + point.disk2) / 2;
  const ioSpread = Math.abs(point.io1 - point.io2);
  const diskSpread = Math.abs(point.disk1 - point.disk2);

  return {
    label1: `Point ${index + 1}`,
    number: `${point.cpu}%`,
    date: `${ioAvg.toFixed(1)}`,
    label4: `${diskAvg.toFixed(1)}`,
    label5: `${ioSpread}`,
    label6: `${diskSpread}`,
    label7: point.cpu >= 13 ? 'High' : point.cpu >= 10 ? 'Normal' : 'Low',
  };
});

export default function UtilizationDetailPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['utilization-detail'],
    queryFn: fetchUtilizationDetail,
  });

  const utilizationSeries = (data?.data?.data ?? []) as UtilizationDetailApiRow[];
  const utilizationDetailRows = buildUtilizationRows(utilizationSeries);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-slate-500">
        Loading utilization detail...
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

  return (
    <div className="min-h-screen px-16 py-4">
      <Dashboardheader compact />
      <div className="flex min-h-[calc(100vh-110px)] flex-col border bg-[#ffff] p-8">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide text-slate-600 md:text-2xl">UTILIZATION</h2>
            <p className="text-xs text-slate-500">All Apps</p>
          </div>
          <div className="flex items-center gap-5 text-[#e10098] md:gap-8">
            <button type="button" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
            <button type="button" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button
              type="button"
              aria-label="Close utilization detail"
              onClick={() => window.location.assign('/home/dashboard')}
            className="text-slate-600 p-0.5 border rounded-full bg-gray-500 hover:text-slate-800"

            >
              <X className="h-4 w-4 text-white font-bold" />
            </button>
          </div>
        </div>

        <div className="mb-6 p-3 md:p-6">
          <UtilizationGraph detail rows={utilizationSeries} />
        </div>

        <div className="mb-4 border-t border-slate-300" />
        <DataTable
          title={`Showing ${utilizationDetailRows.length} Records`}
          columns={utilizationDetailColumns}
          rows={utilizationDetailRows}
          rowKey={(_: UtilizationDetailRow, index: number) => `utilization-row-${index}`}
        />
      </div>
    </div>
  );
}

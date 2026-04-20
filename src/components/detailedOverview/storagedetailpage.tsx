import { Download, Share2, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import StorageGraph from '../graphs/storagegraph';
import Dashboardheader from '../layout/dashboardheader';
import DataTable from '../layout/datatable';
import type { StorageDetailApiRow, StorageDetailRow } from '../../types/dashboard.types';
import { fetchStorageDetail } from '../../services/dashboard.service';

const storageDetailColumns = [
  { key: 'label1', label: 'Type' },
  { key: 'number', label: 'Capacity' },
  { key: 'date', label: 'Share %' },
  { key: 'label4', label: 'Trend' },
  { key: 'label5', label: 'Health' },
  { key: 'label6', label: 'Region' },
  { key: 'label7', label: 'Status' },
];

const buildStorageRows = (rows: StorageDetailApiRow[]): StorageDetailRow[] => rows.map((item) => ({
  label1: item.label,
  number: item.value,
  date: `${item.percent.toFixed(2)}%`,
  label4: item.trend,
  label5: item.health,
  label6: item.region,
  label7: item.percent > 15 ? 'Active' : 'Review',
}));

export default function StorageDetailPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['storage-detail'],
    queryFn: fetchStorageDetail,
  });

  const storageSeries = (data?.data?.data ?? []) as StorageDetailApiRow[];
  const storageDetailRows = buildStorageRows(storageSeries);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-slate-500">
        Loading storage detail...
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
            <h2 className="text-lg font-bold uppercase tracking-wide text-gray-500 md:text-2xl">STORAGE</h2>
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
              aria-label="Close storage detail"
              onClick={() => window.location.assign('/home/dashboard')}
              className="text-slate-600 p-0.5 border rounded-full bg-gray-500 hover:text-slate-800"

            >
              <X className="h-4 w-4 font-bold text-white" />
            </button>
          </div>
        </div>

        <div className="mb-6 p-3 md:p-6">
          <StorageGraph detail rows={storageSeries} />
        </div>

        <div className="mb-4 border-t border-slate-300" />
        <DataTable
          title={`Showing ${storageDetailRows.length} Records`}
          columns={storageDetailColumns}
          rows={storageDetailRows}
          rowKey={(_: StorageDetailRow, index: number) => `storage-row-${index}`}
        />
      </div>
    </div>
  );
}

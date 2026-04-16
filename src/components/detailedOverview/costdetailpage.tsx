import { Download, Share2, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import CostGraph, { type CostDetailApiRow } from '../graphs/costgraph';
import Dashboardheader from '../layout/dashboardheader';
import DataTable from '../layout/datatable';
import type { CostDetailRow } from '../../types/dashboard.types';
import { fetchCostDetail } from '../../services/dashboard.service';

const costDetailColumns = [
  { key: 'label1', label: 'Month' },
  { key: 'number', label: 'Actual Cost' },
  { key: 'date', label: 'Projected Cost' },
  { key: 'label4', label: 'Actual Run Rate' },
  { key: 'label5', label: 'Projected Run Rate' },
];

const buildCostRows = (rows: CostDetailApiRow[]): CostDetailRow[] => rows.map((row) => {
  return {
    label1: row.month,
    number: `$${row.actualCost}k`,
    date: `$${row.projectedCost}k`,
    label4: row.actualRunRate === null ? '-' : row.actualRunRate.toFixed(2),
    label5: row.projectedRunRate.toFixed(2),
  };
});

export default function CostDetailPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cost-detail'],
    queryFn: fetchCostDetail,
  });

  const costSeries = (data?.data?.data ?? []) as CostDetailApiRow[];
  const costDetailRows = buildCostRows(costSeries);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-slate-500">
        Loading cost detail...
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
            <h2 className="text-lg font-bold text-gray-500 md:text-2xl">AWS COST MANAGEMENT</h2>
            <p className="text-xs text-slate-500">All Apps</p>
          </div>
          <div className="flex items-center gap-3 text-[#e10098] md:gap-8">
            <button type="button" className="inline-flex items-center gap-1 font-bold uppercase text-[10px]">
              <Download className="h-4 w-4" />
              <span className='hidden md:block'>Download</span>
            </button>
            <button type="button" className="inline-flex items-center gap-2 font-bold uppercase text-[10px]">
              <Share2 className="h-4 w-4" />
              <span className='hidden md:block'>Share</span>
            </button>
            <button
              type="button"
              aria-label="Close cost detail"
              onClick={() => window.location.assign('/home/dashboard')}
              className="text-slate-600 p-0.5 border rounded-full bg-gray-500 hover:text-slate-800"

            >
              <X className="h-4 font-bold text-white w-4" />
            </button>
          </div>
        </div>

        <div className="mb-6 p-3 md:p-6">
          <CostGraph detail rows={costSeries} />
        </div>

        <div className="mb-4 border-t border-slate-300" />
       <DataTable
          title={`Showing ${costDetailRows.length} Records`}
          columns={costDetailColumns}
          rows={costDetailRows}
          rowKey={(_: CostDetailRow, index: number) => `row-${index}`}
        />
      </div>
    </div>
  );
}

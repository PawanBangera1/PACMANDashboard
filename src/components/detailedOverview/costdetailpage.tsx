import { Download, Share2, X } from 'lucide-react';
import CostGraph, {
  costDetailActualCost,
  costDetailActualRunRate,
  costDetailLabels,
  costDetailProjectedCost,
  costDetailProjectedRunRate,
} from '../graphs/costgraph';
import Dashboardheader from '../layout/dashboardheader';
import DataTable from '../layout/datatable';
import type { CostDetailRow } from '../../types/dashboard.types';

const costDetailColumns = [
  { key: 'label1', label: 'Month' },
  { key: 'number', label: 'Actual Cost' },
  { key: 'date', label: 'Projected Cost' },
  { key: 'label4', label: 'Actual Run Rate' },
  { key: 'label5', label: 'Projected Run Rate' },
  { key: 'label6', label: 'Variance' },
  { key: 'label7', label: 'Status' },
];

const costDetailRows: CostDetailRow[] = costDetailLabels.map((month, index) => {
  const actualCost = costDetailActualCost[index] ?? 0;
  const projectedCost = costDetailProjectedCost[index] ?? 0;
  const actualRunRate = costDetailActualRunRate[index];
  const projectedRunRate = costDetailProjectedRunRate[index] ?? 0;
  const variance = actualCost - projectedCost;

  return {
    label1: month,
    number: `$${actualCost}k`,
    date: `$${projectedCost}k`,
    label4: actualRunRate === null ? '-' : actualRunRate.toFixed(2),
    label5: projectedRunRate.toFixed(2),
    label6: `${variance >= 0 ? '+' : ''}$${variance}k`,
    label7: variance >= 0 ? 'Over' : 'Under',
  };
});
export default function CostDetailPage() {
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
          <CostGraph detail />
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

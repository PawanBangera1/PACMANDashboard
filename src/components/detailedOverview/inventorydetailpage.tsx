import { Download, Share2, X } from 'lucide-react';
import InventoryGraph, { inventoryDetailSeries } from '../graphs/inventorygraph';
import Dashboardheader from '../layout/dashboardheader';
import DataTable from '../layout/datatable';
import type { InventoryDetailRow } from '../../types/dashboard.types';

const inventoryDetailColumns = [
  { key: 'label1', label: 'Date' },
  { key: 'number', label: 'Max Instances' },
  { key: 'date', label: 'Mid Instances' },
  { key: 'label4', label: 'Min Instances' },
  { key: 'label5', label: 'Spread (Max-Min)' },
  { key: 'label6', label: 'Mid/Max %' },
  { key: 'label7', label: 'Level' },
];

const inventoryDetailRows: InventoryDetailRow[] = inventoryDetailSeries.map((point) => {
  const spread = point.max - point.min;
  const midPct = (point.mid / point.max) * 100;

  return {
    label1: point.date,
    number: point.max.toString(),
    date: point.mid.toString(),
    label4: point.min.toString(),
    label5: spread.toString(),
    label6: `${midPct.toFixed(1)}%`,
    label7: point.max >= 900 ? 'High' : point.max >= 600 ? 'Medium' : 'Low',
  };
});

export default function InventoryDetailPage() {
  return (
    <div className="min-h-screen px-16 py-4">
      <Dashboardheader compact />
      <div className="flex min-h-[calc(100vh-110px)] flex-col border bg-[#ffff] p-8">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide text-slate-600 md:text-2xl">INVENTORY</h2>
            <p className="text-xs text-slate-500">All Apps</p>
          </div>
          <div className="flex items-center gap-5 text-[#e10098] md:gap-8">
            <button type="button" className="inline-flex items-center gap-2 text-xs font-bold uppercase">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
            <button type="button" className="inline-flex items-center gap-2 text-xs font-bold uppercase">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button
              type="button"
              aria-label="Close inventory detail"
              onClick={() => window.location.assign('/home/dashboard')}
              className="text-slate-600 hover:text-slate-800"
            >
              <X className="h-4 w-4 font-bold" />
            </button>
          </div>
        </div>

        <div className="mb-6 p-3 md:p-6">
          <InventoryGraph detail />
        </div>

        <div className="mb-4 border-t border-slate-300" />
        <DataTable
          title={`Showing ${inventoryDetailRows.length} Records`}
          columns={inventoryDetailColumns}
          rows={inventoryDetailRows}
          rowKey={(_: InventoryDetailRow, index: number) => `inventory-row-${index}`}
        />
      </div>
    </div>
  );
}

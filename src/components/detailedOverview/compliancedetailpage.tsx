import { Download, Share2, X } from 'lucide-react';
import ComplianceDetailGraph, { complianceDetailSeries } from '../graphs/compliancedetailgraph';
import Dashboardheader from '../layout/dashboardheader';
import DataTable from '../layout/datatable';
import type { ComplianceDetailRow } from '../../types/dashboard.types';

const complianceDetailColumns = [
  { key: 'label1', label: 'Control' },
  { key: 'number', label: 'Compliance %' },
  { key: 'date', label: 'Non-Compliance %' },
  { key: 'label4', label: 'Severity' },
  { key: 'label5', label: 'Owner' },
  { key: 'label6', label: 'Last Audit' },
  { key: 'label7', label: 'Status' },
];

const complianceDetailRows: ComplianceDetailRow[] = complianceDetailSeries.map((row, index) => {
  const nonCompliance = 100 - row.compliance;

  return {
    label1: row.control,
    number: `${row.compliance}%`,
    date: `${nonCompliance}%`,
    label4: row.compliance >= 70 ? 'Low' : row.compliance >= 50 ? 'Medium' : 'High',
    label5: index % 2 === 0 ? 'Security Team' : 'Ops Team',
    label6: `0${index + 1}/08/16`,
    label7: row.compliance >= 60 ? 'Compliant' : 'At Risk',
  };
});

export default function ComplianceDetailPage() {
  return (
    <div className="min-h-screen px-16 py-4">
      <Dashboardheader compact />
      <div className="flex min-h-[calc(100vh-110px)] flex-col border bg-[#ffff] p-8">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide text-slate-600 md:text-2xl">COMPLIANCE</h2>
            <p className="text-xs text-slate-500">All Apps</p>
          </div>
          <div className="flex items-center gap-5 text-[#e10098] md:gap-8">
            <button type="button" className="inline-flex items-center gap-1 font-bold uppercase text-xs">
              <Download className="h-4 w-4" />
              <span className='hidden md:block'>Download</span>
            </button>
            <button type="button" className="inline-flex items-center gap-2 font-bold uppercase text-xs">
              <Share2 className="h-4 w-4" />
              <span className='hidden md:block'>Share</span>
            </button>
            <button
              type="button"
              aria-label="Close compliance detail"
              onClick={() => window.location.assign('/home/dashboard')}
              className="bg-slate-500 rounded-full p-0.5"
            >
              <X className="h-4 w-4 text-white font-bold" />
            </button>
          </div>
        </div>

        <div className="mb-6 p-2 md:p-3">
          <ComplianceDetailGraph />
        </div>

        <div className="mb-4 border-t border-slate-300" />
        <DataTable
          title={`Showing ${complianceDetailRows.length} Records`}
          columns={complianceDetailColumns}
          rows={complianceDetailRows}
          rowKey={(_: ComplianceDetailRow, index: number) => `compliance-row-${index}`}
        />
      </div>
    </div>
  );
}

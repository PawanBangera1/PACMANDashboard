import { Download, Share2, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import ComplianceDetailGraph from '../graphs/compliancedetailgraph';
import Dashboardheader from '../layout/dashboardheader';
import DataTable from '../layout/datatable';
import type { ComplianceDetailApiRow, ComplianceDetailRow } from '../../types/dashboard.types';
import { fetchComplianceDetail } from '../../services/dashboard.service';

const complianceDetailColumns = [
  { key: 'label1', label: 'Control' },
  { key: 'number', label: 'Compliance %' },
  { key: 'date', label: 'Non-Compliance %' },
  { key: 'label4', label: 'Severity' },
  { key: 'label5', label: 'Owner' },
  { key: 'label6', label: 'Last Audit' },
  { key: 'label7', label: 'Status' },
];

const buildComplianceRows = (rows: ComplianceDetailApiRow[]): ComplianceDetailRow[] => rows.map((row) => ({
  label1: row.control,
  number: row.compliance,
  date: row.nonCompliance,
  label4: row.severity,
  label5: row.owner,
  label6: row.lastAudit,
  label7: row.status,
}));


export default function ComplianceDetailPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['compliance-detail'],
    queryFn: fetchComplianceDetail,
  });

  const complianceSeries = (data?.data?.data ?? []) as ComplianceDetailApiRow[];
  const complianceDetailRows = buildComplianceRows(complianceSeries);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-slate-500">
        Loading compliance detail...
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
            <h2 className="text-lg font-bold uppercase tracking-wide text-gray-500 md:text-2xl">COMPLIANCE</h2>
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
          <ComplianceDetailGraph rows={complianceSeries} />
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

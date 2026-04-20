import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import type { ComplianceDetailApiRow } from '../../types/dashboard.types';

const ringColors = ['#ff0a78', '#ff0a78', '#ff0a78', '#d6005f', '#b0004c', '#8a003c'];

type ComplianceGraphProps = {
  rows?: ComplianceDetailApiRow[];
};

export default function ComplianceGraph({ rows }: ComplianceGraphProps) {
  const segments = rows?.length
    ? rows.slice(0, 6).map((row) => ({
        name: row.control,
        value: Number.parseFloat(row.compliance.replace('%', '')),
      }))
    : [];

  const averageCompliance = segments.length
    ? segments.reduce((sum, segment) => sum + segment.value, 0) / segments.length
    : 0;

  const issueCount = rows?.length
    ? rows.filter((row) => Number.parseFloat(row.nonCompliance.replace('%', '')) > 0).length
    : 25;

  const scannedCount = rows?.length ? rows.length : 200000;

  return (
    <div className="flex h-full w-full flex-col justify-between px-4 pb-4 pt-2">
      <div className="flex items-end justify-center">
        <div className="text-right">
          <p className="text-xs text-[#e10098]">All Apps</p>
          <h2 className="leading-none text-[#e10098]">
            <span className="text-xl font-bold">99.82</span>
            <span className="text-lg">%</span>
          </h2>

          <div className="h-full space-y-1 text-[8px] text-slate-700">
            {segments.map((segment) => (
              <div key={segment.name} className="flex justify-end items-end gap-1">
                <span className="tracking-wide">{segment.name}</span>
                <span>{segment.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[220px] w-[150px] overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {segments.map((_, index) => (
                <Pie
                  key={`bg-${index}`}
                  data={[{ value: 100 }]}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-90}
                  cx="0%"
                  cy="50%"
                  innerRadius={26 + index * 14}
                  outerRadius={36 + index * 14}
                  isAnimationActive={false}
                >
                  <Cell fill="#eeeeee" />
                </Pie>
              ))}

              {segments.map((segment, index) => (
                <Pie
                  key={`fg-${segment.name}`}
                  data={[segment]}
                  dataKey="value"
                  startAngle={90 - (segment.value / 100) * 180}
                  endAngle={-90}
                  cx="0%"
                  cy="50%"
                  innerRadius={26 + index * 14}
                  outerRadius={36 + index * 14}
                  cornerRadius={1}
                  isAnimationActive={false}
                >
                  <Cell fill={ringColors[index]} />
                </Pie>
              ))}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 text-center">
        <div>
          <h3 className="text-sm font-bold text-[#e10098]">{scannedCount.toLocaleString()}</h3>
          <p className="text-xs text-slate-500">Scanned</p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#e10098]">{issueCount}</h3>
          <p className="text-xs text-slate-500">Issues Found</p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#e10098]">
            {averageCompliance.toFixed(2)}<span className="text-sm">%</span>
          </h3>
          <p className="text-xs text-slate-500">Items with issues</p>
        </div>
      </div>
    </div>
  );
}

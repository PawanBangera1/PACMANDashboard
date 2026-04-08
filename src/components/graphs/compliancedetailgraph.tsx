import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const complianceDetailSeries = [
  { control: 'SECURITY', compliance: 28 },
  { control: 'TAGGING', compliance: 50 },
  { control: 'CERTIFICATES', compliance: 65 },
  { control: 'PATCHING', compliance: 75 },
  { control: 'SOX', compliance: 60 },
  { control: 'CLOUD OP', compliance: 25 },
] as const;

const chartRows = complianceDetailSeries.map((row) => ({
  ...row,
  nonCompliance: 100 - row.compliance,
}));

export default function ComplianceDetailGraph() {
  return (
    <div className="h-[360px] w-full bg-white px-2 md:px-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartRows} barCategoryGap="22%" margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          <CartesianGrid stroke="#d1d5db" strokeDasharray="0" vertical={false} />
          <XAxis
            dataKey="control"
            axisLine={{ stroke: '#9ca3af' }}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 600 }}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}%`}
            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
          />
          <Tooltip
            formatter={(value, name) => {
              const percent = typeof value === 'number' ? value : Number(value ?? 0);
              const label = name === 'compliance' ? 'Compliance' : 'Non Compliance';
              return [`${percent}%`, label];
            }}
            cursor={{ fill: 'rgba(15,23,42,0.04)' }}
          />
          <Bar dataKey="compliance" stackId="a" fill="#e10098" maxBarSize={38} radius={[0, 0, 0, 0]} />
          <Bar dataKey="nonCompliance" stackId="a" fill="#b9b9bc" maxBarSize={38} radius={[0, 0, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

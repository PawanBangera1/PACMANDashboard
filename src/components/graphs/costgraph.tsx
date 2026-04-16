import {
  Chart as ChartJS,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import { fetchCostDetail } from '../../services/dashboard.service';

ChartJS.register(
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export type CostDetailApiRow = {
  month: string;
  actualCost: number;
  projectedCost: number;
  actualRunRate: number | null;
  projectedRunRate: number;
};

const createOptions = (detail: boolean): ChartOptions<'bar'> => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawOnChartArea: true,
        drawTicks: false,
        color: (context) => (context.index === 0 ? 'transparent' : '#f3f4f6'),
      },
      ticks: {
        padding: detail ? 12 : 8,
        color: '#9ca3af',
        font: { size: detail ? 12 : 10 },
      },
    },
    cost: {
      position: 'left',
      min: 0,
      max: 1000,
      grid: { color: '#f3f4f6' },
      title: {
        display: true,
        text: 'COST',
        color: '#9ca3af',
        font: { size: 9, weight: 'bold' }
      },
      ticks: {
        stepSize: 200,
        color: '#9ca3af',
        callback: (value) => `$${value === 0 ? 0 : value + 'k'}`,
      },
    },
    runRate: {
      position: 'right',
      min: 0,
      max: 0.5,
      title: {
        display: true,
        text: 'RUN RATE',
        color: '#9ca3af',
        font: { size: 9, weight: 'bold' }
      },
      ticks: {
        stepSize: 1.0,
        color: '#9ca3af',
        font: { size: detail ? 11 : 9 },
        callback: (value) => Number(value).toFixed(1),
      },
    },
  },
});

type CostGraphProps = {
  detail?: boolean;
};

const buildCompactChartData = (rows: CostDetailApiRow[]): ChartData<'bar' | 'line', number[], string> => {
  const compactRows = rows.slice(-6);

  return {
    labels: compactRows.map((row) => row.month),
    datasets: [
      {
        label: 'Actual Cost',
        data: compactRows.map((row) => row.actualCost),
        backgroundColor: '#f1009e',
        barPercentage: 1.0,
        categoryPercentage: 0.4,
        yAxisID: 'cost',
        order: 2,
      },
      {
        label: 'Projected Cost',
        data: compactRows.map((row) => row.projectedCost),
        backgroundColor: '#cfcfcf',
        barPercentage: 1.0,
        categoryPercentage: 0.4,
        yAxisID: 'cost',
        order: 2,
      },
      {
        label: 'Run Rate',
        data: compactRows.map((row) => row.projectedRunRate),
        type: 'line' as const,
        yAxisID: 'runRate',
        borderColor: '#cfcfcf',
        borderWidth: 1.5,
        borderDash: [3, 3],
        pointRadius: 0,
        tension: 0.4,
        order: 1,
      },
    ],
  };
};

const buildDetailChartData = (rows: CostDetailApiRow[]): ChartData<'bar' | 'line', (number | null)[], string> => ({
  labels: rows.map((row) => row.month),
  datasets: [
    {
      label: 'Actual Cost',
      data: rows.map((row) => row.actualCost),
      backgroundColor: '#f1009e',
      barThickness: 12,
      maxBarThickness: 12,
      yAxisID: 'cost',
      order: 2,
    },
    {
      label: 'Projected Cost',
      data: rows.map((row) => row.projectedCost),
      backgroundColor: '#cfcfcf',
      barThickness: 12,
      maxBarThickness: 12,
      yAxisID: 'cost',
      order: 2,
    },
    {
      label: 'Actual Run Rate',
      data: rows.map((row) => row.actualRunRate),
      type: 'line' as const,
      yAxisID: 'runRate',
      borderColor: '#f1009e',
      borderWidth: 2.0,
      pointRadius: 0,
      tension: 0.35,
      spanGaps: false,
      order: 1,
    },
    {
      label: 'Projected Run Rate',
      data: rows.map((row) => row.projectedRunRate),
      type: 'line' as const,
      yAxisID: 'runRate',
      borderColor: '#cfcfcf',
      borderWidth: 1.5,
      borderDash: [3, 3],
      pointRadius: 0,
      tension: 0.4,
      order: 1,
    },
  ],
});

export default function CostGraph({ detail = false }: CostGraphProps) {
  const { data } = useQuery({
    queryKey: ['cost-detail'],
    queryFn: fetchCostDetail,
  });

  const apiRows = (data?.data?.data ?? []) as CostDetailApiRow[];

  const chartData = detail ? buildDetailChartData(apiRows) : buildCompactChartData(apiRows);

  return (
    <div className={`w-full bg-white px-4 py-4 md:px-8 ${detail ? 'md:px-12 md:py-6' : ''}`}>

      <div className={`w-full ${detail ? 'h-[260px] md:h-[280px]' : 'h-[180px]'}`}>
        <Chart type="bar" data={chartData as any} options={createOptions(detail)} />
      </div>

      <div className={`mt-4 flex flex-nowrap items-center justify-around gap-x-6 gap-y-0 overflow-x-auto whitespace-nowrap uppercase font-medium text-gray-500 text-[9px]`}>
        <div className="flex shrink-0 items-center gap-4">
          <span className="h-3 w-3 bg-[#f1009e]" />
          <span className="text-left leading-tight">Actual<br />Cost</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="h-[3px] w-5 bg-[#f1009e]" />
          <span className="text-left leading-tight">Actual<br />Run Rate</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="h-3 w-3 bg-[#cfcfcf]" />
          <span className="text-left leading-tight">Projected<br />Cost</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="flex gap-1">
            <span className="h-1 w-1 bg-slate-300 rounded-full" />
            <span className="h-1 w-1 bg-slate-300 rounded-full" />
            <span className="h-1 w-1 bg-slate-300 rounded-full" />
          </span>
          <span className="text-left leading-tight">Projected<br />Run Rate</span>
        </div>
      </div>
    </div>
  );
}
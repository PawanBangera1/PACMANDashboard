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

const compactLabels = ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'];
export const costDetailLabels = ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'];
export const costDetailActualCost = [880, 680, 500, 880, 680, 500, 550, 290, 0, 0];
export const costDetailProjectedCost = [600, 300, 600, 720, 500, 600, 740, 910, 910, 910];
export const costDetailActualRunRate: Array<number | null> = [0.4, 0.25, 0.3, null, null, null, null, null, null, null];
export const costDetailProjectedRunRate = [0.5, 0.45, 0.43, 0.46, 0.42, 0.43, 0.44, 0.4, 0.34, 0.4];

const compactData: ChartData<'bar' | 'line', number[], string> = {
  labels: compactLabels,
  datasets: [
    {
      label: 'Actual Cost',
      data: [680, 500, 600, 300, 0, 0],
      backgroundColor: '#f1009e',
      barPercentage: 1.0,
      categoryPercentage: 0.4,
      yAxisID: 'cost',
      order: 2,
    },
    {
      label: 'Projected Cost',
      data: [500, 590, 740, 610, 520, 650],
      backgroundColor: '#cfcfcf',
      barPercentage: 1.0,
      categoryPercentage: 0.4,
      yAxisID: 'cost',
      order: 2,
    },
    {
      label: 'Run Rate',
      data: [0.5, 0.43, 0.45, 0.41, 0.34, 0.4],
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

const detailData: ChartData<'bar' | 'line', (number | null)[], string> = {
  labels: costDetailLabels,
  datasets: [
    {
      label: 'Actual Cost',
      data: costDetailActualCost,
      backgroundColor: '#f1009e',
      barThickness: 12,
      maxBarThickness: 12,
      yAxisID: 'cost',
      order: 2,
    },
    {
      label: 'Projected Cost',
      data: costDetailProjectedCost,
      backgroundColor: '#cfcfcf',
      barThickness: 12,
      maxBarThickness: 12,
      yAxisID: 'cost',
      order: 2,
    },
    {
      label: 'Actual Run Rate',
      data: costDetailActualRunRate,
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
      data: costDetailProjectedRunRate,
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

export default function CostGraph({ detail = false }: CostGraphProps) {
  const chartData = detail ? detailData : compactData;

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
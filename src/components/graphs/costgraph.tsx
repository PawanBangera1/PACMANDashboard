import {
  Chart as ChartJS,
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

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

const labels = ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'];

const data: ChartData<'bar' | 'line', number[], string> = {
  labels,
  datasets: [
    {
      label: 'Actual Cost',
      data: [680, 500, 600, 300, 0, 0],
      backgroundColor: '#f1009e',
      barPercentage: 0.8,
      categoryPercentage: 0.4,
      yAxisID: 'cost',
      order: 2,
    },
    {
      label: 'Projected Cost',
      data: [500, 590, 740, 610, 520, 650],
      backgroundColor: '#cfcfcf',
      barPercentage: 0.8,
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

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }, // Using custom legend below
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
        padding: 8,
        color: '#9ca3af',
        font: { size: 10 },
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
        stepSize: 0.1,
        color: '#9ca3af',
        font: { size: 9 },
        callback: (value) => Number(value).toFixed(1),
      },
    },
  },
};

export default function CostGraph() {
  return (
    <div className="w-full bg-white px-8 py-4">

      <div className="h-[160px] w-full">
        <Chart type="bar" data={data as any} options={options} />
      </div>

      <div className="mt-4 flex flex-nowrap items-center justify-center gap-x-6 gap-y-0 overflow-x-auto whitespace-nowrap text-[8px] font-medium uppercase text-slate-400 md:text-[10px]">
        <div className="flex shrink-0 items-center gap-2">
          <span className="h-2 w-2 bg-[#f1009e]" />
          <span className="text-center text-[8px] leading-tight">Actual<br />Cost</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="h-[3px] w-5 bg-[#f1009e]" />
          <span className="text-center text-[8px] leading-tight">Actual<br />Run Rate</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="h-2 w-2 bg-[#cfcfcf]" />
          <span className="text-center text-[8px] leading-tight">Projected<br />Cost</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="flex gap-1">
            <span className="h-1 w-1 bg-slate-300 rounded-full" />
            <span className="h-1 w-1 bg-slate-300 rounded-full" />
            <span className="h-1 w-1 bg-slate-300 rounded-full" />
          </span>
          <span className="text-center text-[8px] leading-tight">Projected<br />Run Rate</span>
        </div>
      </div>
    </div>
  );
}
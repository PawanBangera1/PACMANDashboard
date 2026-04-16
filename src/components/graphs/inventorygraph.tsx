import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export type InventoryDetailApiRow = {
  date: string;
  max: number;
  mid: number;
  min: number;
};

const createOptions = (detail: boolean): ChartOptions<'line'> => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: {
      grid: {
        color: '#e5e7eb',
      },
      ticks: {
        color: '#6b7280',
        font: { size: detail ? 12 : 9 },
      },
    },
    y: {
      min: 0,
      max: 1100,
      ticks: {
        stepSize: 200,
        color: '#6b7280',
        font: { size: detail ? 12 : 11 },
      },
      title: {
        display: true,
        text: 'INSTANCES',
        color: '#6b7280',
        font: { size: detail ? 9 : 9, weight: 'bold' },
      },
      grid: {
        color: '#e5e7eb',
      },
    },
  },
});

type InventoryGraphProps = {
  detail?: boolean;
  rows?: InventoryDetailApiRow[];
};

const buildInventoryChartData = (
  rows: InventoryDetailApiRow[],
  detail: boolean
): ChartData<'line', number[], string> => {
  const series = detail ? rows : rows.slice(0, 5);

  return {
    labels: series.map((item) => item.date),
    datasets: [
      {
        label: 'Max Instances',
        data: series.map((item) => item.max),
        borderColor: '#0ea5e9',
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.35,
      },
      {
        label: 'Mid Instances',
        data: series.map((item) => item.mid),
        borderColor: '#ec4899',
        borderDash: [3, 3],
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.35,
      },
      {
        label: 'Min Instances',
        data: series.map((item) => item.min),
        borderColor: '#2f7d70',
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.35,
      },
    ],
  };
};

export default function InventoryGraph({ detail = false, rows = [] }: InventoryGraphProps) {
  const chartData = buildInventoryChartData(rows, detail);

  return (
    <div className={`w-full bg-white px-4 py-2 md:px-6 md:py-4 ${detail ? 'md:px-10 md:py-6' : ''}`}>
      <div className={`w-full ${detail ? 'h-[250px] md:h-[250px]' : 'h-[170px] md:h-[170px]'}`}>
        <Line data={chartData} options={createOptions(detail)} />
      </div>

      <div className={`mt-4 flex items-center justify-around gap-x-6 gap-y-2 font-medium uppercase text-slate-500 ${detail ? 'text-[10px] md:text-[11px]' : 'text-[8px] md:text-[10px]'}`}>
        <div className={`flex items-center gap-2 ${detail ? 'text-[9px]' : 'text-[8px]'}`}>
          <span className="h-[2px] w-4 bg-[#0ea5e9]" />
          <span>Max <br />Instances</span>
        </div>
        <div className={`flex items-center gap-2 ${detail ? 'text-[9px]' : 'text-[8px]'}`}>
          <span className="h-[2px] w-4 border-t-2 border-dotted border-[#ec4899]" />
          <span>Mid <br />Instances</span>
        </div>
        <div className={`flex items-center gap-2 ${detail ? 'text-[9px]' : 'text-[8px]'}`}>
          <span className="h-[2px] w-4 bg-[#2f7d70]" />
          <span>Min <br />Instances</span>
        </div>
      </div>
    </div>
  );
}

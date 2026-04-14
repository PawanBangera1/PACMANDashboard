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

export const inventoryDetailSeries = [
  { date: 'AUG 02', max: 360, mid: 300, min: 240 },
  { date: 'AUG 03', max: 470, mid: 360, min: 230 },
  { date: 'AUG 04', max: 940, mid: 730, min: 245 },
  { date: 'AUG 05', max: 520, mid: 430, min: 225 },
  { date: 'AUG 06', max: 470, mid: 410, min: 265 },
  { date: 'AUG 07', max: 660, mid: 450, min: 250 },
  { date: 'AUG 08', max: 510, mid: 360, min: 230 },
  { date: 'AUG 09', max: 480, mid: 350, min: 245 },
  { date: 'AUG 10', max: 1020, mid: 730, min: 225 },
  { date: 'AUG 11', max: 930, mid: 540, min: 270 },
  { date: 'AUG 12', max: 880, mid: 410, min: 260 },
  { date: 'AUG 13', max: 940, mid: 560, min: 350 },
  { date: 'AUG 14', max: 940, mid: 680, min: 580 },
  { date: 'AUG 15', max: 1010, mid: 940, min: 830 },
] as const;

const compactSeries = inventoryDetailSeries.slice(0, 5);

const labels = compactSeries.map((item) => item.date);
const detailLabels = inventoryDetailSeries.map((item) => item.date);

const data: ChartData<'line', number[], string> = {
  labels,
  datasets: [
    {
      label: 'Max Instances',
      data: compactSeries.map((item) => item.max),
      borderColor: '#0ea5e9',
      pointRadius: 0,
      borderWidth: 2,
      tension: 0.35,
    },
    {
      label: 'Mid Instances',
      data: compactSeries.map((item) => item.mid),
      borderColor: '#ec4899',
      borderDash: [3, 3],
      pointRadius: 0,
      borderWidth: 2,
      tension: 0.35,
    },
    {
      label: 'Min Instances',
      data: compactSeries.map((item) => item.min),
      borderColor: '#2f7d70',
      pointRadius: 0,
      borderWidth: 2,
      tension: 0.35,
    },
  ],
};

const detailData: ChartData<'line', number[], string> = {
  labels: detailLabels,
  datasets: [
    {
      label: 'Max Instances',
      data: inventoryDetailSeries.map((item) => item.max),
      borderColor: '#0ea5e9',
      pointRadius: 0,
      borderWidth: 2,
      tension: 0.35,
    },
    {
      label: 'Mid Instances',
      data: inventoryDetailSeries.map((item) => item.mid),
      borderColor: '#ec4899',
      borderDash: [3, 3],
      pointRadius: 0,
      borderWidth: 2,
      tension: 0.35,
    },
    {
      label: 'Min Instances',
      data: inventoryDetailSeries.map((item) => item.min),
      borderColor: '#2f7d70',
      pointRadius: 0,
      borderWidth: 2,
      tension: 0.35,
    },
  ],
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
};

export default function InventoryGraph({ detail = false }: InventoryGraphProps) {
  const chartData = detail ? detailData : data;

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

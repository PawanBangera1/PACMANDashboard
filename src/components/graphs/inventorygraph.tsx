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

const labels = ['AUG 02', 'AUG 03', 'AUG 04', 'AUG 05', 'AUG 06'];

const data: ChartData<'line', number[], string> = {
  labels,
  datasets: [
    {
      label: 'Max Instances',
      data: [400, 740, 1000, 520, 700],
      borderColor: '#0ea5e9',
      pointRadius: 0,
      borderWidth: 2,
      tension: 0.35,
    },
    {
      label: 'Mid Instances',
      data: [340, 560, 820, 470, 510],
      borderColor: '#ec4899',
      borderDash: [3, 3],
      pointRadius: 0,
      borderWidth: 2,
      tension: 0.35,
    },
    {
      label: 'Min Instances',
      data: [260, 250, 270, 250, 290],
      borderColor: '#2f7d70',
      pointRadius: 0,
      borderWidth: 2,
      tension: 0.35,
    },
  ],
};

const options: ChartOptions<'line'> = {
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
        font: { size: 9 },
      },
    },
    y: {
      min: 0,
      max: 1000,
      ticks: {
        stepSize: 200,
        color: '#6b7280',
      },
      title: {
        display: true,
        text: 'INSTANCES',
        color: '#6b7280',
        font: { size: 10, weight: 'bold' },
      },
      grid: {
        color: '#e5e7eb',
      },
    },
  },
};

export default function InventoryGraph() {
  return (
    <div className="w-full bg-white px-4 py-2 md:px-6 md:py-4">
      <div className="h-[170px] w-full md:h-[170px]">
        <Line data={data} options={options} />
      </div>

      <div className="mt-4 flex  items-center justify-center gap-x-6 gap-y-2 text-[8px] font-medium uppercase text-slate-500 md:text-[10px]">
        <div className="flex items-center gap-2 text-[8px] ">
          <span className="h-[2px] w-4 bg-[#0ea5e9]" />
          <span>Max <br />Instances</span>
        </div>
        <div className="flex items-center gap-2 text-[8px] ">
          <span className="h-[2px] w-4 border-t-2 border-dotted border-[#ec4899]" />
          <span>Mid <br />Instances</span>
        </div>
        <div className="flex items-center gap-2 text-[8px] ">
          <span className="h-[2px] w-4 bg-[#2f7d70]" />
          <span>Min <br />Instances</span>
        </div>
      </div>
    </div>
  );
}

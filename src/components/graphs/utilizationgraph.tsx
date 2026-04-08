import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Cloud } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const chartOptions = (min: number, max: number) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: {
    x: { display: false },
    y: {
      min,
      max,
      grid: { display: true, drawTicks: false, color: '#f0f0f0' },
      border: { display: false },
      ticks: { display: false },
    },
  },
  elements: {
    point: { radius: 0 },
    line: { tension: 0.3, borderWidth: 2 },
  },
});

const seriesRows = [
  {
    label: 'CPU',
    ticks: ['20%', '10%', '0%'],
    limits: [0, 20],
    datasets: [{ borderColor: '#ec148f', data: [10, 10, 8, 9, 11, 10, 8, 10, 11, 12, 10, 9, 11, 13] }],
  },
  {
    label: 'I/O',
    ticks: ['400 kb/s', '200 kb/s', '0 kb/s'],
    limits: [0, 400],
    datasets: [
      { borderColor: '#86b93b', data: [160, 180, 140, 190, 150, 170, 140, 180, 150, 170, 130] },
      { borderColor: '#8f5aff', data: [120, 140, 130, 150, 120, 140, 160, 140, 130, 150, 140] },
    ],
  },
  {
    label: 'DISK',
    ticks: ['100 MB', '50 MB', '0 MB'],
    limits: [0, 100],
    datasets: [
      { borderColor: '#e79214', data: [52, 50, 53, 55, 51, 54, 52, 50, 53, 55, 51, 54] },
      { borderColor: '#1492bb', data: [24, 26, 25, 24, 27, 30, 24, 26, 25, 24, 27, 30] },
    ],
  },
];

export default function UtilizationGraph() {
  return (
    <div className="w-full bg-white px-2 py-1 md:px-4 md:py-2">
      <div className="space-y-1 md:space-y-2">
        {seriesRows.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <div className="flex w-14 flex-col justify-between text-right text-[9px] text-gray-400 md:w-16 md:text-[10px]">
              <span>{row.ticks[0]}</span>
              <span>{row.ticks[1]}</span>
              <span className="border-b border-gray-300 pb-1">{row.ticks[2]}</span>
            </div>

            <div className="relative h-full flex-1">
              <Line
                options={chartOptions(row.limits[0], row.limits[1]) as any}
                data={{
                  labels: new Array(row.datasets[0].data.length).fill(''),
                  datasets: row.datasets,
                }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
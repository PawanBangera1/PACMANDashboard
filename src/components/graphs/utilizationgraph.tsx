import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, CartesianGrid } from 'recharts';

// Mock data to simulate the waves in your image
export const utilizationDetailSeries = [
  { cpu: 10, io1: 160, io2: 100, disk1: 52, disk2: 24 },
  { cpu: 12, io1: 180, io2: 120, disk1: 50, disk2: 26 },
  { cpu: 9,  io1: 140, io2: 130, disk1: 53, disk2: 25 },
  { cpu: 11, io1: 190, io2: 150, disk1: 55, disk2: 24 },
  { cpu: 15, io1: 150, io2: 120, disk1: 51, disk2: 27 },
  { cpu: 10, io1: 170, io2: 140, disk1: 54, disk2: 30 },
  { cpu: 13, io1: 140, io2: 160, disk1: 52, disk2: 24 },
  { cpu: 11, io1: 180, io2: 140, disk1: 50, disk2: 26 },
  { cpu: 14, io1: 150, io2: 110, disk1: 53, disk2: 25 },
];

type UtilizationGraphProps = {
  detail?: boolean;
};

const UtilizationGraph = ({ detail = false }: UtilizationGraphProps) => {
  const chartHeight = detail ? 84 : 70;

  return (
    <div className="flex flex-col h-full px-6 pt-4 pb-4 bg-white">
      
      <div className="flex items-start gap-4 h-[40px]">
        <div className="flex flex-col justify-between text-[10px] text-gray-400 h-[65px] mt-5 w-12 text-right">
          <span>20%</span>
          <span>10%</span>
          <span>0%</span>
        </div>
        <div className="flex-1 relative">
          <p className="text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest absolute -left-1">CPU</p>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={utilizationDetailSeries} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <YAxis hide domain={[0, 20]} />
              <XAxis hide axisLine={{ stroke: '#ccc' }} />
              <Line type="linear" dataKey="cpu" stroke="#E91E63" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex items-start gap-4 h-[50px] mt-6">
        <div className="flex flex-col justify-between text-[10px] text-gray-400 h-[65px] mt-5 w-12 text-right">
          <span>400 kb/s</span>
          <span>200 kb/s</span>
          <span>0 kb/s</span>
        </div>
        <div className="flex-1 relative">
          <p className="text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest absolute -left-1 text-xs">I/O</p>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={utilizationDetailSeries} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <YAxis hide domain={[0, 400]} />
              <XAxis hide axisLine={{ stroke: '#ccc' }} />
              <Line type="linear" dataKey="io1" stroke="#8BC34A" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" dot={false} isAnimationActive={false} />
              <Line type="linear" dataKey="io2" stroke="#9C27B0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex items-start gap-4 h-[50px] mt-6">
        <div className="flex flex-col justify-between text-[10px] text-gray-400 h-[65px] mt-5 w-12 text-right">
          <span>100 MB</span>
          <span>50 MB</span>
          <span>0 MB</span>
        </div>
        <div className="flex-1 relative">
          <p className="text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest absolute -left-1">DISK</p>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={utilizationDetailSeries} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <YAxis hide domain={[0, 100]} />
              <XAxis hide axisLine={{ stroke: '#ccc' }} />
              <Line type="linear" dataKey="disk1" stroke="#FF9800" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" dot={false} isAnimationActive={false} />
              <Line type="linear" dataKey="disk2" stroke="#0288D1" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default UtilizationGraph;
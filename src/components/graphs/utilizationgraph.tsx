import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, CartesianGrid } from 'recharts';

export const utilizationDetailSeries = [
  { cpu: 10, io1: 160, io2: 100, disk1: 52, disk2: 24 },
  { cpu: 12, io1: 180, io2: 120, disk1: 50, disk2: 26 },
  { cpu: 8,  io1: 140, io2: 130, disk1: 53, disk2: 25 },
  { cpu: 11, io1: 190, io2: 150, disk1: 55, disk2: 24 },
  { cpu: 9,  io1: 130, io2: 110, disk1: 50, disk2: 28 },
  { cpu: 14, io1: 170, io2: 140, disk1: 54, disk2: 30 },
  { cpu: 11, io1: 140, io2: 160, disk1: 52, disk2: 24 },
  { cpu: 10, io1: 180, io2: 140, disk1: 50, disk2: 26 },
  { cpu: 13, io1: 150, io2: 110, disk1: 53, disk2: 25 },
  { cpu: 10, io1: 160, io2: 130, disk1: 51, disk2: 28 },
  { cpu: 12, io1: 120, io2: 150, disk1: 52, disk2: 24 },
  { cpu: 15, io1: 180, io2: 110, disk1: 56, disk2: 29 },
  { cpu: 10, io1: 140, io2: 130, disk1: 52, disk2: 25 },
  { cpu: 11, io1: 190, io2: 150, disk1: 55, disk2: 24 },
  { cpu: 8,  io1: 120, io2: 120, disk1: 51, disk2: 27 },
  { cpu: 14, io1: 170, io2: 140, disk1: 54, disk2: 30 },
  { cpu: 10, io1: 140, io2: 160, disk1: 52, disk2: 24 },
  { cpu: 9,  io1: 180, io2: 140, disk1: 50, disk2: 26 },
  { cpu: 11, io1: 150, io2: 110, disk1: 53, disk2: 25 },
  { cpu: 13, io1: 160, io2: 130, disk1: 51, disk2: 28 },
  { cpu: 10, io1: 160, io2: 100, disk1: 52, disk2: 24 },
  { cpu: 12, io1: 180, io2: 120, disk1: 50, disk2: 26 },
  { cpu: 8,  io1: 140, io2: 130, disk1: 53, disk2: 25 },
  { cpu: 11, io1: 190, io2: 150, disk1: 55, disk2: 24 },
  { cpu: 9,  io1: 130, io2: 110, disk1: 50, disk2: 28 },
  { cpu: 14, io1: 170, io2: 140, disk1: 54, disk2: 30 },
  { cpu: 11, io1: 140, io2: 160, disk1: 52, disk2: 24 },
  { cpu: 10, io1: 180, io2: 140, disk1: 50, disk2: 26 },
  { cpu: 13, io1: 150, io2: 110, disk1: 53, disk2: 25 },
  { cpu: 10, io1: 160, io2: 130, disk1: 51, disk2: 28 },
  { cpu: 8,  io1: 130, io2: 170, disk1: 50, disk2: 22 },
  { cpu: 11, io1: 160, io2: 140, disk1: 55, disk2: 28 },
  { cpu: 10, io1: 190, io2: 150, disk1: 53, disk2: 24 },
  { cpu: 14, io1: 150, io2: 120, disk1: 51, disk2: 27 },
  { cpu: 12, io1: 170, io2: 140, disk1: 54, disk2: 30 },
  { cpu: 11, io1: 140, io2: 160, disk1: 52, disk2: 24 },
  { cpu: 10, io1: 180, io2: 140, disk1: 50, disk2: 26 },
  { cpu: 8,  io1: 150, io2: 110, disk1: 53, disk2: 25 },
  { cpu: 12, io1: 160, io2: 130, disk1: 51, disk2: 28 },
  { cpu: 14, io1: 180, io2: 150, disk1: 54, disk2: 31 },
];

const UtilizationGraph = ({ detail = false }) => {
  const chartHeight = detail ? 84 : 52;
  const rowOffsetClass = detail ? 'mt-10' : 'mt-4';
  const firstRowOffsetClass = detail ? 'mt-2' : 'mt-1';
  const axisLabelClass = detail ? 'h-[65px] mt-5' : 'h-[48px] mt-2';

  return (
    <div className={`flex flex-col gap-2 h-full bg-white ${detail ? 'px-6 pt-4 pb-4' : 'px-3 pt-2 pb-2'}`}>
      <div className={`flex items-start gap-4 ${firstRowOffsetClass}`}>
        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest self-center -rotate-90 whitespace-nowrap">CPU</p>
        <div className={`flex flex-col justify-between text-[8px] text-gray-400 w-12 text-right ${axisLabelClass}`}>
          <span>20% </span>
          <span>10% </span>
          <span>0%</span>
        </div>
        <div className="flex-1 relative">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart data={utilizationDetailSeries} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E91E63" stopOpacity={0}/>
                  <stop offset="95%" stopColor="#E91E63" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <YAxis hide domain={[5, 10]} />
              <XAxis hide />
              <Area type="linear" dataKey="cpu" stroke="#E91E63" strokeWidth={2} fill="url(#colorCpu)" isAnimationActive={false} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`flex items-start gap-4 ${rowOffsetClass}`}>
        <p className="text-[8px] flex justify-center items-center font-bold text-gray-500 uppercase tracking-widest self-center -rotate-90 whitespace-nowrap">I/O</p>
        <div className={`flex flex-col justify-between text-[8px] text-gray-400 w-12 text-right ${axisLabelClass}`}>
          <span>400 kb/s</span>
          <span>200 kb/s</span>
          <span>0 kb/s</span>
        </div>
        <div className="flex-1 relative">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart data={utilizationDetailSeries} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="colorIo1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8BC34A" stopOpacity={0}/>
                  <stop offset="95%" stopColor="#8BC34A" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorIo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9C27B0" stopOpacity={0}/>
                  <stop offset="95%" stopColor="#9C27B0" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <YAxis hide domain={[0, 100]} />
              <XAxis hide />
              <Area type="linear" dataKey="io1" stroke="#8BC34A" strokeWidth={1.5} fill="url(#colorIo1)" isAnimationActive={false} dot={false} />
              <Area type="linear" dataKey="io2" stroke="#9C27B0" strokeWidth={1.5} fill="url(#colorIo2)" isAnimationActive={false} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DISK Hill Chart */}
      <div className={`flex items-start gap-4 ${rowOffsetClass}`}>
        <p className="text-[8px] flex justify-center items-center font-bold text-gray-500 uppercase tracking-widest self-center -rotate-90 whitespace-nowrap">DISK</p>
        <div className={`flex flex-col justify-between text-[8px] text-gray-400 w-12 text-right ${axisLabelClass}`}>
          <span>100 MB</span>
          <span>50 MB</span>
          <span>0 MB</span>
        </div>
        <div className="flex-1 relative">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart data={utilizationDetailSeries} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="colorDisk1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF9800" stopOpacity={0}/>
                  <stop offset="95%" stopColor="#FF9800" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDisk2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0288D1" stopOpacity={0}/>
                  <stop offset="95%" stopColor="#0288D1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <YAxis hide domain={[0, 10]} />
              <XAxis hide />
              <Area type="linear" dataKey="disk1" stroke="#FF9800" strokeWidth={1.5} fill="url(#colorDisk1)" isAnimationActive={false} dot={false} />
              <Area type="linear" dataKey="disk2" stroke="#0288D1" strokeWidth={1.5} fill="url(#colorDisk2)" isAnimationActive={false} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default UtilizationGraph;
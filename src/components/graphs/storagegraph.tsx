import React from 'react';

type StorageItem = {
  label: string;
  value: string;
  percent: number;
  panelBg: string;
  labelColor: string;
  stripColor: string;
  flexGrow: number;
};

export const storageDetailSeries: StorageItem[] = [
  {
    label: 'EBS',
    value: '1.25PB',
    percent: 30.12,
    panelBg: '#FDECEF',
    labelColor: '#ea5c80',
    stripColor: '#ea5c80',
    flexGrow: 1.25,
  },
  {
    label: 'S3',
    value: '1.5PB',
    percent: 36.14,
    panelBg: '#E9F4F7',
    labelColor: '#72b4c5',
    stripColor: '#72b4c5',
    flexGrow: 1.5,
  },
  {
    label: 'GLACIER',
    value: '0.75PB',
    percent: 18.07,
    panelBg: '#F9F3D9',
    labelColor: '#d3aa00',
    stripColor: '#d3aa00',
    flexGrow: 0.75,
  },
  {
    label: 'OTHER',
    value: '0.65PB',
    percent: 15.66,
    panelBg: '#EDF0DB',
    labelColor: '#90a00d',
    stripColor: '#90a00d',
    flexGrow: 0.65,
  },
];

type StorageGraphProps = {
  detail?: boolean;
};

export default function StorageGraph({ detail = false }: StorageGraphProps) {
  const items = storageDetailSeries;

  return (
    <div className={`w-full bg-white ${detail ? 'px-10' : 'px-8'}`}>
      <div className="flex w-full items-end">
        {items.map((item, index) => (
          <div 
            key={item.label} 
            className="flex flex-col"
            style={{ flex: item.flexGrow }}
          >
            <div
              className={`mb-2 text-center uppercase tracking-wider ${detail ? 'text-xs' : 'text-xs'}`}
              style={{ color: item.labelColor, paddingLeft: index === 0 ? '0' : '8px' }}
            >
              {item.label}
              {detail ? <div>{item.percent.toFixed(2)}%</div> : null}
            </div>

            <div
              className={`relative border-l ${detail ? 'h-72' : 'h-44'}`}
              style={{
                backgroundColor: item.panelBg,
                borderLeftColor: item.stripColor,
                borderRight: index === items.length - 1 ? `1px solid ${item.stripColor}` : 'none'
              }}
            >
              <div
                className={`absolute bottom-0 left-0 w-full ${detail ? 'h-5' : 'h-4'}`}
                style={{ backgroundColor: item.stripColor }}
              />
              
              <div 
                className="absolute -bottom-4 left-0 h-4 w-[1px]" 
                style={{ backgroundColor: item.stripColor }}
              />
              {index === items.length - 1 && (
                 <div 
                 className="absolute -bottom-4 right-0 h-4 w-[1px]" 
                 style={{ backgroundColor: item.stripColor }}
               />
              )}
            </div>

            <div className={`mt-6 text-center font-medium text-gray-500 ${detail ? 'text-xs' : 'text-xs'}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
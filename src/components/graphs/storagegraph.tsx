import React from 'react';

type StorageItem = {
  label: string;
  value: string;
  panelBg: string;
  labelColor: string;
  stripColor: string;
  flexGrow: number;
};

const items: StorageItem[] = [
  {
    label: 'EBS',
    value: '1.25PB',
    panelBg: '#FDECEF',
    labelColor: '#ea5c80',
    stripColor: '#ea5c80',
    flexGrow: 1.25,
  },
  {
    label: 'S3',
    value: '1.5PB',
    panelBg: '#E9F4F7',
    labelColor: '#72b4c5',
    stripColor: '#72b4c5',
    flexGrow: 1.5,
  },
  {
    label: 'GLACIER',
    value: '0.75PB',
    panelBg: '#F9F3D9',
    labelColor: '#d3aa00',
    stripColor: '#d3aa00',
    flexGrow: 0.75,
  },
  {
    label: 'OTHER',
    value: '0.65PB',
    panelBg: '#EDF0DB',
    labelColor: '#90a00d',
    stripColor: '#90a00d',
    flexGrow: 0.65,
  },
];

export default function StorageGraph() {
  return (
    <div className="w-full bg-white px-8">
      <div className="flex w-full items-end">
        {items.map((item, index) => (
          <div 
            key={item.label} 
            className="flex flex-col"
            style={{ flex: item.flexGrow }}
          >
            <div
              className="mb-2 text-[10px] font-bold uppercase tracking-wider"
              style={{ color: item.labelColor, paddingLeft: index === 0 ? '0' : '8px' }}
            >
              {item.label}
            </div>

            <div
              className="relative h-44 border-l"
              style={{
                backgroundColor: item.panelBg,
                borderLeftColor: item.stripColor,
                borderRight: index === items.length - 1 ? `1px solid ${item.stripColor}` : 'none'
              }}
            >
              <div
                className="absolute bottom-0 left-0 h-4 w-full"
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

            <div className="mt-6 text-center text-[12px] font-medium text-gray-500">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
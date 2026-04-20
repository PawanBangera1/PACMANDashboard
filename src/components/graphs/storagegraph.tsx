import React from 'react';

import type { StorageDetailApiRow } from '../../types/dashboard.types';

type StorageItem = {
  label: string;
  value: string;
  percent: number;
  panelBg: string;
  labelColor: string;
  stripColor: string;
  flexGrow: number;
};

const livePalette = [
  { panelBg: '#FDECEF', labelColor: '#ea5c80', stripColor: '#ea5c80' },
  { panelBg: '#E9F4F7', labelColor: '#72b4c5', stripColor: '#72b4c5' },
  { panelBg: '#F9F3D9', labelColor: '#d3aa00', stripColor: '#d3aa00' },
  { panelBg: '#EDF0DB', labelColor: '#90a00d', stripColor: '#90a00d' },
];

type StorageGraphProps = {
  detail?: boolean;
  rows?: StorageDetailApiRow[];
};

export default function StorageGraph({ detail = false, rows }: StorageGraphProps) {
  const items = rows?.length
    ? rows.map((row, index) => {
        const palette = livePalette[index % livePalette.length];

        return {
          label: row.label,
          value: row.value,
          percent: row.percent,
          panelBg: palette.panelBg,
          labelColor: palette.labelColor,
          stripColor: palette.stripColor,
          flexGrow: Math.max(row.percent / 20, 0.5),
        } satisfies StorageItem;
      })
    : [];

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
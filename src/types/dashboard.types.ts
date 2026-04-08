import type { ReactNode } from 'react';

export type CardId = 'cost' | 'inventory' | 'compliance' | 'monitoring' | 'utilization' | 'storage';

export type SubGridItem = {
  val: string;
  label: string;
};

export type CardConfig = {
  id: CardId;
  title: string;
  icon: ReactNode;
  mainVal: string;
  subLabel: string;
  subGrid?: SubGridItem[];
};

export type CostDetailRow = {
  label1: string;
  number: string;
  date: string;
  label4: string;
  label5: string;
  label6: string;
  label7: string;
};

export type InventoryDetailRow = {
  label1: string;
  number: string;
  date: string;
  label4: string;
  label5: string;
  label6: string;
  label7: string;
};

export type StorageDetailRow = {
  label1: string;
  number: string;
  date: string;
  label4: string;
  label5: string;
  label6: string;
  label7: string;
};

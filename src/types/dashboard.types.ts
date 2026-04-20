import type { ReactNode } from 'react';

export type CardId = string;

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
  detailPath?: string;
  subGrid?: SubGridItem[];
};

export type CostDetailRow = {
  label1: string;
  number: string;
  date: string;
  label4: string;
  label5: string;
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

export type ComplianceDetailRow = {
  label1: string;
  number: string;
  date: string;
  label4: string;
  label5: string;
  label6: string;
  label7: string;
};

export type UtilizationDetailRow = {
  label1: string;
  number: string;
  date: string;
  label4: string;
  label5: string;
  label6: string;
  label7: string;
};

export type ComplianceDetailApiRow = {
  control: string;
  compliance: string;
  nonCompliance: string;
  severity: string;
  owner: string;
  lastAudit: string;
  status: string;
};

export type UtilizationDetailApiRow = {
  cpu: number;
  io1: number;
  io2: number;
  disk1: number;
  disk2: number;
};

export type StorageDetailApiRow = {
  label: string;
  value: string;
  percent: number;
  trend: string;
  health: string;
  region: string;
};

export type MonitoringDetailApiPanel = {
  id: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  requests: string;
  users: string;
  network: string;
  latency: string;
};

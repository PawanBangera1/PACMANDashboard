export const fetchCostDetail = async () => {
  const response = await fetch('/api/v1/dashboard/cost');

  if (!response.ok) {
    throw new Error('Failed to load cost detail data');
  }

  return response.json();
};

export const fetchDashboardOverview = async () => {
  const response = await fetch('/api/v1/dashboard/');

  if (!response.ok) {
    throw new Error('Failed to load dashboard overview');
  }

  return response.json();
};

export const fetchInventoryDetail = async () => {
  const response = await fetch('/api/v1/dashboard/inventory');

  if (!response.ok) {
    throw new Error('Failed to load inventory detail data');
  }

  return response.json();
};

export const fetchMonitoringDetail = async () => {
  const response = await fetch('/api/v1/dashboard/monitoring');

  if (!response.ok) {
    throw new Error('Failed to load monitoring detail data');
  }

  return response.json();
};

export const fetchComplianceDetail = async () => {
  const response = await fetch('/api/v1/dashboard/compliance');

  if (!response.ok) {
    throw new Error('Failed to load compliance detail data');
  }

  return response.json();
};

export const fetchUtilizationDetail = async () => {
  const response = await fetch('/api/v1/dashboard/utilization');

  if (!response.ok) {
    throw new Error('Failed to load utilization detail data');
  }

  return response.json();
};

export const fetchStorageDetail = async () => {
  const response = await fetch('/api/v1/dashboard/storage');

  if (!response.ok) {
    throw new Error('Failed to load storage detail data');
  }

  return response.json();
};

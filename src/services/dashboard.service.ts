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

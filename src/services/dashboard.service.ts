export const fetchCostDetail = async () => {
  const response = await fetch('/api/dashboard/cost');

  if (!response.ok) {
    throw new Error('Failed to load cost detail data');
  }

  return response.json();
};

export const fetchDashboardOverview = async () => {
  const response = await fetch('/api/dashboard/');

  if (!response.ok) {
    throw new Error('Failed to load dashboard overview');
  }

  return response.json();
};

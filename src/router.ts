import { createElement, Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const App = lazy(() => import("./App"));
const DashboardCard = lazy(() => import("./components/dashboard/dashboardcard"));
const CostDetailPage = lazy(() => import("./components/detailedOverview/costdetailpage"));
const InventoryDetailPage = lazy(() => import("./components/detailedOverview/inventorydetailpage"));
const MonitoringDetailPage = lazy(() => import("./components/detailedOverview/monitoringdetailpage"));
const StorageDetailPage = lazy(() => import("./components/detailedOverview/storagedetailpage"));
const ComplianceDetailPage = lazy(() => import("./components/detailedOverview/compliancedetailpage"));
const UtilizationDetailPage = lazy(() => import("./components/detailedOverview/utilizationdetailpage"));

const withSuspense = (Component: any) =>
  createElement(Suspense, 
    { fallback: createElement("div", { className: "px-16 py-10 text-white/80" }, "Loading...") },
    createElement(Component)
  );

const notFoundElement = createElement("main", 
  { className: "flex min-h-screen items-center justify-center text-white" },
  createElement("p", { className: "text-lg" }, "Page not found.")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(Navigate, { to: "/home/dashboard", replace: true }),
  },
  {
    element: withSuspense(App),
    children: [
      {
        path: "/home/dashboard",
        element: withSuspense(DashboardCard),
      },
      {
        path: "/dashbord",
        element: withSuspense(DashboardCard),
      },
      {
        path: "/dashbord/cost",
        element: withSuspense(CostDetailPage),
      },
      {
        path: "/dashbord/code",
        element: withSuspense(CostDetailPage),
      },
      {
        path: "/dashbord/inventory",
        element: withSuspense(InventoryDetailPage),
      },
      {
        path: "/dashbord/monitoring",
        element: withSuspense(MonitoringDetailPage),
      },
      {
        path: "/dashbord/storage",
        element: withSuspense(StorageDetailPage),
      },
      {
        path: "/dashbord/compliance",
        element: withSuspense(ComplianceDetailPage),
      },
      {
        path: "/dashbord/utilization",
        element: withSuspense(UtilizationDetailPage),
      },
    ],
  },
  {
    path: "*",
    element: notFoundElement,
  },
]);

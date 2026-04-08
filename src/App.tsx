import Navbar from "./components/layout/navbar";
import DashboardCard from "./components/dashboard/dashboardcard";
import CostDetailPage from "./components/detailedOverview/costdetailpage";
import InventoryDetailPage from "./components/detailedOverview/inventorydetailpage";
import MonitoringDetailPage from "./components/detailedOverview/monitoringdetailpage";
import StorageDetailPage from "./components/detailedOverview/storagedetailpage";

const pacmanBg = new URL("./assets/pacman_bg.jpg", import.meta.url).href;

export default function App() {
  if (window.location.pathname === "/") {
    window.history.replaceState({}, "", "/home/dashboard");
  }

  if (window.location.pathname === "/dashbord") {
    return (
      <main
        className="min-h-screen bg-slate-950 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.62), rgba(15, 23, 42, 0.62)), url(${pacmanBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Navbar />
        <DashboardCard />
      </main>
    );
  }

  if (window.location.pathname === "/dashbord/code") {
    return (
      <main
        className="min-h-screen bg-slate-950 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.62), rgba(15, 23, 42, 0.62)), url(${pacmanBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Navbar />
        <CostDetailPage />
      </main>
    );
  }

  if (window.location.pathname === "/dashbord/inventory") {
    return (
      <main
        className="min-h-screen bg-slate-950 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.62), rgba(15, 23, 42, 0.62)), url(${pacmanBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Navbar />
        <InventoryDetailPage />
      </main>
    );
  }

  if (window.location.pathname === "/dashbord/monitoring") {
    return (
      <main
        className="min-h-screen bg-slate-950 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.62), rgba(15, 23, 42, 0.62)), url(${pacmanBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Navbar />
        <MonitoringDetailPage />
      </main>
    );
  }

  if (window.location.pathname === "/dashbord/storage") {
    return (
      <main
        className="min-h-screen bg-slate-950 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.62), rgba(15, 23, 42, 0.62)), url(${pacmanBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Navbar />
        <StorageDetailPage />
      </main>
    );
  }

  if (window.location.pathname !== "/home/dashboard") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-lg">Page not found.</p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-slate-950 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.62), rgba(15, 23, 42, 0.62)), url(${pacmanBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Navbar />
      <DashboardCard />
    </main>
  );
}
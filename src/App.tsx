import { useEffect, useState } from "react";
import Navbar from "./components/layout/navbar";
import DashboardCard from "./components/dashboard/dasboardcard";

const pacmanBg = new URL("./assets/pacman_bg.jpg", import.meta.url).href;

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.history.replaceState({}, "", "/home/dashboard");
      setPathname("/home/dashboard");
    }

    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  if (pathname !== "/home/dashboard") {
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
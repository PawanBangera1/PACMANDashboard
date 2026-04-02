import Navbar from "./components/layout/navbar";

const pacmanBg = new URL("./assets/pacman_bg.jpg", import.meta.url).href;

export default function App() {
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
    </main>
  );
}
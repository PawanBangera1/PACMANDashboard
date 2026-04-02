import pacmanBg from "@/assets/pacman_bg.jpg";

export default function App() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: `url(${pacmanBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    />
  );
}
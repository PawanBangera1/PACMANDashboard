import { Bell, Menu, CircleUser } from "lucide-react";

const logoPacMan = new URL("../../assets/logo_pacman.svg", import.meta.url).href;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/20 bg-black/40 backdrop-blur-sm">
      <div className="mx-auto flex h-18 max-w-screen-2xl items-center justify-between gap-4 px-6 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Open navigation menu"
          className="inline-flex h-10 w-10 items-center justify-center"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <img src={logoPacMan} alt="Pacman Icon" className="h-12 w-12 rounded-full align-middle" />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex h-10 w-10 items-center justify-center "
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#ed0295]" />
          </button>
          <button
            type="button"
            aria-label="User profile"
            className="inline-flex h-10 w-10 items-center justify-center"
          >
              <CircleUser className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

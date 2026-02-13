import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 px-6 md:px-12 py-4 flex justify-between items-center border-b border-white/10">
      
      {/* Logo */}
      <h1 className="text-white text-2xl font-extrabold tracking-wide">
        Devojeet<span className="text-purple-400">.</span>
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-white font-medium">
        <a href="#about" className="hover:text-purple-400 transition">About</a>
        <a href="#skills" className="hover:text-purple-400 transition">Skills</a>
        <a href="#projects" className="hover:text-purple-400 transition">Projects</a>
        <a href="#certificates" className="hover:text-purple-400 transition">Certificates</a>
        <a href="#contact" className="hover:text-purple-400 transition">Contact</a>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-3">
        <ThemeToggle />

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center py-6 gap-6 text-white font-semibold md:hidden border-b border-white/10">
          <a onClick={() => setMenuOpen(false)} href="#about" className="hover:text-purple-400">About</a>
          <a onClick={() => setMenuOpen(false)} href="#skills" className="hover:text-purple-400">Skills</a>
          <a onClick={() => setMenuOpen(false)} href="#projects" className="hover:text-purple-400">Projects</a>
          <a onClick={() => setMenuOpen(false)} href="#certificates" className="hover:text-purple-400">Certificates</a>
          <a onClick={() => setMenuOpen(false)} href="#contact" className="hover:text-purple-400">Contact</a>
        </div>
      )}
    </nav>
  );
}

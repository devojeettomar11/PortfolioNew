import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Projects", link: "#projects" },
    { name: "Certificates", link: "#certificates" },
    { name: "Contact", link: "#contact" }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-black/40 backdrop-blur-lg border-b border-black/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-black dark:text-white">
          Devojeet<span className="text-purple-500">.</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-gray-700 dark:text-gray-300">
          {navLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="hover:text-purple-500 transition"
            >
              {item.name}
            </a>
          ))}

          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black dark:text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/90 dark:bg-black/80 backdrop-blur-lg border-t border-black/10 dark:border-white/10 px-6 py-6 space-y-5 text-center font-semibold text-gray-800 dark:text-gray-200">
          {navLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="block py-2 rounded-lg hover:bg-purple-500/10 hover:text-purple-500 transition"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

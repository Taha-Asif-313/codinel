import React, { useState, useEffect } from "react";
import { Box, Sparkles, Github, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/5 transition-all duration-300"
      style={{
        transform: scrollY > 100 ? "translateY(0)" : "translateY(0)",
        boxShadow:
          scrollY > 100 ? "0 4px 20px rgba(0, 194, 20, 0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <Box className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <Sparkles className="w-4 h-4 text-primary absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="text-2xl font-bold">
            Codinel
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-gray-300 font-medium">
          {["Features", "Editor", "GitHub"].map((item) => (
            <a
              key={item}
              href={
                item === "Features"
                  ? "#features"
                  : item === "Editor"
                  ? "/editor"
                  : "https://github.com/Taha-Asif-313/codinel"
              }
              target={item === "GitHub" ? "_blank" : "_self"}
              className="relative group hover:text-primary transition-colors"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-xl bg-black/90 border-t border-white/5 animate-fadeIn">
          {["Features", "Editor", "GitHub"].map((item) => (
            <a
              key={item}
              href={
                item === "Features"
                  ? "#features"
                  : item === "Editor"
                  ? "/editor"
                  : "https://github.com/Taha-Asif-313/codinel"
              }
              onClick={() => setIsOpen(false)}
              target={item === "GitHub" ? "_blank" : "_self"}
              className="block px-6 py-4 text-gray-300 hover:text-primary hover:bg-white/5 transition"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;

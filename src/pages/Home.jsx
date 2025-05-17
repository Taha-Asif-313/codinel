import React, { useState } from 'react';
import {
  FaCode,
  FaRocket,
  FaGithub,
  FaTerminal,
  FaLaptopCode
} from 'react-icons/fa';
import { IoIosBarcode } from 'react-icons/io';
import { HiMenu, HiX } from 'react-icons/hi';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-gradient-to-br from-zinc-900 via-gray-950 to-zinc-800">
      {/* Background Visuals */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-green-600 opacity-20 rounded-full blur-[150px] top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-indigo-500 opacity-20 rounded-full blur-[120px] bottom-[-100px] right-[-100px]" />
        <div className="absolute w-full h-full bg-dot-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      </div>

      {/* Navbar */}
      <header className="w-full px-5 lg:px-8 py-6 flex justify-between items-center bg-transparent relative z-50">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <IoIosBarcode className="text-green-400 text-3xl" />
          <span>Codinel</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-gray-400 font-medium">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="/editor" className="hover:text-white transition">Editor</a>
          <a href="https://github.com/Taha-Asif-313/codinel" target="_blank" className="hover:text-white transition">GitHub</a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-5 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg md:hidden">
            <a
              href="#features"
              onClick={toggleMenu}
              className="block px-4 py-3 text-gray-300 hover:bg-zinc-800 hover:text-white transition"
            >
              Features
            </a>
            <a
              href="/editor"
              onClick={toggleMenu}
              className="block px-4 py-3 text-gray-300 hover:bg-zinc-800 hover:text-white transition"
            >
              Editor
            </a>
            <a
              href="https://github.com/Taha-Asif-313/codinel"
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
              className="block px-4 py-3 text-gray-300 hover:bg-zinc-800 hover:text-white transition"
            >
              GitHub
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-5 lg:px-6 pt-20 pb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Build. Test. Deploy.
        </h1>
        <p className="text-gray-400 max-w-2xl mb-8 text-lg md:text-xl">
          Codinel is your live code playground for HTML, CSS, and JavaScript. Whether you're prototyping or learning, watch your ideas come to life in real time.
        </p>

        <div className="flex gap-6 mb-10 text-green-400 text-4xl">
          <FaCode title="Code Editor" />
          <FaRocket title="Live Preview" />
          <a href="https://github.com/Taha-Asif-313/codinel" target="_blank" rel="noopener noreferrer">
            <FaGithub title="Open Source" />
          </a>
        </div>

        <a
          href="/editor"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg transition"
        >
          Start Coding →
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Codinel Offers
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-zinc-800 p-6 rounded-lg shadow hover:shadow-xl transition">
            <FaTerminal className="text-green-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Preview</h3>
            <p className="text-gray-400">
              See your changes live as you type. No build, no delay — just code and go.
            </p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-lg shadow hover:shadow-xl transition">
            <FaLaptopCode className="text-green-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Modern Editor</h3>
            <p className="text-gray-400">
              A responsive, distraction-free editor with syntax highlighting and dark theme.
            </p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-lg shadow hover:shadow-xl transition">
            <FaGithub className="text-green-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Open Source</h3>
            <p className="text-gray-400">
              Fork it, improve it, or build your own version. Fully open and community-driven.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-sm text-gray-500 border-t border-zinc-700">
        © 2025 Codinel — Built with 💚 for developers.
      </footer>
    </div>
  );
};

export default Home;

import React from "react";
import { Box, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl lg:px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Box className="w-6 h-6 text-primary" />
          <span className="font-bold text-primary">Codinel</span>
          <span className="text-gray-500">© 2025</span>
        </div>
        <p className="text-gray-500 text-sm">
          Built with 💚 for the developer community
        </p>
        <a
          href="https://github.com/Taha-Asif-313/codinel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

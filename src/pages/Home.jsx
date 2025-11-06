import React, { useState, useEffect } from "react";
import {
  Code2,
  Zap,
  Github,
  Terminal,
  Laptop,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Play,
  Box,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: Terminal,
      title: "Live Preview",
      desc: "Watch your code come to life instantly. Real-time rendering with zero latency.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Laptop,
      title: "Smart Editor",
      desc: "Intelligent autocomplete, syntax highlighting, and error detection built-in.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Github,
      title: "Open Source",
      desc: "Community-powered and transparent. Fork, customize, and contribute freely.",
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  const techStack = [
    { name: "HTML5", color: "text-orange-400" },
    { name: "CSS3", color: "text-blue-400" },
    { name: "JavaScript", color: "text-yellow-400" },
    { name: "React", color: "text-cyan-400" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated Background */}
      <div
        className="fixed inset-0 -z-10 opacity-50 transition-transform duration-1000"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-20 animate-pulse"
          style={{ animationDelay: "700ms" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500 rounded-full blur-[120px] opacity-10 animate-pulse"
          style={{ animationDelay: "1000ms" }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(0,194,20,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,194,20,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Floating Code Snippets */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none hidden lg:block">
        <div className="absolute top-20 left-10 text-primary opacity-20 text-xs font-mono animate-float">
          {"<div className='hero' />"}
        </div>
        <div
          className="absolute top-40 right-20 text-emerald-400 opacity-20 text-xs font-mono animate-float"
          style={{ animationDelay: "1s" }}
        >
          {"const code = 'beautiful';"}
        </div>
        <div
          className="absolute bottom-40 left-20 text-teal-400 opacity-20 text-xs font-mono animate-float"
          style={{ animationDelay: "2s" }}
        >
          {".editor { display: flex; }"}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.2; }
          50% { transform: translateY(-10px); opacity: 0.4; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <main id="hero" className="relative pt-28 pb-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fadeIn">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 hover:border-primary/40 transition-colors"
                aria-label="Feature badge"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">
                  Next-Gen Code Editor
                </span>
              </div>

              {/* SEO-friendly heading */}
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-balance">
                Code. <span className="text-primary">Create.</span> Deploy.
              </h1>

              {/* Supporting paragraph with relevant keywords */}
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl">
                Experience the future of{" "}
                <strong className="text-white">web development</strong> with{" "}
                <span className="text-primary font-semibold">Codinel</span> — a
                blazing-fast, <strong>real-time code editor</strong> for{" "}
                <em>HTML</em>, <em>CSS</em>, and <em>JavaScript</em>. Build,
                test, and deploy with speed and style.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="/editor"
                  aria-label="Start coding in the editor"
                  className="group relative px-8 py-3 bg-primary rounded-xl font-bold text-lg overflow-hidden shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Coding
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>

                <a
                  href="https://github.com/Taha-Asif-313/codinel"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Codinel source code on GitHub"
                  className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-bold text-lg hover:border-primary/50 hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  View Source
                </a>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex flex-wrap gap-6 pt-4">
                {techStack.map((tech, i) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 opacity-0 animate-fadeIn"
                    style={{
                      animationDelay: `${1 + i * 0.1}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <CheckCircle2 className={`w-5 h-5 ${tech.color}`} />
                    <span className="text-sm text-gray-400">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Code Preview */}
            <div
              className="relative animate-fadeIn"
              style={{
                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                transition: "transform 0.3s ease-out",
                animationDelay: "0.4s",
              }}
            >
              <div
                role="presentation"
                className="relative p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 backdrop-blur-xl shadow-2xl hover:shadow-primary/20 transition-shadow"
              >
                {/* Window Header */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-xs text-gray-500">index.html</span>
                </div>

                {/* Simulated Code */}
                <code className="block space-y-2 text-left font-mono text-sm text-gray-200">
                  <div
                    className="opacity-0 animate-fadeIn"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <span className="text-gray-500">{"<"}</span>
                    <span className="text-pink-400">div</span>
                    <span className="text-gray-500"> className=</span>
                    <span className="text-emerald-400">"hero"</span>
                    <span className="text-gray-500">{">"}</span>
                  </div>
                  <div
                    className="opacity-0 animate-fadeIn"
                    style={{ animationDelay: "0.9s" }}
                  >
                    <span className="ml-4 text-gray-500">{"<"}</span>
                    <span className="text-pink-400">h1</span>
                    <span className="text-gray-500">{">"}</span>
                    <span className="text-primary">Build Amazing</span>
                    <span className="text-gray-500">{"</"}</span>
                    <span className="text-pink-400">h1</span>
                    <span className="text-gray-500">{">"}</span>
                  </div>
                  <div
                    className="opacity-0 animate-fadeIn"
                    style={{ animationDelay: "1.0s" }}
                  >
                    <span className="ml-4 text-gray-500">{"<"}</span>
                    <span className="text-pink-400">button</span>
                    <span className="text-gray-500">{">"}</span>
                    <span className="text-blue-400">Start Now</span>
                    <span className="text-gray-500">{"</"}</span>
                    <span className="text-pink-400">button</span>
                    <span className="text-gray-500">{">"}</span>
                  </div>
                  <div
                    className="opacity-0 animate-fadeIn"
                    style={{ animationDelay: "1.1s" }}
                  >
                    <span className="text-gray-500">{"</"}</span>
                    <span className="text-pink-400">div</span>
                    <span className="text-gray-500">{">"}</span>
                  </div>
                </code>

                {/* Play Button */}
                <div
                  className="absolute top-1/2 right-6 -translate-y-1/2 opacity-0 animate-fadeIn"
                  style={{ animationDelay: "1.5s" }}
                >
                  <button
                    aria-label="Play demo preview"
                    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/50 hover:scale-110 transition-transform"
                  >
                    <Play className="w-5 h-5 text-white fill-white" />
                  </button>
                </div>
              </div>

              {/* Decorative Glows */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "500ms" }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="relative py-24 px-6 lg:px-8 overflow-hidden"
      >
        {/* Soft Background Glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-zinc-900 to-black" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Heading */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Why Choose{" "}
              <span className="text-primary">
                Codinel
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Discover tools built to enhance productivity and creativity — for
              every developer.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10 overflow-hidden"
                >
                  {/* Card Hover Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
                  />

                  {/* Floating Accent */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />

                  {/* Icon Container */}
                  <div className="relative mb-6 flex items-center justify-center">
                    <div className="p-5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-primary/10">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl text-center font-bold mb-3 text-white group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-center leading-relaxed">
                    {feature.desc}
                  </p>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-[2px] bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500 rounded-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

   {/* CTA Section */}
<section
  id="cta"
  className="relative py-24 px-6 sm:px-8 md:px-10 overflow-hidden"
>
  {/* Subtle Background Gradient */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-zinc-900 to-black" />
  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[180px]" />
  <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[150px]" />

  <div className="max-w-5xl mx-auto relative">
    <div className="relative p-8 sm:p-10 md:p-14 rounded-3xl bg-gradient-to-br from-primary/20 via-green-500/10 to-primary/20 border border-primary/30 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(0,255,150,0.1)]">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* Content */}
      <div className="relative text-center flex flex-col items-center justify-center gap-6 sm:gap-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-2xl text-balance">
          Ready to Build Something{" "}
          <span className="text-primary">Amazing</span>?
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
          Join thousands of developers building the future of the web — fast,
          responsive, and limitless.
        </p>

        {/* CTA Button */}
        <a
          href="/editor"
          className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3 sm:py-4 bg-primary rounded-xl font-bold text-base sm:text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105"
        >
          Launch Editor
          <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </div>
    </div>
  </div>
</section>


      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;

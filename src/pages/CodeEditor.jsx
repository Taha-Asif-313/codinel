import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  Box,
  Sparkles,
  Play,
  Code2,
  Palette,
  Terminal,
  Layout,
  Eye,
  EyeOff,
  RotateCcw,
  Download,
  Moon,
  Sun,
  Copy,
  Check,
  FileCode,
  Type,
  Loader2,
  ClipboardPenLine,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router-dom";
import { useCodeAiAgent } from "../hooks/useCodeAiAgent";

const CodeEditor = () => {
  const [html, setHtml] = useState(
    `<div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-400 to-teal-500">
  <div class="text-center">
    <h1 class="text-6xl font-black text-white mb-4">
      Hello Codinel! 🚀
    </h1>
    <p class="text-xl text-white/90">Start building something amazing</p>
  </div>
</div>`
  );
  const [css, setCss] = useState(
    `/* Custom Styles */
body {
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}` // ← missing closing brace fixed
  );

  const [js, setJs] = useState(
    `// Your JavaScript code
console.log('🎉 Codinel Editor Ready!');

// Add interactivity
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded successfully!');
});`
  );
  const [srcDoc, setSrcDoc] = useState("");
  const [activeTab, setActiveTab] = useState("html");
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [layout, setLayout] = useState("horizontal");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ loading for preview
  const [isTyping, setIsTyping] = useState(false); // ✅ typing animation flag
const { generateCode, aiLoading } = useCodeAiAgent();
const [useInlineCss, setUseInlineCss] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      const combined = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;
      setSrcDoc(combined);
    }, 0);

    return () => {
      clearTimeout(timeout);
      setIsLoading(false); // ✅ properly stop loading when unmounted
    };
  }, [html, css, js]);

  const handleIframeLoad = () => {
    setTimeout(() => setIsLoading(false), 200); // ✅ stop loading after iframe loads
  };

  const openFullPreview = () => {
    const full = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(full);
      newWindow.document.close();
    } else {
      alert("Popup blocked! Please allow popups for this site.");
    }
  };

  const resetCode = () => {
    if (confirm("Reset all code to default? This action cannot be undone.")) {
      setHtml(
        '<h1 class="text-4xl font-bold text-[#00C214]">Hello World!</h1>'
      );
      setCss("h1 { text-align: center; margin-top: 2rem; }");
      setJs("console.log('Hello World!');");
    }
  };

  const downloadCode = () => {
    const blob = new Blob(
      [
        `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}<\/script>
</body>
</html>`,
      ],
      { type: "text/html" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "codinel-project.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyCode = () => {
    const currentCode =
      activeTab === "html" ? html : activeTab === "css" ? css : js;
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const replayTyping = () => {
    const currentCode = getEditorValue();
    let i = 0;
    setIsTyping(true);

    // ✅ clear based on active tab, not undefined
    setEditorValue("");

    const interval = setInterval(() => {
      setEditorValue(currentCode.slice(0, i));
      i++;
      if (i > currentCode.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 8);
  };

  const tabs = [
    { id: "html", name: "HTML", icon: Code2, color: "text-orange-400" },
    { id: "css", name: "CSS", icon: Palette, color: "text-blue-400" },
    { id: "js", name: "JavaScript", icon: Terminal, color: "text-yellow-400" },
  ];

  const getEditorValue = () => {
    switch (activeTab) {
      case "html":
        return html;
      case "css":
        return css;
      case "js":
        return js;
      default:
        return "";
    }
  };

  const setEditorValue = (value) => {
    switch (activeTab) {
      case "html":
        setHtml(value);
        break;
      case "css":
        setCss(value);
        break;
      case "js":
        setJs(value);
        break;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const value = e.target.value;
      setEditorValue(value.substring(0, start) + "  " + value.substring(end));
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`flex items-center justify-between px-4 md:px-6 py-3 border-b ${
          theme === "dark"
            ? "bg-zinc-900 border-white/10"
            : "bg-white border-gray-200"
        } backdrop-blur-xl z-50`}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <Link to={"/"} className="relative flex items-center gap-2">
            <Box className="w-6 h-6 md:w-7 md:h-7 text-[#00C214]" />
            <span className="text-lg md:text-xl font-bold">Codinel</span>
          </Link>

          <span
            className={`hidden sm:inline text-xs px-2 py-1 rounded ${
              theme === "dark"
                ? "bg-[#00C214]/10 text-[#00C214]"
                : "bg-[#00C214]/20 text-[#00C214]"
            }`}
          >
            Editor
          </span>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={replayTyping}
            disabled={isTyping || isLoading} // ✅ added isLoading
            className={`p-2 rounded-lg transition-colors flex items-center gap-1 ${
              theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100"
            } ${isTyping || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            title="Replay Typing Animation"
          >
            <ClipboardPenLine className="w-4 h-4 md:h-5 md:w-5" />
          </button>

          {/* AI Generate Button */}
<button
  onClick={async () => {
    const userPrompt = prompt("Describe what you want (e.g. 'A glassmorphic login card with Tailwind')");
    if (!userPrompt) return;

    const code = await generateCode(userPrompt, activeTab, useInlineCss);
    if (code) {
      setEditorValue(code);
    }
  }}
  disabled={aiLoading}
  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
    aiLoading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#00C214] hover:bg-[#00C214]/90 text-black font-semibold"
  }`}
  title="Generate UI using AI"
>
  {aiLoading ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>Generating...</span>
    </>
  ) : (
    <>
      <Sparkles className="w-4 h-4" />
      <span>AI UI</span>
    </>
  )}
</button>

{/* Inline CSS Toggle */}
<label className="flex items-center gap-1 ml-2 text-xs cursor-pointer select-none">
  <input
    type="checkbox"
    checked={useInlineCss}
    onChange={() => setUseInlineCss(!useInlineCss)}
  />
  <span>Inline CSS</span>
</label>


          {/* Layout Toggle - Desktop Only */}
          <button
            onClick={() =>
              setLayout(layout === "horizontal" ? "vertical" : "horizontal")
            }
            className={`p-2 rounded-lg transition-colors hidden lg:flex ${
              theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100"
            }`}
            title="Toggle Layout"
          >
            <Layout className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Preview Toggle */}
          <button
            onClick={() => setIsPreviewVisible(!isPreviewVisible)}
            className={`p-2 rounded-lg transition-colors ${
              theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100"
            }`}
            title={isPreviewVisible ? "Hide Preview" : "Show Preview"}
          >
            {isPreviewVisible ? (
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2 rounded-lg transition-colors ${
              theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100"
            }`}
            title="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <Moon className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>

          {/* Download - Hidden on Mobile */}
          <button
            onClick={downloadCode}
            className={`p-2 rounded-lg transition-colors hidden md:flex ${
              theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100"
            }`}
            title="Download Code"
          >
            <Download className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Reset - Hidden on Mobile */}
          <button
            onClick={resetCode}
            className={`p-2 rounded-lg transition-colors hidden md:flex ${
              theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100"
            }`}
            title="Reset Code"
          >
            <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Run Button */}
          <button
            onClick={openFullPreview}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[#00C214] hover:bg-[#00C214]/90 rounded-lg font-semibold transition-all shadow-lg shadow-[#00C214]/30 text-sm md:text-base"
            title="Open Full Preview"
          >
            <Play className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Run</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div
        className={`flex-1 flex ${
          layout === "vertical" ? "flex-col" : "flex-col lg:flex-row"
        } overflow-hidden`}
      >
        {/* Editor Section */}
        <div
          className={`${
            layout === "vertical"
              ? "h-1/2"
              : isPreviewVisible
              ? "h-1/2 lg:h-full lg:w-1/2"
              : "h-full w-full"
          } flex flex-col ${theme === "dark" ? "bg-zinc-900" : "bg-white"} ${
            theme === "dark"
              ? "lg:border-r border-white/10"
              : "lg:border-r border-gray-200"
          }`}
        >
          {/* Tabs */}
          <div
            className={`flex items-center gap-1 px-2 md:px-4 py-2 border-b ${
              theme === "dark"
                ? "border-white/10 bg-black/50"
                : "border-gray-200 bg-gray-50"
            } overflow-x-auto`}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm md:text-base ${
                    activeTab === tab.id
                      ? theme === "dark"
                        ? "bg-zinc-800 text-white"
                        : "bg-white text-gray-900 shadow-sm"
                      : theme === "dark"
                      ? "text-gray-400 hover:text-white hover:bg-white/5"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
                      activeTab === tab.id ? tab.color : ""
                    }`}
                  />
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.id.toUpperCase()}</span>
                </button>
              );
            })}

            {/* Copy Button */}
            <button
              onClick={copyCode}
              className={`ml-auto p-1.5 md:p-2 rounded transition-colors ${
                theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-200"
              }`}
              title="Copy Code"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#00C214]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Editor Section */}
          <div className="flex-1 overflow-hidden relative">
            <Editor
              height="100%"
              width="100%"
              language={
                activeTab === "html"
                  ? "html"
                  : activeTab === "css"
                  ? "css"
                  : "javascript"
              }
              value={getEditorValue()}
              onChange={(value) => setEditorValue(value || "")}
              theme="codinel-dark" // ✅ apply your custom theme name
              onMount={(editor, monaco) => {
                monaco.editor.defineTheme("codinel-dark", {
                  base: "vs-dark", // start from vs-dark base
                  inherit: true,
                  rules: [
                    { token: "", background: "0D0D0D", foreground: "E4E4E4" },
                    { token: "comment", foreground: "6A9955" },
                    { token: "keyword", foreground: "C586C0" },
                    { token: "string", foreground: "CE9178" },
                    { token: "number", foreground: "B5CEA8" },
                    { token: "function", foreground: "4FC1FF" },
                    { token: "type", foreground: "4EC9B0" },
                  ],
                  colors: {
                    "editor.background": "#0D0D0D", // dark background
                    "editor.foreground": "#E4E4E4",
                    "editorCursor.foreground": "#00FF99", // your brand accent
                    "editorLineNumber.foreground": "#555",
                    "editorLineNumber.activeForeground": "#00FF99",
                    "editor.selectionBackground": "#00FF9944",
                    "editor.inactiveSelectionBackground": "#00FF9922",
                  },
                });
                monaco.editor.setTheme("codinel-dark");
              }}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                smoothScrolling: true,
                fontLigatures: true,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Status Bar */}
          <div
            className={`flex items-center justify-between px-4 py-2 text-xs border-t ${
              theme === "dark"
                ? "border-white/10 bg-black/50 text-gray-400"
                : "border-gray-200 bg-gray-50 text-gray-600"
            }`}
          >
            <div className="flex items-center gap-2 md:gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#00C214] animate-pulse"></span>
                <span className="hidden sm:inline">Live Preview</span>
              </span>
              <span>{activeTab.toUpperCase()}</span>
              <span className="hidden md:inline">
                {getEditorValue().split("\n").length} lines
              </span>
            </div>
            <span className="hidden sm:inline">Ready</span>
          </div>
        </div>

        {/* Preview Section */}
        {isPreviewVisible && (
          <div
            className={`${
              layout === "vertical" ? "h-1/2" : "h-1/2 lg:h-full lg:w-1/2"
            } relative flex flex-col ${
              theme === "dark" ? "bg-zinc-800" : "bg-gray-100"
            }`}
          >
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white z-10 backdrop-blur-sm">
                <Loader2 className="w-6 h-6 mb-2 animate-spin text-[#00C214]" />
                <span className="text-sm">Rendering Preview...</span>
              </div>
            )}
            {/* Preview Header */}
            <div
              className={`flex items-center justify-between px-4 py-2 border-b ${
                theme === "dark"
                  ? "border-white/10 bg-zinc-900"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm font-medium ml-2">Preview</span>
              </div>
              <button
                onClick={openFullPreview}
                className={`p-1.5 rounded transition-colors ${
                  theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100"
                }`}
                title="Open in New Window"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Frame */}
            <div className="flex-1 overflow-auto bg-white">
              <iframe
                srcDoc={srcDoc}
                title="Preview"
                sandbox="allow-scripts allow-modals allow-same-origin" // ✅ added same-origin
                className="w-full h-full border-0 bg-white"
                onLoad={handleIframeLoad}
              />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap');
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${theme === "dark" ? "#18181b" : "#f1f5f9"};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${theme === "dark" ? "#3f3f46" : "#cbd5e1"};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #00C214;
        }

        textarea::placeholder {
          color: ${theme === "dark" ? "#52525b" : "#9ca3af"};
        }
      `}</style>
    </div>
  );
};

export default CodeEditor;

import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoIosBarcode } from "react-icons/io";

const CodeEditor = () => {
    const [html, setHtml] = useState("<h1 class='text-green-600'>Hello World</h1>");
    const [css, setCss] = useState("h1 { @apply text-4xl; }");
    const [js, setJs] = useState("console.log('Running JS...');");
    const [srcDoc, setSrcDoc] = useState("");
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        const combined = `
          <html>
            <head>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>${css}</style>
            </head>
            <body class="p-4">
              ${html}
              <script>${js}<\/script>
            </body>
          </html>
        `;
        setSrcDoc(combined);
      }, 400);
  
      return () => clearTimeout(timeout);
    }, [html, css, js]);
  
    const openFullPreview = () => {
      const full = `
        <html>
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>${css}</style>
          </head>
          <body class="p-4">
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
  return (
    <div className="flex flex-col md:flex-row h-screen">
    {/* Editors Section */}
    <div className="md:w-1/2 p-4 bg-zinc-900 text-white space-y-4 overflow-auto">
      <div className="flex items-center gap-1 text-lg font-bold mb-10">
        <IoIosBarcode className="text-4xl" />
        Codinel
      </div>
      <div>
        <h2 className="text-sm font-semibold">HTML</h2>
        <Editor
          height="20vh"
          defaultLanguage="html"
          theme="vs-dark"
          value={html}
          onChange={(v) => setHtml(v || "")}
        />
      </div>
      <div>
        <h2 className="text-sm font-semibold">CSS</h2>
        <Editor
          height="20vh"
          defaultLanguage="css"
          theme="vs-dark"
          value={css}
          onChange={(v) => setCss(v || "")}
        />
      </div>
      <div>
        <h2 className="text-sm font-semibold">JavaScript</h2>
        <Editor
          height="20vh"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={js}
          onChange={(v) => setJs(v || "")}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={openFullPreview}
          className="bg-black hover:bg-gray-950 px-4 py-1.5 text-sm rounded flex items-center gap-2 text-white"
        >
          Full Preview <FaExternalLinkAlt />
        </button>
      </div>
    </div>

    {/* Embedded Preview */}
    <div className="md:w-1/2 bg-white overflow-auto border-l border-gray-300">
      <iframe
        srcDoc={srcDoc}
        title="Preview"
        sandbox="allow-scripts"
        className="w-full h-full min-h-[70vh]"
      />
    </div>
  </div>
  )
}

export default CodeEditor
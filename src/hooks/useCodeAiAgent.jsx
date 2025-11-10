import { useState, useCallback } from "react";

export function useCodeAiAgent() {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [lastPrompt, setLastPrompt] = useState(null);

  const generateCode = useCallback(
    async (prompt, type = "html", useInline = false) => {
      if (!prompt?.trim()) return null;

      setAiLoading(true);
      setAiError(null);
      setLastPrompt(prompt);

      try {
        // ✅ Always check if API key exists
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        if (!apiKey) throw new Error("Missing OpenRouter API key");

        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "HTTP-Referer": window.location.origin, // optional but helpful
              "X-Title": "Codinel AI Agent", // optional
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // ✅ Use a valid, available model
              model: "kwaipilot/kat-coder-pro:free", // or "mistralai/mixtral-8x7b" if allowed for your key
              messages: [
                {
                  role: "system",
                  content: `You are an expert React + Tailwind UI code generator.
- You produce clean, responsive, modern UI components.
- Output only ${type.toUpperCase()} code.
- If useInline = true, convert Tailwind classes to inline CSS.
- Write minimal, semantic code that looks professional and elegant.`,
                },
                {
                  role: "user",
                  content: prompt,
                },
              ],
            }),
          }
        );

        console.log("🛰️ OpenRouter response:", response);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content?.trim();
        console.log("✅ Generated code:", text);

        return text || "";
      } catch (err) {
        console.error("❌ AI Code generation failed:", err);
        setAiError(err.message);
        return "";
      } finally {
        setAiLoading(false);
      }
    },
    []
  );

  return { generateCode, aiLoading, aiError, lastPrompt };
}

// 👇 Add this new helper function below your existing useCodeAiAgent export
export async function generateWebsiteFromDescription(
  description,
  generateCodeFn
) {
  if (!description?.trim()) return { html: "", css: "", js: "" };

  try {
    // 🔥 Ask AI for full modern webpage with inline <style> and <script>
    const fullCode = await generateCodeFn(
      `
      Create a modern, fully responsive webpage based on this idea:
      "${description}"

      Requirements:
      - Use semantic HTML.
      - Include one <style>...</style> block for CSS (no external files).
      - Include one <script>...</script> block for interactivity (no frameworks).
      - Use modern UI design (glassmorphism / gradients / animations / minimal).
      - Keep it clean and professional.
      `,
      "html",
      true
    );

    if (!fullCode) return { html: "", css: "", js: "" };

    // ✂️ Extract CSS & JS blocks
    const cssMatch = fullCode.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const jsMatch = fullCode.match(/<script[^>]*>([\s\S]*?)<\/script>/i);

    const css = cssMatch ? cssMatch[1].trim() : "";
    const js = jsMatch ? jsMatch[1].trim() : "";

    // 🧩 Remove <style> and <script> from main HTML
    let html = fullCode
      .replace(/<style[^>]*>[\s\S]*?<\/style>/i, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/i, "")
      .trim();

    // Optionally clean up DOCTYPE or extra tags
    html = html
      .replace(/<!DOCTYPE html>/i, "")
      .replace(/<\/?html.*?>/gi, "")
      .replace(/<\/?head.*?>/gi, "")
      .replace(/<\/?body.*?>/gi, "")
      .replace(/<\/?meta.*?>/gi, "")
      .replace(/<\/?title.*?>/gi, "")
      .trim();

    return { html, css, js };
  } catch (err) {
    console.error("❌ Failed to generate website:", err);
    return { html: "", css: "", js: "" };
  }
}

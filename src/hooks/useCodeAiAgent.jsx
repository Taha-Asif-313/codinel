import { useState, useCallback } from "react";

export function useCodeAiAgent() {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [lastPrompt, setLastPrompt] = useState(null);

  const generateCode = useCallback(async (prompt, type = "html", useInline = false) => {
    if (!prompt?.trim()) return null;

    setAiLoading(true);
    setAiError(null);
    setLastPrompt(prompt);

    try {
      // ✅ Always check if API key exists
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (!apiKey) throw new Error("Missing OpenRouter API key");

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin, // optional but helpful
          "X-Title": "Codinel AI Agent",          // optional
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
      });

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
  }, []);

  return { generateCode, aiLoading, aiError, lastPrompt };
}

"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("Professional");
  const [polishedText, setPolishedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePolish = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setPolishedText("");

    try {
      const res = await fetch("/api/polish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone }),
      });

      const data = await res.json();
      if (data.success) {
        setPolishedText(data.polishedText);
      } else {
        alert(data.error || "Error processing text");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full space-y-6">
        {/* Заголовок */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            AI Text Polisher
          </h1>
          <p className="text-zinc-400 text-sm">
            Rewrite text in any style in seconds with Groq and Next.js
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Original text
            </label>
            <textarea
              className="w-full h-48 bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 resize-none"
              placeholder="Enter your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Polished result
            </label>
            <div className="w-full h-48 bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm overflow-y-auto text-zinc-300 whitespace-pre-wrap">
              {loading
                ? "AI is thinking..."
                : polishedText || "Your result will appear here..."}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-xl">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-zinc-400">Tone:</span>
            <select
              className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-200 focus:outline-none"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Academic">Academic</option>
              {/* <option value="Pirate">Pirate (Playful)</option> */}
            </select>
          </div>

          <button
            onClick={handlePolish}
            disabled={loading || !text.trim()}
            className="w-full sm:w-auto bg-zinc-100 text-zinc-950 font-semibold px-6 py-2 rounded-lg text-sm hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Rewrite text"}
          </button>
        </div>
      </div>
    </main>
  );
}

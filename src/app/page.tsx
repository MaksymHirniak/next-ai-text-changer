"use client";

import { useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import Link from "next/link";

const toneOptions = ["Professional", "Casual", "Academic", "Creative"] as const;

export default function TextPolisherForm() {
  const [inputText, setInputText] = useState("");
  const [tone, setTone] = useState("Professional");
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/polish",
    streamProtocol: "text",
  });

  const handlePolish = async () => {
    if (!inputText) return;
    await complete(inputText, {
      body: {
        text: inputText,
        tone: tone,
      },
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]" />
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[56px_56px]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full rounded-4xl border border-white/10 bg-white/6 p-5 shadow-[0_24px_120px_rgba(2,6,23,0.6)] backdrop-blur-2xl sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex max-w-2xl flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-sky-300/80" />
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Polish your writing with a focused, modern workspace.
                </h1>

                <p className="text-sm leading-6 text-slate-300 sm:text-base">
                  Choose a tone, paste your draft, and let the polished version
                  stream into the output panel in real time.
                </p>
              </div>

              <Link
                href="/history"
                className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white sm:mt-1"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                View History
              </Link>
            </header>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-200">
                    Tone of Voice
                  </p>
                  <p className="text-xs text-slate-400">
                    Pick the rewrite style before polishing
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {toneOptions.map((option) => {
                    const active = tone === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setTone(option)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          active
                            ? "border-sky-400/40 bg-sky-400/15 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
                            : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                        }`}
                        aria-pressed={active}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
                <section className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/10 sm:p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">Input</p>
                      <p className="text-xs text-slate-400">
                        Paste or type the text you want to refine
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                      Source text
                    </span>
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your text here..."
                    className="min-h-80 w-full resize-none border-0 bg-transparent text-base leading-7 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0"
                  />
                </section>

                <section className="rounded-3xl border border-white/10 bg-neutral-900/80 p-4 shadow-inner shadow-black/20 sm:p-5 dark:bg-neutral-900">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">Output</p>
                      <p className="text-xs text-slate-400">
                        The polished version appears here as it streams in
                      </p>
                    </div>
                  </div>
                  <textarea
                    readOnly
                    value={completion || "Your polished text will appear here."}
                    className="min-h-80 w-full resize-none border-0 bg-transparent text-base leading-7 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0"
                  />
                </section>
              </div>

              <div className="flex flex-col items-stretch justify-between gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
                <p className="text-sm text-slate-400">
                  Selected tone: <span className="text-slate-200">{tone}</span>
                </p>
                <button
                  onClick={handlePolish}
                  disabled={isLoading || !inputText.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-500 via-blue-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-200 hover:scale-[1.01] hover:shadow-sky-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                        />
                        <path
                          d="M22 12a10 10 0 0 1-10 10"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          className="opacity-90"
                        />
                      </svg>
                      Polishing...
                    </>
                  ) : (
                    "Polish Text"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

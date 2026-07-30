"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        if (data.success) {
          setHistory(data.history);
        }
      } catch (error) {
        console.error("Помилка завантаження історії:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]" />
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[56px_56px]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between pr-20 sm:pr-24">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Generations History
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Your previously polished texts are saved here.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Polisher
          </Link>
          <div className="fixed right-4 top-4 z-20 scale-110 origin-top-right sm:right-6 sm:top-6 sm:scale-125">
            <UserButton />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {isLoading ? (
            <div className="text-center p-12 text-slate-400 animate-pulse">
              Loading history...
            </div>
          ) : history.length === 0 ? (
            <div className="rounded-4xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">
              <p className="text-lg text-slate-300">No history yet.</p>
              <p className="text-sm text-slate-500 mt-2">
                Go back and polish some text to see it here!
              </p>
            </div>
          ) : (
            history.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-xl transition-all hover:border-white/20 md:flex-row"
              >
                <div className="flex-1 rounded-xl bg-neutral-900/50 p-4">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Original
                  </span>
                  <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
                    {item.originalText}
                  </p>
                </div>

                <div className="hidden items-center justify-center text-white/10 md:flex">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                </div>

                <div className="flex-1 rounded-xl bg-neutral-900/80 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500/80">
                      Polished
                    </span>
                    <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-2 py-0.5 text-[10px] text-sky-200">
                      {item.tone}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-100 whitespace-pre-wrap">
                    {item.polishedText}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

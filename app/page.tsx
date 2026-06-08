"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#2c2017] text-[#f2e6d9] flex flex-col antialiased">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Decorative ambient blur */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#4e3d30]/20 blur-3xl pointer-events-none" />

        <div className="max-w-3xl w-full text-center space-y-8 relative z-10">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3d2f25] border border-[#4e3d30] text-amber-300 font-mono text-[11px] uppercase tracking-widest mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00c897] animate-pulse" />
            DSA SCHEMA INDEXING TERMINAL
          </div>

          {/* Staggered Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none text-[#e6d5c3]">
            Track Your <span className="italic font-serif text-amber-300 font-normal">DSA Progress</span> <br />
            With Semantic Precision.
          </h1>

          {/* Supportive Subtext */}
          <p className="max-w-lg mx-auto text-sm sm:text-base text-[#b8a28f] font-mono leading-relaxed">
            Upload document schemes, extract tabular questions utilizing AI pipelines, discover matching problem links on LeetCode, GeeksforGeeks, or Codeforces, and track your completions.
          </p>

          {/* Staggered CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {token ? (
              <Link
                href="/sheets"
                className="bg-[#00c897] hover:bg-[#00e0a8] text-[#1a3321] font-bold text-base px-8 py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(0,200,151,0.2)] active:scale-95 flex items-center gap-2"
              >
                Go to Dashboard
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-[#cbb6a3] hover:bg-[#dac8b8] text-[#261b13] font-bold text-base px-8 py-3.5 rounded-xl transition-all active:scale-95"
                >
                  Authenticate Workspace
                </Link>
                <Link
                  href="/register"
                  className="bg-transparent hover:bg-[#3d2f25] text-[#f2e6d9] font-bold text-base px-8 py-3.5 rounded-xl transition-all border border-[#4e3d30] active:scale-95"
                >
                  Register Account
                </Link>
              </>
            )}
          </div>

        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="py-8 border-t border-[#4e3d30]/60 text-center text-[10px] font-mono text-[#8b7361] select-none">
        &copy; {new Date().getFullYear()} Console Infrastructure. Built with Next.js & Mongoose Atlas.
      </footer>
    </div>
  );
}

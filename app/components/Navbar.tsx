"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
      setUsername(localStorage.getItem("username"));
    }
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
    setToken(null);
    setUsername(null);
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#2c2017]/90 backdrop-blur-md border-b border-[#4e3d30]/60 px-6 py-4 text-[#f2e6d9] select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand/Logo */}
        <Link href={token ? "/sheets" : "/"} className="flex items-center gap-2.5 group">
          <span className="h-2.5 w-2.5 rounded-full bg-[#00c897] animate-pulse" />
          <span className="font-mono text-xs tracking-widest uppercase font-bold text-[#e6d5c3] group-hover:text-amber-300 transition-colors">
            DSA Journey
          </span>
        </Link>

        {/* Action Links */}
        <div className="flex items-center gap-6">
          {token ? (
            <>
              <Link
                href="/sheets"
                className={`text-xs font-mono uppercase tracking-wider transition-colors hover:text-amber-300 ${
                  pathname === "/sheets" ? "text-amber-300 font-bold" : "text-[#cbb6a3]"
                }`}
              >
                Sheets
              </Link>
              <Link
                href="/upload-sheet"
                className={`text-xs font-mono uppercase tracking-wider transition-colors hover:text-amber-300 ${
                  pathname === "/upload-sheet" ? "text-amber-300 font-bold" : "text-[#cbb6a3]"
                }`}
              >
                Upload
              </Link>
              <div className="h-4 w-px bg-[#4e3d30]" />
              {username && (
                <span className="text-[11px] font-mono text-[#b8a28f] hidden md:inline-block">
                  Operator: <span className="text-amber-300 font-bold">{username}</span>
                </span>
              )}
              <button
                onClick={handleLogout}
                className="bg-[#4e3d30] hover:bg-[#5a4639] text-[#f2e6d9] text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all active:scale-95 border border-[#5a4639] cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-xs font-mono uppercase tracking-wider transition-colors hover:text-amber-300 ${
                  pathname === "/login" ? "text-amber-300 font-bold" : "text-[#cbb6a3]"
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-[#cbb6a3] hover:bg-[#dac8b8] text-[#261b13] text-xs font-mono uppercase tracking-widest px-3.5 py-1.5 rounded-lg transition-all active:scale-95 font-bold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

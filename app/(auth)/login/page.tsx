"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Authorization credentials cannot be left blank.");
            return;
        }

        try {
            setLoading(true);
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
            const res = await axios.post(`${API_URL}/api/auth/login`, {
                username,
                password,
            });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", res.data.user?.name || "");
                router.push("/sheets");
            }
        } catch (err: any) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                "The security handshake failed. Verify signature credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#2c2017] flex flex-col md:flex-row antialiased select-none">

            <div className="md:w-5/12 bg-[#3d2f25] border-b md:border-b-0 md:border-r border-[#4e3d30] p-8 sm:p-12 md:p-16 flex flex-col justify-between text-[#f2e6d9] relative overflow-hidden shrink-0">
                <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#4e3d30]/20 blur-2xl pointer-events-none" />

                <div className="flex items-center gap-3 relative z-10">
                    <span className="h-2 w-2 rounded-full bg-[#00c897]" />
                    <p className="font-mono text-xs tracking-widest text-[#cbb6a3] uppercase">
                        Data Terminal Matrix
                    </p>
                </div>

                <div className="my-16 md:my-0 space-y-4 relative z-10">
                    <h2 className="text-4xl lg:text-5xl font-light tracking-tight leading-none text-[#e6d5c3]">
                        Sheet <br />
                        <span className="italic font-serif font-normal text-amber-300">Management</span> <br />
                        System.
                    </h2>
                    <p className="text-xs text-[#b8a28f] font-mono leading-relaxed max-w-xs">
                        A secured architectural pipeline built to parse, structure, and dispatch data tables seamlessly.
                    </p>
                </div>

                <p className="text-[10px] font-mono text-[#8b7361] hidden md:block">
                    &copy; {new Date().getFullYear()} Console Infrastructure. All rights reserved.
                </p>
            </div>

            <div className="flex-1 bg-[#261b13] flex items-center justify-center p-8 sm:p-12 md:p-16">
                <div className="w-full max-w-sm space-y-8">

                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold tracking-tight text-[#f2e6d9]">
                            Authenticate Workspace
                        </h3>
                        <p className="text-sm text-[#9c8472]">
                            Provide valid operational credentials below.
                        </p>
                    </div>

                    {error && (
                        <div className="text-xs font-mono font-semibold text-[#da7d7d] border-l-2 border-[#da7d7d] pl-3 py-1 bg-[#3d1a1a]/40 rounded-r-md">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">

                            <div className="space-y-1">
                                <label htmlFor="username" className="text-[11px] font-mono tracking-wider text-[#b8a28f] uppercase">
                                    Ident. Signature
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    autoComplete="off"
                                    disabled={loading}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    className="w-full bg-[#33251a] border border-[#4a3729] rounded-lg px-4 py-3 text-sm text-[#f2e6d9] placeholder-[#6e5441] focus:outline-none focus:border-amber-300/60 transition-colors duration-150"
                                />
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-[11px] font-mono tracking-wider text-[#b8a28f] uppercase">
                                        Passkey Code
                                    </label>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    disabled={loading}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#33251a] border border-[#4a3729] rounded-lg px-4 py-3 text-sm text-[#f2e6d9] placeholder-[#6e5441] focus:outline-none focus:border-amber-300/60 transition-colors duration-150 tracking-widest"
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#cbb6a3] hover:bg-[#dac8b8] disabled:bg-[#33251a] text-[#261b13] disabled:text-[#6e5441] font-semibold text-sm py-3 px-4 rounded-lg transition-all duration-150 flex items-center justify-center gap-3 select-none"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#261b13] border-t-transparent" />
                                    <span className="font-mono text-xs">Decrypting access...</span>
                                </>
                            ) : (
                                <span>Initialize Session</span>
                            )}
                        </button>
                    </form>

                </div>
            </div>

        </div>
    );
}
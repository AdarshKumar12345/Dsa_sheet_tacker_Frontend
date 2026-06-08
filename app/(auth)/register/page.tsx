// app/register/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    // Controlled form states matching your Mongoose Schema requirements
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Front-end structural validation before hitting database constraints
        if (!name.trim() || !email.trim() || !password) {
            setError("All primary registration parameters must be populated.");
            return;
        }

        if (password.length < 6) {
            setError("Security passkey fails schema criteria: must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passkey mismatch. Please verify integrity signatures.");
            return;
        }

        try {
            setLoading(true);

            // Axios request sending payload to match your back-end registration endpoint
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
            const res = await axios.post(`${API_URL}/api/auth/register`, {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password,
            });

            if (res.status === 201 || res.data.success) {
                // Smooth transition directly to login once registered
                router.push("/login");
            }
        } catch (err: any) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                "Registration handshake failed. This identifier may already exist."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#2c2017] flex flex-col md:flex-row antialiased select-none">

            {/* Editorial/Bespoke Left Column */}
            <div className="md:w-5/12 bg-[#3d2f25] border-b md:border-b-0 md:border-r border-[#4e3d30] p-8 sm:p-12 md:p-16 flex flex-col justify-between text-[#f2e6d9] relative overflow-hidden shrink-0">
                <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[#4e3d30]/20 blur-2xl pointer-events-none" />

                {/* Top Branding Marker */}
                <div className="flex items-center gap-3 relative z-10">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <p className="font-mono text-xs tracking-widest text-[#cbb6a3] uppercase">
                        DSA Journey
                    </p>
                </div>

                {/* Central Layout Text (Staggered/Editorial) */}
                <div className="my-16 md:my-0 space-y-4 relative z-10">
                    <h2 className="text-4xl lg:text-5xl font-light tracking-tight leading-none text-[#e6d5c3]">
                        Welcome to <br />
                        <span className="italic font-serif font-normal text-amber-300">DSA Journey</span> <br />
                        Track your progress.
                    </h2>
                    <p className="text-xs text-[#b8a28f] font-mono leading-relaxed max-w-xs">
                        Start your journey with us and track your progress and Make yourself unstopable.
                    </p>
                </div>

                {/* Bottom Status Marker */}
                <p className="text-[10px] font-mono text-[#8b7361] hidden md:block">
                    &copy; {new Date().getFullYear()} Console Infrastructure. Schema v1.0.0
                </p>
            </div>

            {/* Clean Minimalist Right Side Form Column */}
            <div className="flex-1 bg-[#261b13] flex items-center justify-center p-8 sm:p-12 md:p-16 overflow-y-auto">
                <div className="w-full max-w-sm space-y-8 my-auto">

                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold tracking-tight text-[#f2e6d9]">
                            Register Here
                        </h3>
                        <p className="text-sm text-[#9c8472]">
                            Create your account.
                        </p>
                    </div>

                    {/* Clean Error Message Indicator */}
                    {error && (
                        <div className="text-xs font-mono font-semibold text-[#da7d7d] border-l-2 border-[#da7d7d] pl-3 py-1 bg-[#3d1a1a]/40 rounded-r-md">
                            {error}
                        </div>
                    )}

                    {/* Form Matrix */}
                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-3.5">

                            {/* Full Name Field Block */}
                            <div className="space-y-1">
                                <label htmlFor="name" className="text-[11px] font-mono tracking-wider text-[#b8a28f] uppercase">
                                    UserName
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="off"
                                    disabled={loading}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g., Alex Mercer"
                                    className="w-full bg-[#33251a] border border-[#4a3729] rounded-lg px-4 py-2.5 text-sm text-[#f2e6d9] placeholder-[#6e5441] focus:outline-none focus:border-amber-300/60 transition-colors duration-150"
                                />
                            </div>

                            {/* Email Address Field Block */}
                            <div className="space-y-1">
                                <label htmlFor="email" className="text-[11px] font-mono tracking-wider text-[#b8a28f] uppercase">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="off"
                                    disabled={loading}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="operator@domain.com"
                                    className="w-full bg-[#33251a] border border-[#4a3729] rounded-lg px-4 py-2.5 text-sm text-[#f2e6d9] placeholder-[#6e5441] focus:outline-none focus:border-amber-300/60 transition-colors duration-150"
                                />
                            </div>

                            {/* Password Field Block */}
                            <div className="space-y-1">
                                <label htmlFor="password" className="text-[11px] font-mono tracking-wider text-[#b8a28f] uppercase">
                                    Passkey Code (Min. 6 Char)
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    disabled={loading}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#33251a] border border-[#4a3729] rounded-lg px-4 py-2.5 text-sm text-[#f2e6d9] placeholder-[#6e5441] focus:outline-none focus:border-amber-300/60 transition-colors duration-150 tracking-widest"
                                />
                            </div>

                            {/* Confirm Password Field Block */}
                            <div className="space-y-1">
                                <label htmlFor="confirmPassword" className="text-[11px] font-mono tracking-wider text-[#b8a28f] uppercase">
                                    Confirm Passkey Verify
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    disabled={loading}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#33251a] border border-[#4a3729] rounded-lg px-4 py-2.5 text-sm text-[#f2e6d9] placeholder-[#6e5441] focus:outline-none focus:border-amber-300/60 transition-colors duration-150 tracking-widest"
                                />
                            </div>

                        </div>

                        {/* Layout Navigation Split Context Footer links */}
                        <div className="flex items-center justify-between pt-1 text-xs">
                            <span className="text-[#8b7361]">Already a member?</span>
                            <Link
                                href="/login"
                                className="text-amber-300/80 hover:text-amber-300 font-medium underline underline-offset-4 transition-colors"
                            >
                                Sign In
                            </Link>
                        </div>

                        {/* Custom Interactive Action Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#cbb6a3] hover:bg-[#dac8b8] disabled:bg-[#33251a] text-[#261b13] disabled:text-[#6e5441] font-semibold text-sm py-3 px-4 rounded-lg transition-all duration-150 flex items-center justify-center gap-3 select-none mt-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#261b13] border-t-transparent" />
                                    <span className="font-mono text-xs">Compiling schema row...</span>
                                </>
                            ) : (
                                <span>Register</span>
                            )}
                        </button>
                    </form>

                </div>
            </div>

        </div>
    );
}
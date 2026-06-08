"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../components/Navbar";

interface Sheet {
    id: string;
    title: string;
}

export default function SheetsPage() {
    const router = useRouter();

    const [sheets, setSheets] = useState<Sheet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchSheets = async (): Promise<void> => {
        try {
            setLoading(true);
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
            const res = await axios.get<{ success: boolean; sheets: any[] }>(
                `${API_URL}/api/sheet/sheets`,
                {
                    headers: token ? { "Authorization": `Bearer ${token}` } : {}
                }
            );

            const sheetsData = res.data.sheets || [];
            // Map securely, normalizing alternative object keys if necessary
            setSheets(
                sheetsData.map((sheet: any) => ({
                    id: sheet.id || sheet._id,
                    title: sheet.title || sheet.name || "Untitled Schema Registry",
                }))
            );
        } catch (err) {
            console.error("Error fetching sheets list:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSheets();
    }, []);

    const goOnThatSheet = (sheetId: string) => {
        router.push(`/sheets/${sheetId}`);
    };

    const handleDeleteSheet = async (sheetId: string) => {
        if (!confirm("Are you sure you want to delete this sheet registry?")) {
            return;
        }

        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
            const res = await axios.delete(`${API_URL}/api/sheet/${sheetId}`, {
                headers: token ? { "Authorization": `Bearer ${token}` } : {}
            });

            if (res.data.success) {
                setSheets(prev => prev.filter(s => s.id !== sheetId));
            }
        } catch (err: any) {
            console.error("Error deleting sheet:", err);
            alert(err.response?.data?.message || "Failed to delete sheet registry. Make sure you are authenticated as the sheet owner.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#3d2f25] text-[#f2e6d9] flex flex-col justify-center items-center select-none">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#cbb6a3] border-t-transparent mb-3"></div>
                <p className="text-xs font-mono text-[#cbb6a3] tracking-wider">Syncing Schema Repositories...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#2c2017] text-[#f2e6d9] flex flex-col antialiased">
            <Navbar />
            <div className="flex-1 py-16 px-4 sm:px-8 lg:px-12">
                <div className="max-w-5xl mx-auto space-y-10">

                    {/* Editorial Top Section Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#4e3d30] pb-6 gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-amber-300 font-mono text-xs tracking-widest uppercase">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#00c897]" />
                                Data Center Node
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-[#e6d5c3]">
                                Workspace Sheets
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push("/upload-sheet")}
                                className="bg-[#00c897] hover:bg-[#00e0a8] text-[#1a3321] font-bold text-sm px-5 py-2.5 rounded-lg transition-all shadow-[0_0_10px_rgba(0,200,151,0.2)] hover:shadow-[0_0_15px_rgba(0,200,151,0.4)] flex items-center gap-2 active:scale-95 cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Upload Sheet
                            </button>
                        </div>
                    </div>

                {/* Dynamic Display Matrix Grid */}
                {sheets && sheets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sheets.map((sheet) => (
                            <div
                                key={sheet.id}
                                onClick={() => goOnThatSheet(sheet.id)}
                                className="group bg-[#3d2f25] border border-[#4e3d30] hover:border-amber-300/40 rounded-xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 shadow-lg hover:-translate-y-0.5"
                            >
                                <div className="space-y-4">
                                    {/* Structural Header Tagging Inside Card */}
                                    <div className="flex items-center justify-between">
                                        <div className="p-2 bg-[#2c2017] rounded-lg border border-[#4e3d30] text-[#cbb6a3] group-hover:text-amber-300 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                                            </svg>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[10px] tracking-wider text-[#8b7361] uppercase bg-[#2c2017] px-2 py-0.5 rounded border border-[#4e3d30]">
                                                Active Map
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteSheet(sheet.id);
                                                }}
                                                className="p-1.5 bg-[#2c2017] hover:bg-[#3d1a1a] text-[#8b7361] hover:text-[#da7d7d] rounded border border-[#4e3d30] hover:border-[#da7d7d]/40 transition-all cursor-pointer active:scale-90"
                                                title="Delete Sheet"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Core Content String Title */}
                                    <h3 className="text-xl font-bold tracking-tight text-[#f2e6d9] group-hover:text-amber-200 transition-colors line-clamp-2 pt-2">
                                        {sheet.title}
                                    </h3>
                                </div>

                                {/* Bottom Interactive Row Block */}
                                <div className="mt-8 pt-4 border-t border-[#4e3d30] flex items-center justify-between text-xs font-mono font-medium text-[#b8a28f] group-hover:text-[#f2e6d9] transition-colors">
                                    <span>Open Collection</span>
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#8b7361] group-hover:text-amber-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Custom State Block for Clean Empty State Realization */
                    <div className="border border-dashed border-[#4e3d30] bg-[#3d2f25]/30 rounded-2xl p-16 text-center max-w-xl mx-auto mt-12 space-y-6 flex flex-col items-center">
                        <svg className="w-12 h-12 text-[#8b7361] mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-[#e6d5c3]">No Layout Schemes Discovered</h3>
                            <p className="text-xs font-mono text-[#b8a28f] max-w-xs mx-auto leading-relaxed">
                                Your system data matrix index currently contains empty operational properties. Parse a file to initialize a sheet card.
                            </p>
                        </div>
                        <button
                            onClick={() => router.push("/upload-sheet")}
                            className="bg-[#00c897] hover:bg-[#00e0a8] text-[#1a3321] font-bold text-sm px-6 py-3 rounded-lg transition-all shadow-[0_0_10px_rgba(0,200,151,0.2)] flex items-center gap-2 active:scale-95"
                        >
                            Upload Your First Sheet
                        </button>
                    </div>
                )}

            </div>
            </div>
        </div>
    );
}
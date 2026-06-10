"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

const LeetCodeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.078l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
);

const GeeksforGeeksIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.13-.353h7.418a4.26 4.26 0 0 1-.368 1.008zm-11.99-.654a3.793 3.793 0 0 1-2.134 2.078 4.51 4.51 0 0 1-3.117.016 3.7 3.7 0 0 1-1.104-.695 2.652 2.652 0 0 1-.564-.745 4.221 4.221 0 0 1-.368-1.006H9.59c-.038.12-.08.238-.13.352zm14.501-1.758a3.849 3.849 0 0 0-.082-.475l-9.634-.008a3.932 3.932 0 0 1 1.143-2.348c.363-.35.79-.625 1.26-.809a3.97 3.97 0 0 1 4.484.957l1.521-1.49a5.7 5.7 0 0 0-1.922-1.357 6.283 6.283 0 0 0-2.544-.49 6.35 6.35 0 0 0-2.405.457 6.007 6.007 0 0 0-1.963 1.276 6.142 6.142 0 0 0-1.325 1.94 5.862 5.862 0 0 0-.466 1.864h-.063a5.857 5.857 0 0 0-.467-1.865 6.13 6.13 0 0 0-1.325-1.939A6 6 0 0 0 8.21 6.34a6.698 6.698 0 0 0-4.949.031A5.708 5.708 0 0 0 1.34 7.73l1.52 1.49a4.166 4.166 0 0 1 4.484-.958c.47.184.898.46 1.26.81.368.36.66.792.859 1.268.146.344.242.708.285 1.08l-9.635.008A4.714 4.714 0 0 0 0 12.457a6.493 6.493 0 0 0 .345 2.127 4.927 4.927 0 0 0 1.08 1.783c.528.56 1.17 1 1.88 1.293a6.454 6.454 0 0 0 2.504.457c.824.005 1.64-.15 2.404-.457a5.986 5.986 0 0 0 1.964-1.277 6.116 6.116 0 0 0 1.686-3.076h.273a6.13 6.13 0 0 0 1.686 3.077 5.99 5.99 0 0 0 1.964 1.276 6.345 6.345 0 0 0 2.405.457 6.45 6.45 0 0 0 2.502-.457 5.42 5.42 0 0 0 1.882-1.293 4.928 4.928 0 0 0 1.08-1.783A6.52 6.52 0 0 0 24 12.457a4.757 4.757 0 0 0-.039-.554z" />
    </svg>
);

const CodeforcesIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
    </svg>
);

interface Question {
    _id: string;
    number: number;
    title: string;
    topic: string;
    urlleetcode?: string;
    urlgfg?: string;
    urlcodeforces?: string;
    difficulty: string;
    completed?: boolean;
}

interface SheetData {
    name?: string;
    createdAt?: string;
    [key: string]: any;
}

export default function SheetPage() {
    const params = useParams();
    const sheetId = params?.SheetID as string;
    const router = useRouter();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [sheetData, setSheetData] = useState<SheetData>({});
    const [loading, setLoading] = useState(true);
    const [sheetName, setSheetName] = useState("");

    const fetchSheetData = async () => {
        if (!sheetId) return;
        try {
            setLoading(true);
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
            const res = await fetch(`${API_URL}/api/sheet/${sheetId}`, {
                headers: token ? { "Authorization": `Bearer ${token}` } : {}
            });

            if (res.status === 401) {
                router.push("/login");
                return;
            }
            if (res.status === 403) {
                alert("You are not authorized to view this sheet.");
                router.push("/sheets");
                return;
            }

            const data = await res.json();

            setQuestions(data.questions || []);
            setSheetData(data.sheetData || {});
            setSheetName(data.sheetData?.title || "Untitled Sheet");
        } catch (err) {
            console.error("Error fetching sheet records:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleComplete = async (questionId: string) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
            alert("Please log in to track your progress.");
            return;
        }

        setQuestions(prev =>
            prev.map(q =>
                q._id === questionId ? { ...q, completed: !q.completed } : q
            )
        );

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
            const res = await fetch(`${API_URL}/api/sheet/question/${questionId}/toggle`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) {
                if (res.status === 401) {
                    router.push("/login");
                    return;
                }
                fetchSheetData();
            }
        } catch (err) {
            console.error("Failed to toggle completion:", err);
            fetchSheetData();
        }
    };

    useEffect(() => {
        fetchSheetData();
    }, [sheetId]);

    const getDifficultyBadge = (difficulty: string) => {
        const diff = difficulty?.toLowerCase();
        if (diff === 'easy') return 'bg-[#1a3321] text-[#71c087] border border-[#2d5236]';
        if (diff === 'medium') return 'bg-[#402e1c] text-[#d69f68] border border-[#5a4128]';
        if (diff === 'hard') return 'bg-[#3d1a1a] text-[#da7d7d] border border-[#522d2d]';
        return 'bg-[#3d2f25] text-[#cbb6a3] border border-[#5a4639]';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#3d2f25] text-[#f2e6d9] flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#cbb6a3] border-t-transparent mb-4"></div>
                <p className="text-[#cbb6a3] font-medium tracking-wide">Loading sheet compilation...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#3d2f25] text-[#f2e6d9] flex flex-col antialiased">
            <Navbar />
            <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-8">

                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#5a4639] pb-6 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#cbb6a3]">
                                Name of the Sheet
                            </span>
                            <h1 className="text-4xl font-extrabold text-[#f2e6d9] mt-1">
                                {sheetName}
                            </h1>
                        </div>
                        <div className="text-left md:text-right shrink-0">
                            <p className="text-sm font-semibold text-[#cbb6a3]">
                                Reference Registry ID:
                            </p>
                            <p className="font-mono text-xs text-amber-300 bg-[#4d3a2d] px-3 py-1.5 rounded-md mt-1 border border-[#5a4639] inline-block">
                                {sheetId}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold tracking-tight text-[#cbb6a3] flex items-center gap-2">
                                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                Total Questions ({questions.length})
                            </h2>
                        </div>

                        {questions && questions.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {questions.map((question, index) => {
                                    return (
                                        <div
                                            key={question._id || index}
                                            className={`rounded-xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 group ${question.completed
                                                ? 'bg-[#4d3a2d]/80 border-emerald-500/40 opacity-85 hover:border-emerald-400/60'
                                                : 'bg-[#4d3a2d] border-[#5a4639] hover:border-amber-400/40 hover:shadow-lg'
                                                }`}
                                        >
                                            <div className="flex items-start md:items-center gap-4 flex-1">
                                                <button
                                                    onClick={() => handleToggleComplete(question._id)}
                                                    className={`w-5 h-5 shrink-0 rounded border flex items-center justify-center transition-all ${question.completed
                                                        ? 'bg-emerald-500 border-emerald-400 text-white'
                                                        : 'border-[#8b7361] hover:border-amber-400 text-transparent'
                                                        }`}
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                </button>

                                                <span className="font-mono text-sm font-bold text-[#cbb6a3] shrink-0 min-w-[32px]">
                                                    #{question.number || index + 1}
                                                </span>

                                                <div className="flex-1 space-y-1">
                                                    <h3 className={`text-base md:text-lg font-bold leading-snug group-hover:text-amber-200 transition-colors ${question.completed ? 'text-[#7a6555] line-through decoration-[#7a6555]' : 'text-[#f2e6d9]'
                                                        }`}>
                                                        {question.title}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="bg-[#3d2f25] text-[#f2e6d9] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#5a4639]">
                                                            {question.topic || "General"}
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${getDifficultyBadge(question.difficulty)}`}>
                                                            {question.difficulty || "Unknown"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 shrink-0">
                                                {question.urlleetcode ? (
                                                    <a
                                                        href={question.urlleetcode}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="bg-[#f89f1b]/10 text-[#f89f1b] border border-[#f89f1b]/30 hover:bg-[#f89f1b]/20 px-3 py-1.5 rounded-md font-bold text-xs flex items-center gap-1.5 transition-all"
                                                    >
                                                        <LeetCodeIcon className="w-3.5 h-3.5 fill-[#f89f1b]" /> LeetCode
                                                    </a>
                                                ) : (
                                                    <span className="bg-[#3d2f25]/50 text-[#5a4639] border border-[#4e3d30] px-3 py-1.5 rounded-md text-xs font-semibold opacity-50 select-none flex items-center gap-1.5 cursor-not-allowed">
                                                        <LeetCodeIcon className="w-3.5 h-3.5 fill-[#5a4639]" /> LeetCode (N/A)
                                                    </span>
                                                )}

                                                {question.urlgfg ? (
                                                    <a
                                                        href={question.urlgfg}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="bg-[#0f9d58]/10 text-[#0f9d58] border border-[#0f9d58]/30 hover:bg-[#0f9d58]/20 px-3 py-1.5 rounded-md font-bold text-xs flex items-center gap-1.5 transition-all"
                                                    >
                                                        <GeeksforGeeksIcon className="w-3.5 h-3.5 fill-[#0f9d58]" /> GFG
                                                    </a>
                                                ) : (
                                                    <span className="bg-[#3d2f25]/50 text-[#5a4639] border border-[#4e3d30] px-3 py-1.5 rounded-md text-xs font-semibold opacity-50 select-none flex items-center gap-1.5 cursor-not-allowed">
                                                        <GeeksforGeeksIcon className="w-3.5 h-3.5 fill-[#5a4639]" /> GFG (N/A)
                                                    </span>
                                                )}

                                                {question.urlcodeforces ? (
                                                    <a
                                                        href={question.urlcodeforces}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="bg-[#3182ce]/10 text-[#3182ce] border border-[#3182ce]/30 hover:bg-[#3182ce]/20 px-3 py-1.5 rounded-md font-bold text-xs flex items-center gap-1.5 transition-all"
                                                    >
                                                        <CodeforcesIcon className="w-3.5 h-3.5 fill-[#3182ce]" /> Codeforces
                                                    </a>
                                                ) : (
                                                    <span className="bg-[#3d2f25]/50 text-[#5a4639] border border-[#4e3d30] px-3 py-1.5 rounded-md text-xs font-semibold opacity-50 select-none flex items-center gap-1.5 cursor-not-allowed">
                                                        <CodeforcesIcon className="w-3.5 h-3.5 fill-[#5a4639]" /> Codeforces (N/A)
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="bg-[#4d3a2d] border border-dashed border-[#5a4639] rounded-2xl p-12 text-center">
                                <svg className="w-12 h-12 text-[#7a6555] mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25m-2.25-2.25l-2.25 2.25m2.25-2.25l2.25-2.25M3.75 7.5A2.25 2.25 0 016 5.25h12a2.25 2.25 0 012.25 2.25m-18 0h18" />
                                </svg>
                                <h4 className="text-lg font-bold text-[#f2e6d9]">No Questions Found</h4>
                                <p className="text-sm text-[#cbb6a3] mt-1 max-w-sm mx-auto">
                                    This Sheet Does Not Contains any Questions.
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
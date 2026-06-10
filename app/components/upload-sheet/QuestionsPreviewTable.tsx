"use client";

import React from 'react';

interface Question {
    _id: string;
    number: number;
    title: string;
    topic: string;
    urlleetcode?: string;
    urlgfg?: string;
    urlcodeforces?: string;
    difficulty: string;
}

interface QuestionsPreviewTableProps {
    questions: Question[];
    onDeleteQuestion?: (index: number) => void;
}

export default function QuestionsPreviewTable({ 
    questions,
    onDeleteQuestion 
}: QuestionsPreviewTableProps) {
    if (questions.length === 0) return null;

    const getDifficultyBadge = (difficulty: string) => {
        const diff = difficulty?.toLowerCase();
        if (diff === 'easy') return 'bg-[#1a3321] text-[#71c087] border border-[#2d5236]';
        if (diff === 'medium') return 'bg-[#402e1c] text-[#d69f68] border border-[#5a4128]';
        if (diff === 'hard') return 'bg-[#3d1a1a] text-[#da7d7d] border border-[#522d2d]';
        return 'bg-[#3d2f25] text-[#cbb6a3] border border-[#5a4639]';
    };

    return (
        <div className="bg-[#f2e6d9] p-6 rounded-2xl border border-[#cbb6a3] text-[#3d2f25] w-full">
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Parsed Summary Preview</h2>
                <p className="text-sm font-medium text-[#7a6555]">Step 2: Preview Extract Map Layout</p>
            </div>

            <div className="overflow-x-auto border border-[#cbb6a3] rounded-lg">
                <table className="w-full text-left text-sm font-medium">
                    <thead className="bg-[#e0d0c1] text-[#635144]">
                        <tr className="font-bold">
                            <th className="py-3 px-4 w-20 border-b border-[#cbb6a3]">Sr. No</th>
                            <th className="py-3 px-4 border-b border-[#cbb6a3]">Title</th>
                            <th className="py-3 px-4 border-b border-[#cbb6a3]">Topic</th>
                            <th className="py-3 px-4 border-b border-[#cbb6a3]">Platform Link</th>
                            <th className="py-3 px-4 w-32 border-b border-[#cbb6a3]">Difficulty</th>
                            {onDeleteQuestion && (
                                <th className="py-3 px-4 w-24 border-b border-[#cbb6a3]">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => {
                            const targetUrl = question.urlleetcode || question.urlgfg || question.urlcodeforces;

                            return (
                                <tr key={question._id || index} className="border-b border-[#d8c7b8] hover:bg-[#e9ded2] transition-colors last:border-0">
                                    <td className="py-2.5 px-4 text-[#7a6555]">{question.number || index + 1}.</td>
                                    <td className="py-2.5 px-4 font-bold">{question.title}</td>
                                    <td className="py-2.5 px-4">{question.topic}</td>
                                    <td className="py-2.5 px-4">
                                        {targetUrl ? (
                                            <a
                                                href={targetUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-700 hover:underline inline-flex items-center gap-1 font-bold"
                                            >
                                                Solve
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                </svg>
                                            </a>
                                        ) : (
                                            <span className="text-gray-500 italic">N/A</span>
                                        )}
                                    </td>
                                    <td className="py-2.5 px-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${getDifficultyBadge(question.difficulty)}`}>
                                            {question.difficulty || "Unknown"}
                                        </span>
                                    </td>
                                    {onDeleteQuestion && (
                                        <td className="py-2.5 px-4">
                                            <button
                                                onClick={() => onDeleteQuestion(index)}
                                                className="bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-950 text-xs font-semibold px-2.5 py-1.5 rounded transition-all cursor-pointer active:scale-95 flex items-center gap-1 border border-red-300"
                                                title="Delete Question"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Remove
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
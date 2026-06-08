// components/upload-sheet/FileParserPanel.tsx
"use client";

import React, { useState } from 'react';

interface FileParserPanelProps {
    setFile: (file: File | null) => void;
    handleFileUpload: () => void;
    uploading: boolean;
    uploaded: boolean;
}

export default function FileParserPanel({
    setFile,
    handleFileUpload,
    uploading,
    uploaded
}: FileParserPanelProps) {
    const [fileName, setFileName] = useState<string>("");
    const [isPdf, setIsPdf] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : "");
        setIsPdf(selectedFile ? selectedFile.type === "application/pdf" : false);
    };

    return (
        <div className="bg-[#4d3a2d] p-6 rounded-2xl border border-[#5a4639] shadow-inner text-[#f2e6d9]">
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Upload File</h2>
                <p className="text-sm font-medium text-[#cbb6a3]">Step 1: Upload Sheet or Document</p>
            </div>

            <div className="space-y-5">
                {/* Styled Drop/Choose Zone */}
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#8b7361] rounded-xl cursor-pointer bg-[#3d2f25] hover:bg-[#4a3a2d] transition-colors group">
                    <div className="flex flex-col items-center justify-center p-5 text-center w-full">

                        {fileName ? (
                            <>
                                {/* Dynamic File Format Icon */}
                                {isPdf ? (
                                    <svg className="w-12 h-12 text-rose-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                ) : (
                                    <svg className="w-12 h-12 text-emerald-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5v-15.75c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v3.571c0 .621.504 1.125 1.125 1.125h3.571c.621 0 1.125.504 1.125 1.125V18.375c0 .621-.504 1.125-1.125 1.125M21 19.5a1.125 1.125 0 01-1.125 1.125H4.5" />
                                    </svg>
                                )}
                                <p className="text-sm font-semibold text-amber-300 truncate max-w-[240px]">
                                    {fileName}
                                </p>
                            </>
                        ) : (
                            <>
                                <svg className="w-12 h-12 text-[#8b7361] group-hover:text-amber-300 transition-colors mb-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                <p className="text-lg font-bold">Choose File</p>
                                <p className="text-xs text-[#cbb6a3] mt-1">PDF, XLSX, CSV, or XLS</p>
                            </>
                        )}
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept=".xlsx, .xls, .csv, .pdf"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </label>

                {/* Action Button */}
                <div className="flex justify-center">
                    <button
                        className="bg-[#cbb6a3] hover:bg-[#dac8b8] text-[#3d2f25] font-semibold py-2 px-6 rounded-md shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleFileUpload}
                        disabled={uploading || !fileName || uploaded}
                    >
                        {uploading ? "Processing..." : "Parse File"}
                    </button>
                </div>
            </div>
        </div>
    );
}
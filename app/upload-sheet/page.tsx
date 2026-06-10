"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FileParserPanel from "../components/upload-sheet/FileParserPanel";
import QuestionsPreviewTable from "../components/upload-sheet/QuestionsPreviewTable";
import Navbar from "../components/Navbar";

export default function UploadSheet() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [sheetName, setSheetName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [metaData, setMetaData] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      alert("Please log in to upload sheet registries.");
      router.push("/login");
    }
  }, [router]);

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
      const res = await axios.post(
        `${API_URL}/api/sheet/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
          },
        },
      );

      setQuestions(res.data.questions || []);
      setMetaData(res.data.metaData || {});
      setUploaded(true);
    } catch (err) {
      console.error("Error parsing file structure:", err);
      alert("Failed to parse document or sheet layout.");
    } finally {
      setUploading(false);
    }
  };

  const handleSheetCreate = async () => {
    if (!sheetName) {
      alert("Please enter a sheet name");
      return;
    }

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
      const res = await axios.post(
        `${API_URL}/api/sheet/create-sheet`,
        {
          sheetName,
          questions,
          metaData,
        },
        {
          headers: token ? { "Authorization": `Bearer ${token}` } : {}
        }
      );

      const sheetId = res.data.sheetId;
      router.push(`/sheets/${sheetId}`);
    } catch (err) {
      console.error("Error saving layout sheet details:", err);
      alert("Failed to save and process database records.");
    }
  };

  const handleDeleteQuestion = (indexToDelete: number) => {
    setQuestions((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="min-h-screen bg-[#3d2f25] text-[#f2e6d9] flex flex-col antialiased">
      <Navbar />
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Upload Sheet Dashboard
            </h1>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-[3fr,5fr] gap-10 items-start">
            <FileParserPanel
              setFile={setFile}
              handleFileUpload={handleFileUpload}
              uploading={uploading}
              uploaded={uploaded}
            />

            <QuestionsPreviewTable 
              questions={questions} 
              onDeleteQuestion={handleDeleteQuestion}
            />
          </div>

          <div className="w-full mt-10 space-y-6 flex flex-col items-center">

            <div className="w-full max-w-xl text-center space-y-2">
              <div className="flex gap-4 items-center justify-center">
                <label htmlFor="sheetName" className="font-medium text-lg text-[#cbb6a3]">
                  Enter Sheet Name:
                </label>
                <input
                  id="sheetName"
                  type="text"
                  value={sheetName}
                  onChange={(e) => setSheetName(e.target.value)}
                  placeholder="Sheet Name (e.g., Striver SDE)"
                  className="flex-1 max-w-md px-4 py-2.5 bg-[#4d3a2d] border border-[#5a4639] rounded-lg text-amber-100 placeholder-[#7a6555] focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleSheetCreate}
              className="group bg-[#00c897] hover:bg-[#00e0a8] text-[#1a3321] font-bold text-lg px-8 py-3.5 rounded-xl transition-all shadow-[0_0_15px_#00c897] flex items-center gap-2.5 active:scale-95 cursor-pointer"
            >
              CREATE SHEET
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
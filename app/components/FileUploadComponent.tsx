

export default function FileUploadComponent({ setFile, setSheetName, handleFileUpload }: any) {
    return (

        <div className="flex flex-col justify-center items-center ">
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <input type="text" placeholder="Sheet Name" onChange={(e) => setSheetName(e.target.value)} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleFileUpload}>Upload</button>
        </div>
    )
}
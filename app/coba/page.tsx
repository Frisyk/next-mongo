"use client";
import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [fileEnter, setFileEnter] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Replace `YOUR_API_ENDPOINT` with the actual API endpoint
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
      } else {
        setUploadStatus("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <div className="container px-4 max-w-5xl mx-auto">
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={(e) => {
            setFileEnter(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setFileEnter(false);
            if (e.dataTransfer.items) {
              for (let i = 0; i < e.dataTransfer.items.length; i++) {
                const item = e.dataTransfer.items[i];
                if (item.kind === "file") {
                  const file = item.getAsFile();
                  if (file) {
                    setFile(file);
                    console.log(`items file[${i}].name = ${file.name}`);
                  }
                }
              }
            } else {
              for (let i = 0; i < e.dataTransfer.files.length; i++) {
                const file = e.dataTransfer.files[i];
                console.log(`… file[${i}].name = ${file.name}`);
                setFile(file);
              }
            }
          }}
          className={`${
            fileEnter ? "border-4" : "border-2"
          } mx-auto bg-white flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center`}
        >
          <label
            htmlFor="file"
            className="h-full flex flex-col justify-center text-center"
          >
            Click to upload or drag and drop
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => {
              let files = e.target.files;
              if (files && files[0]) {
                setFile(files[0]);
              }
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p>{file.name}</p>
          <object
            className="rounded-md w-full max-w-xs h-72"
            data={URL.createObjectURL(file)}
            type={file.type} // Displaying based on file type
          />
          <button
            onClick={() => setFile(null)}
            className="px-4 mt-4 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
          >
            Reset
          </button>
          <button
            onClick={handleFileUpload}
            className="px-4 mt-4 uppercase py-2 tracking-widest outline-none bg-green-600 text-white rounded"
          >
            Upload
          </button>
          {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
        </div>
      )}
    </div>
  );
};

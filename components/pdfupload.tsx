'use client';
import { LoadPdfEmbedings } from '@/ai-utils/embeding';
import { toastSuccess } from '@/lib/toast';
import { useQueryClient } from '@tanstack/react-query';
import { Upload } from 'lucide-react';
import React, { useState } from 'react';

export default function PdfUploader({ mode }: { mode: 'bot' | 'notebook' }) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const client = useQueryClient();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a PDF file first.');
            return;
        }
        setUploadStatus('Uploading...');
        const formData = new FormData();
        formData.append('pdfFile', selectedFile);
        try {
            const response = await fetch('/api/upload-pdf', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setUploadStatus(`Upload successful! URL: ${data.url}`);
                setUploadStatus('Generating embeddings...');
                const res = await LoadPdfEmbedings(data.url, mode);
                if (res) {
                    setUploadStatus('Embeddings generated successfully!')
                    toastSuccess('collection added successfully!');
                    client.invalidateQueries({ queryKey: ['modelsinfo'] });
                }
            } else {
                setUploadStatus(`Upload failed: ${data.error}`);
            }
        } catch (error) {
            setUploadStatus('An error occurred during upload.');
        }
    };

    return (
        <div className=' card  my-6 p-4 py-5 rounded-3xl flex flex-col'>
            <h2 className="text-2xl text-gray-700 font-bold mb-4">Upload Pdf file</h2>
            <label className=' h-[200px] rounded-3xl border-dashed border border-gray-500 center flex-col gap-3'>
                <input className=' opacity-0' type="file" accept="application/pdf" onChange={handleFileChange} />
                <Upload className=' mx-auto text-gray-400' size={48} />
                <p className=' text-gray-400 '>Click to upload pdf file </p>
            </label>
            <button onClick={handleUpload} hidden={!selectedFile} disabled={!selectedFile} className=' bg-blue-600 px-4 py-2 rounded text-white mt-6 disabled:opacity-45 '>
                Upload PDF
            </button>
            <p>{uploadStatus}</p>
        </div>
    );
}
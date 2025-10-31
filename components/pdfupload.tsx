'use client';
import { LoadPdfEmbedings } from '@/ai-utils/embeding';
import React, { useState } from 'react';

export default function PdfUploader() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

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
                const res = await LoadPdfEmbedings(data.url);

                if (res) setUploadStatus('Embeddings generated successfully!')
            } else {
                setUploadStatus(`Upload failed: ${data.error}`);
            }
        } catch (error) {
            console.error('Error during upload:', error);
            setUploadStatus('An error occurred during upload.');
        }
    };

    return (
        <div className=' card  mb-6 p-4 flex flex-col'>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload} hidden={!selectedFile} disabled={!selectedFile} className=' bg-blue-500 py-2 disabled:opacity-45 '>
                Upload PDF
            </button>
            <p>{uploadStatus}</p>
        </div>
    );
}
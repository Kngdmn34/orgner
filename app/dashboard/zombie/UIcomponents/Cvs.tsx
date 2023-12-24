'use client'

import React, { useState } from 'react';
import Papa from 'papaparse';
import { IoMdDownload } from "react-icons/io";
import axios from 'axios';
import toast from 'react-hot-toast';






const Cvs = () => {


    const [file, setFile] = useState<FileList | null>(null)



    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const uploadfile = e.target.files;
        if (uploadfile) {
            setFile(uploadfile)
        }


    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (file)// Handle the form submission here, e.g., send data to the server using axios
            {
                const formData = new FormData();
                formData.append('file', file[0])
                const response = await axios.post('/api/zombie/bulk', formData);
                console.log(response.data);
                toast.success('Employee Added Successfully')
            }
        } catch (error) {
            console.error('Error while posting data:', error);
            toast.error('Failed to add employees');
        }
    };




    const acceptedFiles = ".cvs, .xls";
    return (
        <div style={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
                <input type="file" accept={acceptedFiles} onChange={handleFileUpload} />
                <button type="submit" className="border p-1 rounded-lg hover:bg-gray-600">
                    <IoMdDownload />
                </button>
            </form>
        </div>
    )
}

export default Cvs
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button,message } from "antd";
import axios from "axios";

import '../styles/AddDataFromExcel.css'

const AddDataFromExcel = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        const allowedExtensions = ['.xlsx', '.xls'];
        const fileExtension = selectedFile.name.split('.').pop();
        const isExcelFile = allowedExtensions.includes(`.${fileExtension.toLowerCase()}`);
        const maxSizeInBytes = 2 * 1024 * 1024;

        if(isExcelFile && selectedFile.size < maxSizeInBytes){
            setSelectedFile(selectedFile);
        }else{
            messageApi.warning('Select valid excel file', 10000);
        }
    };

    const handleFileUpload = async () => {
        if(selectedFile !== null){
            try{
                const formData = new FormData();
                formData.append('file', selectedFile);
                await axios.post(`http://localhost:8080/upload`, formData);
                navigate('/dashboard')
            }catch (err){
                console.error(err);
            }
        }
    };

    return(
        <div className="file-upload-container">
            {contextHolder}
            <span className="upload-message">Select the Excel file you want to upload</span>
            <input className="file-input" type="file" onChange={handleFileChange} />
            <Button className="upload-button" onClick={handleFileUpload}>Upload</Button>
        </div>
    )
}

export default AddDataFromExcel;
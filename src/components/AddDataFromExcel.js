import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";
import axios from "axios";

const AddDataFromExcel = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        try{
            const formData = new FormData();
            formData.append('file', selectedFile);
            await axios.post(`http://localhost:8080/upload`, formData);
            navigate('/dashboard')
        }catch (err){
            console.error(err);
        }
    };

    return(
        <div>
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleFileUpload}>Upload</Button>
        </div>
    )
}

export default AddDataFromExcel;
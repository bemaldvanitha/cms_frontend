import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Space} from "antd";

const TableButton = ({ text, record }) => {
    const navigate = useNavigate();

    const handleEdit = (record) => {
        navigate(`/update/${record.id}`)
    };

    const handleView = (record) => {
        navigate(`/user/${record.id}`);
    };

    return(
        <Space size="small">
            <Button type="primary" onClick={() => handleEdit(record)}>
                Edit
            </Button>
            <Button type="default" onClick={() => handleView(record)}>
                View
            </Button>
        </Space>
    )
}

export default TableButton;
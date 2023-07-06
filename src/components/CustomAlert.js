import React from "react";
import { Alert } from "antd";

const CustomAlert = ({ description }) => {
    return(
        <Alert
            message="Validation Error"
            description={ description }
            type="error"
            showIcon
            style={{ marginBottom: '1rem' }}
        />
    )
}

export default CustomAlert;
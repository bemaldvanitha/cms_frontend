import React from "react";

const InfoItem = ({ label, value }) => {
    return(
        <div className="info-item">
            <p className="info-label">{ label }</p>
            <p className="info-value">{ value }</p>
        </div>
    )
}

export default InfoItem;
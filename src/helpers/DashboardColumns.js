import React from "react";
import TableButton from "../components/TableButton";


export const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Date of Birth', dataIndex: 'date_of_birth', key: 'date_of_birth' },
    { title: 'NIC Number', dataIndex: 'nic_number', key: 'nic_number' },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => {
            return(
                <TableButton text={text} record={record}/>
            )
        },
    },
];
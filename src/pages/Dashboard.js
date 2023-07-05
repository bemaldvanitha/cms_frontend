import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space, Empty } from "antd";
import axios from "axios";

import '../styles/Dashboard.css';

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:8080/api/customers');
                const customersList = response.data;
                let newCustomerList = [];
                customersList.forEach((cus) => {
                    let customer = {
                        ...cus,
                        date_of_birth: cus.dateOfBirth,
                        nic_number: cus.nicNumber
                    }
                    newCustomerList.push(customer);
                });
                setCustomers(newCustomerList);
            }catch (err){
                console.error(err);
            }
        }

        fetchData();
    },[]);

    const columns = [
        { title: 'Id', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Date of Birth', dataIndex: 'date_of_birth', key: 'date_of_birth' },
        { title: 'NIC Number', dataIndex: 'nic_number', key: 'nic_number' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="small">
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="default" onClick={() => handleView(record)}>
                        View
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (record) => {
        navigate(`/update/${record.id}`)
        console.log('Edit record:', record);
    };

    const handleView = (record) => {
        navigate(`/user/${record.id}`);
        console.log('View record:', record);
    };

    return(
        <div className="customer-table">
            {
                customers.length === 0 ? <Empty/> :
                    <Table dataSource={customers} columns={columns} rowKey="id"/>
            }

        </div>
    )
}

export default Dashboard;
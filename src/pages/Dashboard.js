import React, { useEffect, useState } from "react";
import { Table, Empty } from "antd";

import '../styles/Dashboard.css';

import { columns } from '../helpers/DashboardColumns';
import { fetchData } from "../helpers/fetchAllRecords";

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { newCustomerList } = await fetchData();
            setCustomers(newCustomerList);
        }
        getData();
    },[]);

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
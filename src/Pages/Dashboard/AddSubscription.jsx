import { Input, Table } from 'antd'
import React, { useState } from 'react'
import { FiEye, FiSearch } from 'react-icons/fi'
import { LuRefreshCw } from 'react-icons/lu';
import avater from '../../assets/avater.png';
import { RiEditLine } from 'react-icons/ri';
const data = [
    {
        key: "1",
        name: "Basic Membership",
        price: "40 CND",
    },
    {
        key: "2",
        name: "Standard Membership",
        price: "80 CND",
    },
    {
        key: "2",
        name: "Premium Membership",
        price: "100 CND",
    },
]

const AddSubscription = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    }
    const columns = [
        {
            title: "S.No",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "pakg",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "",
            render: (_, record) => (
              <button style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                background:'transparent',
                border:'none',
                cursor:'pointer'
              }}>
                <RiEditLine style={{
                    fontSize:'22px'
                }} />
              </button>
            )
        },
    ];
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0" }}>
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>All Products</h1>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </div>
        </div>
    )
}
export default AddSubscription

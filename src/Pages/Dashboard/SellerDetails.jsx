import React, { useState } from 'react'
import BackButton from './BackButton';
import { AiOutlineStock } from "react-icons/ai";
import { Dropdown } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { IoBagCheck } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdAccountBalanceWallet } from "react-icons/md";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    AreaChart,
    Area,
    ResponsiveContainer,
} from 'recharts';
import SellingProductList from '../../Components/SellerDetails/SellingProductList';

const data = [
    {
      name: '1',
      uv: 400,
      pv: 2400,
      amt: 2400,
    },
    {
      name: '2',
      uv: 300,
      pv: 1398,
      amt: 2210,
    },
    {
      name: '3',
      uv: 200,
      pv: 9800,
      amt: 2290,
    },
    {
      name: '4',
      uv: 278,
      pv: 3908,
      amt: 2000,
    },
    {
      name: '5',
      uv: 189,
      pv: 4800,
      amt: 2181,
    },
    {
      name: '6',
      uv: 239,
      pv: 3800,
      amt: 2500,
    },
    {
      name: '7',
      uv: 349,
      pv: 4300,
      amt: 2100,
    },
];

const SellerDetails = () => {
    const [year, setYear] = useState( new URLSearchParams(window.location.search).get('year') || 2024)
    const onClick = ({ key }) => {
        setYear(key)
        window.history.pushState(null, "", `?year=${year}`);
    };

    const items = [
        {
          label: 2023,
          key: "2023",
        },
        {
          label: 2024,
          key: "2024",
        },
        {
          label: 2025,
          key: "2025",
        },
        {
          label: 2026,
          key: "2026",
        },
    ];

    const newData= [
        {
            name: "Total Products Sales",
            icon: <IoBagCheck size={23} color='#2FD5C7' />,
            balance: 12500,
            trade: "35%"
        },
        {
            name: "Total Balance",
            icon: <MdOutlineAccountBalanceWallet size={23} color='#2FD5C7' />,
            balance: 12500,
            trade: "35%"
        },
        {
            name: "Delivered Products",
            icon: <MdAccountBalanceWallet size={23} color='#2FD5C7' />,
            balance: 12500,
            trade: "35%"
        },
        {
            name: "Ponding Order ",
            icon: <CiDeliveryTruck size={23} color='#2FD5C7' />,
            balance: 12500,
            trade: "35%"
        },
    ]
    return (
        <div>
            <div style={{marginBottom: "15px"}}>
                <BackButton link='/seller-list' />
            </div>
            
            <div style={{marginBottom: "10px", display: "flex", alignItems: "center", gap: "20px"}}>

                {/* seller details section */}
                <div style={{
                    width: "100%",
                    height: "334px",
                    backgroundColor: "white",
                    padding: "18px",
                    borderRadius: "8px"
                }}>
                    <div
                        style={{
                            width: "131px",
                            margin: "0 auto 11px auto"
                        }}
                    >
                        <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <img 
                                src="https://cdn.retouchme.com/blogs/55-1657818846-lg.webp" 
                                style={{width: "69px",  textAlign:"center", height: "69px", borderRadius: "100%", margin: "0 auto 0 auto"}} 
                                alt="profile"
                            />
                        </div>
                        <p style={{fontSize: "16px", textAlign:"center", fontWeight: 600, color: "#494949"}}>Hasan Mahmud</p>
                        <div 
                            style={{
                                color: "#6A6D7C",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                marginBottom: "4px"
                            }}
                        >
                            <HiOutlineLocationMarker  size={24} />
                            <p>Location</p>
                        </div>
                        <p style={{fontSize: "12px",  textAlign:"center", fontWeight: 400, color: "#6A6D7C"}}>info@gmail.com</p>
                    </div>

                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        {
                            newData.map((item, index)=>
                            <div
                                style={{
                                    width: "171px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "20px",
                                    padding: "18px"
                                }}
                            >
                                <div 
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        background: "#E8E8E8",
                                        borderRadius: "8px",
                                        display: "flex", alignItems: "center", justifyContent: "center"
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <p style={{margin: "4px 0 8px 0", color: "#6A6D7C",  fontSize: "12px", fontWeight: 400}}>{item?.name}</p>
                                <p style={{ fontSize: "16px", fontWeight: 500}}>$ {item?.balance}</p>
                                <p style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "8px", fontWeight: 400, color: "#16C098"}}><AiOutlineStock size={16} />  {item?.trade}</p>
                            </div>
                            )
                        }
                        
                    </div>
                </div>
                
                {/* overall sales section  */}
                <div style={{
                    width: "100%",
                    height: "334px",
                    backgroundColor: "white",
                    padding: "12px",
                    borderRadius: "8px"
                }}>
                    <div style={{display : "flex", alignItems: "center", justifyContent : "space-between"}}>
                        <p style={{marginBottom: "7px", color: '#6A6D7C', fontSize: "12px", fontWeight: 400}}>Overall Sales</p>
                        <Dropdown menu={{ items, onClick }} >
                            <p style={{
                                cursor: "pointer", 
                                color:'#717171', 
                                border: "1px solid #E9E9E9",
                                borderRadius: "4px",
                                padding: "4px 12px"
                            }} onClick={(e) => e.preventDefault()}
                            >
                                {year}
                                <DownOutlined style={{paddingLeft: "18px"}} color='#717171' />
                            </p>
                        </Dropdown>
                    </div>
                    
                    <div style={{display: "flex", alignItems:"center", gap: "20px"}}>
                        <p style={{marginBottom: "7px", color: '#6A6D7C', fontSize: "24px", fontWeight: 700}}>$348,253.65</p>
                        <p style={{marginBottom: "7px", color: '#2FD5C7', fontSize: "14px", fontWeight: 400, display: "flex", gap:"8px", alignItems: "center"}}><AiOutlineStock size={16} /> 13.02%</p>
                    </div>

                    <div style={{width: "100%", height: "100%"}}>
                        <LineChart
                            width={780}
                            height={230}
                            data={data}
                            syncId="anyId"
                            margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3" />
                            <XAxis dataKey="name" />
                            <YAxis dataKey="amt" />
                            <Tooltip />
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                        </LineChart>
                    </div>
                </div>
            </div>

            <SellingProductList/>
        </div>
    )
}

export default SellerDetails
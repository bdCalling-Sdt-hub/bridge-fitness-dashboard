import React, { useEffect, useState } from 'react';
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const data = [
  {
    name: 'Jan',
    uv: 20,
    mt: 10,
  },
  {
    name: 'Feb',
    uv: 30,
    mt: 20,
  },
  {
    name: 'Mar',
    uv: 90,
    mt: 30,
  },
  {
    name: 'Apr',
    uv: 100,
    mt: 40,
  },
  {
    name: 'May',
    uv: 30,
    mt: 50,
  },
  {
    name: 'Jun',
    uv: 10,
    mt: 60,
  },
  {
    name: 'Aug',
    uv: 15,
    mt: 70,
  },
  {
    name: 'Sep',
    uv: 20,
    mt: 80,
  },
  {
    name: 'Nov',
    uv: 30,
    mt: 90,
  },
  {
    name: 'Dec',
    uv: 10,
    mt: 100,
  },
];


export default function DailyRentChart() {
  const [year, setYear] = useState(2024)

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
  const onClick = ({ key }) => {
    setYear(key)
  };

  return (
    <div style={{
      background:'white',padding:'10px' ,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: 'relative' }}>
        <p style={{ marginTop: "10px", fontSize: "20px", fontWeight: 600, marginBottom: "10px", color: "black", }}>Subscription Growth</p>
        <div style={{
          position: 'absolute',
          right: '0',
          top: '0'
        }}>
          <Dropdown menu={{ items, onClick }} >
            <p style={{
              cursor: "pointer",
              color: '#717171',
              border: "1px solid #E9E9E9",
              borderRadius: "4px",
              padding: "4px 12px"
            }} onClick={(e) => e.preventDefault()}
            >
              {year}
              <DownOutlined style={{ paddingLeft: "18px" }} color='#717171' />
            </p>
          </Dropdown>
        </div>
      </div>
      <div style={{
        marginLeft: '-40px',
        width: '100%',
        height:'300px'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={660}
            height={192}
            data={data}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Area type="monotone" dataKey="uv" stroke="#0044B4" fill="#0044B4" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )

}
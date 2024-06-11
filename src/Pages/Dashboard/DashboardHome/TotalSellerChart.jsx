import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { UserGrowth } from "../../../ReduxSlices/DashboardHomePage/UserGrowthSlice";

const TotalSellerChart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserGrowth());
  }, []);

  const userGrowth = useSelector((state) => state.UserGrowth.userData);
  console.log(userGrowth);

  const data = userGrowth?.map((user) => ({
    name: user.month,
    pv: user.count,
    amt: 10,
  }));

  // const data = [
  //   {
  //     name: "Jan",
  //     uv: 4000,
  //     pv: 2400,
  //     tv: 1200,
  //     amt: 10,
  //   },
  //   {
  //     name: "Feb",
  //     uv: 3000,
  //     pv: 1398,
  //     tv: 1200,
  //     amt: 20,
  //   },
  //   {
  //     name: "Mar",
  //     uv: 2000,
  //     pv: 9800,
  //     tv: 1200,
  //     amt: 30,
  //   },
  //   {
  //     name: "Apr",
  //     uv: 2780,
  //     pv: 3908,
  //     tv: 1200,
  //     amt: 40,
  //   },
  //   {
  //     name: "May",
  //     uv: 1890,
  //     pv: 4800,
  //     tv: 1200,
  //     amt: 50,
  //   },
  //   {
  //     name: "Jun",
  //     uv: 2390,
  //     pv: 3800,
  //     tv: 1200,
  //     amt: 60,
  //   },
  //   {
  //     name: "Jul",
  //     uv: 3490,
  //     pv: 4300,
  //     tv: 1200,
  //     amt: 70,
  //   },
  //   {
  //     name: "Aug",
  //     uv: 3490,
  //     pv: 4300,
  //     tv: 1200,
  //     amt: 80,
  //   },
  //   {
  //     name: "Sep",
  //     uv: 3490,
  //     pv: 4300,
  //     tv: 1200,
  //     amt: 90,
  //   },
  //   {
  //     name: "Oct",
  //     uv: 3490,
  //     pv: 4300,
  //     tv: 1200,
  //     amt: 100,
  //   },
  //   {
  //     name: "Nov",
  //     uv: 3490,
  //     pv: 4300,
  //     tv: 1200,
  //     amt: 110,
  //   },
  //   {
  //     name: "Dec",
  //     uv: 3490,
  //     pv: 4300,
  //     tv: 1200,
  //     amt: 120,
  //   },
  // ];

  const [year, setYear] = useState(2024);

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
    setYear(key);
  };

  return (
    <div
      style={{
        background: "white",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <p
          style={{
            marginTop: "10px",
            fontSize: "20px",
            fontWeight: 600,
            marginBottom: "10px",
            color: "black",
          }}
        >
          User Growth
        </p>
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "0",
          }}
        >
          <Dropdown menu={{ items, onClick }}>
            <p
              style={{
                cursor: "pointer",
                color: "#717171",
                border: "1px solid #E9E9E9",
                borderRadius: "4px",
                padding: "4px 12px",
              }}
              onClick={(e) => e.preventDefault()}
            >
              {year}
              <DownOutlined style={{ paddingLeft: "18px" }} color="#717171" />
            </p>
          </Dropdown>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "300px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={660} height={192} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar barSize={10} dataKey="pv" stackId="a" fill="#65d3ea" />
            {/* <Bar barSize={10} dataKey="uv" stackId="a" fill="#00a3db" />
            <Bar barSize={10} dataKey="tv" stackId="a" fill="#0044B4" /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalSellerChart;

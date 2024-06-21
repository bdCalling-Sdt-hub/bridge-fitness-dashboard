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

  const userGrowth = useSelector((state) => state?.UserGrowth?.userData);
  // console.log(userGrowth);

  const data = userGrowth?.data?.map((user) => ({
    name: user.month,
    pv: user.count,
    amt: 10,
  }));

  const [year, setYear] = useState(2024);

  const items = userGrowth.data
    ?.filter((growth) => growth.year >= 2000)
    .reduce((acc, year) => {
      if (!acc.some((item) => item.key === year.year)) {
        acc.push({ label: year.year, key: year.year });
      }
      return acc;
    }, []);

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
          {
            items?.length > 1 && <Dropdown menu={{ items, onClick }}>
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
          }

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

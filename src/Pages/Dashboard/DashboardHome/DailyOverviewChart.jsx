import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { SubscriptionGrowth } from "../../../ReduxSlices/DashboardHomePage/SubscriptionGrowthSlice";

export default function DailyRentChart() {
  const [year, setYear] = useState(2024);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SubscriptionGrowth());
  }, []);

  const subsGrowth = useSelector(
    (state) => state?.SubscriptionGrowth?.userData
  );
  const data = subsGrowth?.data?.map((subgrowth) => ({
    name: subgrowth.month,
    uv: subgrowth.count,
    mt: 10,
  }));

  const items = subsGrowth?.data
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
          Subscription Growth
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
          marginLeft: "-40px",
          width: "100%",
          height: "300px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart width={660} height={192} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#0044B4"
              fillOpacity={1}
              fill="#0044B4"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

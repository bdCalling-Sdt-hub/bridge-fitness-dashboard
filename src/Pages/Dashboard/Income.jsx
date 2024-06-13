import React, { useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { BsArrowUp } from "react-icons/bs";
// import { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Incomes } from "../../ReduxSlices/Income/IncomesSlice";
import { IncomeGrowth } from "../../ReduxSlices/Income/IncomeGrowthSlice";

const Income = () => {
  const dispatch = useDispatch();

  //   for all Income
  useEffect(() => {
    dispatch(Incomes());
  }, [dispatch]);

  const totalIncomes = useSelector((state) => state.TotalIncome.userData);
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  const data = [
    {
      id: 1,
      name: "All Income",
      count: kFormatter(`${totalIncomes.totalIncome}`),
      icon: <FaArrowUp size={16} />,
      btn: false,
      Percent: "18%",
      Color: "#10B981",
    },
    {
      id: 2,
      name: "Subscription Income",
      count: kFormatter(`${totalIncomes.totalSubscriptionIncome}`),
      icon: <FaArrowUp size={16} />,
      btn: "View details",
      path: "/subscription-income",
      btnicon: (
        <BsArrowUp
          style={{
            transform: "rotate(45deg)",
          }}
        />
      ),
      Percent: "25%",
      Color: "#10B981",
    },
    {
      id: 3,
      name: "Ecommerce Income ",
      count: kFormatter(`${totalIncomes.totalEcommerceIncome}`),
      icon: <FaArrowDown size={16} />,
      btn: "View details",
      path: "/ecommerce-income",
      btnicon: (
        <BsArrowUp
          style={{
            transform: "rotate(45deg)",
          }}
        />
      ),
      Percent: "7%",
      Color: "#D70000",
    },
  ];

  // for income Growth
  useEffect(() => {
    dispatch(IncomeGrowth());
  }, [dispatch]);

  const incomeGrowth = useSelector((state) => state.IncomeGrowth.userData);
  console.log(incomeGrowth);

  const chartData = incomeGrowth?.data?.analytics?.map((growth) => ({
    name: growth.month,
    uv: growth.totalSubscriptionAmount,
    pv: growth.totalOrderAmount,
    amt: growth.year,
  }));

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          padding: "0 30px",
          // flexWrap: "wrap",
        }}
      >
        {data.map((item, index) => (
          <div
            key={item.id}
            className={`${
              index === data.length - 1 ? "" : "borderLeft"
            } income-card`}
            style={{
              background: "transparent",
              borderRadius: "0px",
              padding: "70px 0",
              minWidth: "400px",
              position: "relative",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "600",
                  color: "#50525D",
                  textAlign: "left",
                }}
              >
                {item.count}{" "}
              </p>
              <div
                style={{
                  color: `${item?.Color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  marginTop: "-15px",
                  marginRight: "-60px",
                }}
              >
                {item?.icon} <p>{item?.Percent}</p>
              </div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#B47000",
                  textAlign: "left",
                  marginTop: "10px",
                }}
              >
                {item.name}
              </p>
              {item?.btn && (
                <Link
                  to={item?.path}
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "5px",
                    background: "transparent",
                    border: "none",
                    color: "#0044B4",
                    position: "absolute",
                    bottom: "27px",
                    right: "80px",
                  }}
                >
                  {item?.btn} {item?.btnicon}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          width: "100%",
          height: "600px",
          padding: "20px 0px",
          background: "white",
          marginTop: "20px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="pv"
              fill="#B47000"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="uv"
              fill="#0044B4"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Income;

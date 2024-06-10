import { Col, Row } from "antd";
import React, { useEffect } from "react";
import "./DashboardHome.css";
import TotalSellerListTable from "../../../Components/Dashboard/TotalSellerListTable";
import TotalSellerChart from "./TotalSellerChart";
import DailyOverviewChart from "./DailyOverviewChart";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { NewSubcriber } from "../../../ReduxSlices/DashboardHomePage/HomeSlice";
function DashboardHome() {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(NewSubcriber());
  }, [dispatch]);

  const user = useSelector((state) => state.NewSubscriber.userData);
  console.log(user);

  const KFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  const data = [
    {
      name: "Total User",
      count: `${user.users}`,
      icon: <FaArrowUp size={16} />,
      Percent: "18%",
      Color: "#10B981",
    },
    {
      name: "Total Subscriber",
      count: user.subscribers,
      icon: <FaArrowUp size={16} />,
      Percent: "25%",
      Color: "#10B981",
    },
    {
      name: "Total Selling Products",
      count: user.totalSellingProduct,
      icon: <FaArrowDown size={16} />,
      Percent: "7%",
      Color: "#D70000",
    },
    {
      name: "Total Earning",
      count: KFormatter(user.totalEarning),
      icon: <FaArrowDown size={16} />,
      Percent: "7%",
      Color: "#D70000",
    },
  ];

  return (
    <div>
      <div
        style={{
          padding: "0 12px",
          boxSizing: "border-box",
        }}
      >
        <Row gutter={26}>
          {data.map((item, index) => (
            <Col
              style={{
                backgroundColor: "#fbfbfb",
                margin: "0 auto",
                padding: "0px 10px",
              }}
              key={index}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 6 }}
            >
              <div
                className={`${
                  index === data.length - 1 ? "" : "borderLeft"
                } income-card`}
                style={{
                  background: "transparent",
                  borderRadius: "0px",
                  padding: "70px 0",
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
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div
        style={{
          margin: "20px 0px",
        }}
      >
        <Row gutter={26}>
          <Col xs={{ flex: "100%" }} sm={{ flex: "50%" }}>
            <DailyOverviewChart />
          </Col>
          <Col xs={{ flex: "100%" }} sm={{ flex: "50%" }}>
            <TotalSellerChart />
          </Col>
        </Row>
      </div>
      <TotalSellerListTable Subscribers={user} />
    </div>
  );
}

export default DashboardHome;

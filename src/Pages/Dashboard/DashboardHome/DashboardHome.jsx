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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(NewSubcriber());
  }, [dispatch]);

  const user = useSelector((state) => state.NewSubscriber.userData);
  const KFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };
 
  const data = [
    {
      name: "Total User",
      count: user?.totalUser?.[0]?.users || 0,
      icon: <FaArrowUp size={16} />,
      Percent: `${user?.totalUser?.[0]?.userGrowth}%` || '0%',
    },
    {
      name: "Total Female Users",
      count: `${user?.totalFemaleUsers?.[0]?.totalFemaleUsers}` || 0,
      icon: <FaArrowUp size={16} />,
      Percent: `${user?.totalFemaleUsers?.[0]?.femaleUserGrowth}%` || '0%',
    },
    {
      name: "Total Male Users",
      count: `${user?.totalMaleUsers?.[0]?.totalMaleUsers}` || 0,
      icon: <FaArrowUp size={16} />,
      Percent: `${user?.totalMaleUsers?.[0]?.maleUserGrowth}%` || '0%',
    },
    {
      name: "basic subscriber",
      count: `${user?.subscriptionByType?.[0]?.basic?.basicSubscriber}` || 0,
      icon: <FaArrowUp size={16} />,
      Percent: `${user?.subscriptionByType?.[0]?.basic?.basicSubscriberGrowth}%` || '0%',
    },
    {
      name: "standard subscriber",
      count: `${user?.subscriptionByType?.[0]?.standard?.standardSubscriber}` || 0,
      icon: <FaArrowUp size={16} />,
      Percent: `${user?.subscriptionByType?.[0]?.standard?.standardSubscriberGrowth}%` || '0%',
    },
    {
      name: "premium subscriber",
      count: `${user?.subscriptionByType?.[0]?.premium?.premiumSubscriber}` || 0,
      icon: <FaArrowUp size={16} />,
      Percent: `${user?.subscriptionByType?.[0]?.premium?.premiumSubscriberGrowth}%` || '0%',
    },
    {
      name: "Total Subscriber",
      count: user?.subscribers?.[0]?.subscribers || 0,
      icon: <FaArrowUp size={16} />,
      Percent: `${user?.subscribers?.[0]?.subscriberGrowth}%` || `0%`,
    },
    {
      name: "Total Selling Products",
      count: user?.totalSellingProduct?.[0]?.totalSellingProduct || 0,
      icon: <FaArrowUp size={16} />,
      Percent: `${user?.totalSellingProduct?.[0]?.sellingProductGrowth}%` || '0%',
    },
    {
      name: "Total Earning",
      count: `$${user?.totalEarning?.[0]?.totalEarning}` || 0,
      icon: <FaArrowUp size={16} />,
      Percent: `${user?.totalEarning?.[0]?.earningGrowth}%` || '0%',
    },
  ];
  return (
    <div>
      <div
        style={{
          padding: "0",
          boxSizing: "border-box",
        }}
      >
        <div className="grid grid-cols-3 gap-2 w-full">
          {
            data.map((item, index) => <div className={`p-4 w-full flex justify-start items-center px-8 gap-5 bg-white rounded-md`} key={index}>
              <div>
                <p style={{
                  fontSize: "32px",
                  fontWeight: "600",
                  color: "#50525D",
                  textAlign: "left",
                }}>{item?.count}</p>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#B47000",
                  textAlign: "left",
                  marginTop: "20px",
                }}>{item?.name}</h3>
              </div>
              <div className="text-[#10B981]">
                <p className="flex justify-start items-start gap-1"> {item?.icon}{item?.Percent}</p>
              </div>
            </div>)
          }
        </div>
        {/* <Row gutter={26}>
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
                className={`${index === data.length - 1 ? "" : "borderLeft"
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
        </Row> */}
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

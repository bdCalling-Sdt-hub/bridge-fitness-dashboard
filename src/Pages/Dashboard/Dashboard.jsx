import { Layout, Badge, } from "antd";
import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/icon/logo.png";
import { HiLogout, HiOutlineMail } from "react-icons/hi";
import { LuDatabase, LuUser } from "react-icons/lu";
import { TbUserPlus } from "react-icons/tb";
import { MdDashboard, MdOutlineManageHistory, MdOutlineSignalCellularAlt } from "react-icons/md";
import { IoSpeedometerOutline } from "react-icons/io5";
import { RiNotification2Line, RiChat1Line, RiCopperDiamondLine } from "react-icons/ri";
const { Header, Sider, Content } = Layout;
import { IoSettingsOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LiaProductHunt } from "react-icons/lia";
const Dashboard = () => {
  const [dropdown, setDropdown] = useState(false)
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate('/login');
    window.location.reload();
  }
  const settingOptions = [
    {
      title: "About Us",
      path: "/about",
    },
    {
      title: "Contact Us",
      path: "/contact",
    },
    {
      title: "FAQ",
      path: "/faq",
    },
    {
      title: "Privacy Policy",
      path: "/privacy",
    },
    {
      title: "Terms & Condition",
      path: "/terms-condition",
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ]
  const linkItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MdDashboard size={24} />,
    },
    {
      title: "All User",
      path: "/user-list",
      icon: <LuUser size={24} />,
    },
    {
      title: "Make Admin",
      path: "/make-admin",
      icon: <TbUserPlus size={24} />,
    },
    {
      title: "Manage Order",
      path: "/manage-order",
      icon: <MdOutlineManageHistory size={24} />,
    },
    {
      title: "Add Subscription",
      path: "/add-subscription",
      icon: <MdOutlineSignalCellularAlt size={24} />,
    },
    {
      title: "Income",
      path: "/income",
      icon: <LuDatabase size={24} />,
    },
    {
      title: "Manage Class",
      path: "/class-management",
      icon: <IoSpeedometerOutline size={24} />,
    },
    {
      title: "Manage Product",
      path: "/manage-products",
      icon: <LiaProductHunt size={24} />,
    },
    {
      title: "Email",
      path: "/emails",
      icon: <HiOutlineMail size={24} />,
    },
    {
      title: "Pricing",
      path: "/package",
      icon: <RiCopperDiamondLine size={24} />,
    }
  ];

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider
        width="233px"
        trigger={null}
        style={{
          overflow: "auto",
          position: "fixed",
          height: "100vh",
          overflowY: "hidden",
          zIndex: 2,
          backgroundColor: "#242424",
          // boxSizing:'border-box',
          // paddingRight:15
        }}
      >
        <>
          <Link style={{
            width: '100%',
            marginBottom: "30px",
            marginTop: '20px',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }} className="block">
            <img
              src={Logo}
              height="50px"
              width="50%"
            />
          </Link>
        </>


        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            height: "100%",
            marginTop: 0
          }}
        >
          {linkItems.map((item, index) => (
            <li
              key={index}
              style={{
                width: "100%",
                height: "34px",
                position: "relative",
                padding: "0px 10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {
                item.path === pathname && !dropdown
                  ?
                  <div style={{ backgroundColor: "#FFF ", position: "absolute", left: 0, top: 3, width: "6px", height: "35px", borderRadius: "0 10px 10px 0" }}></div>
                  :
                  null

              }
              <Link onClick={() => setDropdown(false)}
                to={item.path}
                style={{
                  display: "flex",
                  color: "#F2F2F2",
                  alignItems: "center",
                  margin: "auto  0 auto 0",
                  gap: "14px",
                  backgroundColor: item.path === pathname && !dropdown ? "#B47000" : '#2F2F2F',
                  padding: '10px 14px',
                  width: "100%"

                }}
              >
                <div style={{ height: "24px", }}>{item.icon}</div>
                <div style={{ fontSize: "14px", textAlign: "center", height: "fit-content" }}>{item.title}</div>
              </Link>
            </li>

          ))}

          <li onClick={() => setDropdown(!dropdown)}
            style={{
              width: "100%",
              height: "34px",
              position: "relative",
              padding: "0px 10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {
              dropdown
                ?
                <div style={{ backgroundColor: "#FBFBFB", position: "absolute", left: 0, top: 0, width: "6px", height: "38px", borderRadius: "0 10px 10px 0" }}></div>
                :
                null

            }
            <div style={{
              width: "100%",
              marginTop: 0,
              height: "38px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "47px",
              position: "relative",
              gap: "14px",
              color: "#F2F2F2",
              cursor: "pointer",
              padding: '14px 14px',
              backgroundColor: dropdown ? "#B47000" : '#2F2F2F',
            }}>
              <IoSettingsOutline size={24} />

              <p style={{ fontSize: "15px", textAlign: "center", }}>Settings</p>
              {
                dropdown
                  ?
                  <MdKeyboardArrowDown size={24} />
                  :
                  <MdKeyboardArrowRight size={24} />
              }
            </div>
            {
              dropdown
              &&
              <div
                style={{
                  position: "absolute",
                  left: "0px",
                  top: "40px",
                  width: '100%',
                  padding: "0px 10px",
                }}
              >
                {
                  settingOptions?.map((item, index) => <Link key={index} to={item?.path} style={{
                    textAlign: 'center',
                    color: '#242424',
                    width: '100%',
                    backgroundColor: item.path === pathname ? "#E8D3B0" : '#FBFBFB',
                    display: 'block',
                    padding:'6px 0px'
                  }}>
                    <p>{item?.title}</p>
                  </Link>)
                }
              </div>
            }


          </li>

          <li
            style={{
              width: "100%",
              left: "0",
              position: "absolute",
              bottom: "53px",
            }}
          >

            <div onClick={handleLogOut} style={{ display: "flex", width: "fit-content", margin: "0 auto 0 auto", alignItems: "center", gap: "14px", cursor: "pointer", justifyContent: "center" }}>
              <div style={{ color: "#F2F2F2", fontSize: "14px" }}>Logout</div>
              <HiLogout color="#F2F2F2" size={24} />
            </div>
          </li>

        </ul>

      </Sider>


      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100vw",
            height: "80px",
            zIndex: 1,
            padding: 0,
            background: "#FEFEFE",
            display: "flex",
            justifyContent: "end",
            paddingRight: "60px",
            paddingLeft: "270px",
          }}
        >
          <div
            style={{
              width: "280px",
              display: "flex",
              alignItems: "center",
              // gap: "16px",
              justifyContent: "space-between"
            }}
          >
            <Badge color="#23A095" count={5}>
              <Link to="/emails" >
                <RiChat1Line color="#6A6A6A" size={24} />
              </Link>
            </Badge>

            <Badge color="#C30303" count={5}>
              <Link to="/notification" >
                <RiNotification2Line color="#6A6A6A" size={24} />
              </Link>
            </Badge>
            <div
              style={{
                width: "170px",
                height: "42px",

                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "10px"
              }}
            >
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLotvhr2isTRMEzzT30Cj0ly77jFThGXr0ng&usqp=CAU" style={{ width: "30px", height: "30px", borderRadius: "100%" }} alt="" />
              <h2 style={{ color: "black", fontSize: "10px" }}>DR. Jim ahhmed</h2>
            </div>
          </div>
        </Header>

        <Content
          style={{
            marginTop: "80px",
            marginBottom: "20px",
            marginLeft: "255px",
            marginRight: "40px",
            overflow: "auto",
            padding: "20px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;

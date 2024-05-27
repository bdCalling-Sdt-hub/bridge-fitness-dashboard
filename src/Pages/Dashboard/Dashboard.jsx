import { Layout, Badge, Modal, Input, } from "antd";
import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation, Form } from "react-router-dom";
import Logo from "../../assets/icon/logo.png";
import { HiLogout } from "react-icons/hi";
import { LuDatabase, LuUser } from "react-icons/lu";
import { TbUserPlus } from "react-icons/tb";
import { MdDashboard, MdDashboardCustomize, MdOutlineManageHistory, MdOutlineSignalCellularAlt } from "react-icons/md";
import { IoSpeedometerOutline } from "react-icons/io5";
import { RiNotification2Line } from "react-icons/ri";
const { Header, Sider, Content } = Layout;
import { IoSettingsOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LiaProductHunt } from "react-icons/lia";
import { useForm } from "react-hook-form";
import { IoIosDocument } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
const Dashboard = () => {
  const [dropdown, setDropdown] = useState(false)
  const [dropdown2, setDropdown2] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
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
    // {
    //   title: "Manage Class",
    //   path: "/class-management",
    //   icon: <IoSpeedometerOutline size={24} />,
    // },
    {
      title: "Manage Product",
      path: "/manage-products",
      icon: <LiaProductHunt size={24} />,
    },
  ];
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  return (// <input className="w-full p-4 border py-3 outline-none rounded-md" {...register("programName", { required: true })} />
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
            gap: "20px",
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
              <Link onClick={() => {
                setDropdown(false)
                setDropdown2(false)
              }}
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

          <li onClick={() => {
            setDropdown(false)
            setDropdown2(!dropdown2)
          }}
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
              dropdown2
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
              position: "relative",
              backgroundColor: dropdown2 ? "#B47000" : '#2F2F2F',
            }}>
              <MdDashboardCustomize size={24} />

              <p style={{ fontSize: "15px", textAlign: "center" }}>Create Program</p>
              {
                dropdown2
                  ?
                  <MdKeyboardArrowDown className="absolute top-[50%] right-0 translate-y-[-50%]" size={24} />
                  :
                  <MdKeyboardArrowRight className="absolute top-[50%] right-0 translate-y-[-50%]" size={24} />
              }
            </div>
            {
              dropdown2
              &&
              <div
                style={{
                  position: "absolute",
                  left: "0px",
                  top: "40px",
                  width: '100%',
                  padding: "0px 10px",
                  zIndex: '100'
                }}
              >
                <Link className="" to={`/create-program`} style={{
                  textAlign: 'center',
                  color: '#242424',
                  width: '100%',
                  backgroundColor: pathname === '/create-program' ? "#E8D3B0" : '#FBFBFB',
                  display: 'block',
                  padding: '6px 0px'
                }}>
                  <p>Create Program</p>
                </Link>
                <Link className="" to={`/series`} style={{
                  textAlign: 'center',
                  color: '#242424',
                  width: '100%',
                  backgroundColor: pathname === '/series' ? "#E8D3B0" : '#FBFBFB',
                  display: 'block',
                  padding: '6px 0px'
                }}>
                  <p>Create Series</p>
                </Link>
                {/* <Link className="" onClick={() => {
                  setOpenAddModal(true)
                }} style={{
                  textAlign: 'center',
                  color: '#242424',
                  width: '100%',
                  backgroundColor: '#FBFBFB',
                  display: 'block',
                  padding: '6px 0px'
                }}>
                  <p>Create Module</p>
                </Link> */}
              </div>
            }
          </li>
          <li onClick={() => {
            setDropdown2(false)
            setDropdown(!dropdown)
          }}
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
              position: "relative",
              backgroundColor: dropdown ? "#B47000" : '#2F2F2F',
            }}>
              <IoSettingsOutline size={24} />

              <p style={{ fontSize: "15px", textAlign: "center", }}>Settings</p>
              {
                dropdown
                  ?
                  <MdKeyboardArrowDown className="absolute top-[50%] right-0 translate-y-[-50%]" size={24} />
                  :
                  <MdKeyboardArrowRight className="absolute top-[50%] right-0 translate-y-[-50%]" size={24} />
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
                  zIndex: '100'
                }}
              >
                {
                  settingOptions?.map((item, index) => <Link key={index} to={item?.path} style={{
                    textAlign: 'center',
                    color: '#242424',
                    width: '100%',
                    backgroundColor: item.path === pathname ? "#E8D3B0" : '#FBFBFB',
                    display: 'block',
                    padding: '6px 0px'
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
              gap: "16px",
              justifyContent: "end"
            }}
          >
            <Badge color="#C30303" count={5}>
              <Link to="/notification" >
                <RiNotification2Line color="#6A6A6A" size={24} />
              </Link>
            </Badge>
            <Link to={'/admin-profile'}
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
            </Link>
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

      {/* <Modal
        centered
        onCancel={() => setOpenAddModal(false)}
        open={openAddModal}
        footer={false}
      >
        <div className='p-6'>
          <h1 className='text-2xl font-semibold' style={{ marginBottom: "12px" }}>Add New Module</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-2 items-start justify-start">
            
          </div>
            <p className='text-[#6D6D6D] py-1'>Series Name</p>
            <select className="w-full p-4 border py-3 outline-none rounded-md cursor-pointer" name="" id="">
              {[...Array(5).keys()].map(item => <option className="cursor-pointer" key={item} value="">Basic Membership</option>)}

            </select>
            {errors.programName && <p className="text-red-500">This field is required</p>}
            <div className="grid grid-cols-2 gap-2 items-start justify-start">
              <div>
                <p className='text-[#6D6D6D] py-1'>Title</p>
                <input className="w-full p-4 border py-3 outline-none rounded-md" {...register("title", { required: true })} />
                {errors.title && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <p className='text-[#6D6D6D] py-1'>Add video</p>
                <label for="video" className="btn">
                  <div className='border p-2 rounded-lg'>
                    <span className='flex justify-start items-center w-fit bg-[#DADADA] py-[6px] px-2 gap-2 rounded-md'>
                      <FaVideo /> browse video
                    </span>
                  </div>
                </label>
                <input className="hidden" id='video'
                  type="file"
                  {...register("video", { required: true })}
                />
                {errors.video && <p className="text-red-500">This field is required</p>}
              </div>
            </div>
            <div className="flex justify-center items-center mt-7">
              <input className="px-6 py-2 bg-[#B47000] text-white cursor-pointer" value={`Save`} type="submit" />
            </div>
          </form>
        </div>
      </Modal> */}
    </Layout>
  );
};
export default Dashboard;

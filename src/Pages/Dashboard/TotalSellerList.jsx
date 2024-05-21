import React, { useEffect, useRef, useState } from 'react';
import { FiEye, FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { Calendar, Dropdown, Input, Slider, Table } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { FaRegTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CiMenuKebab } from 'react-icons/ci';
import { LuRefreshCw } from "react-icons/lu";
import avater from '../../assets/avater.png';
import user from '../../assets/icon/user.png';
const data = [
  {
    key: "1",
    name: "Tushar",
    email: "tushar@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "General",
    selling: "500",
    balance: "600",
  },
  {
    key: "2",
    name: "Rahman",
    email: "rahman@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "Subscriber",
    selling: "500",
    balance: "600",
  },
  {
    key: "3",
    name: "Rafsan",
    email: "rafsan@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "General",
    selling: "500",
    balance: "600",
  },
  {
    key: "4",
    name: "jusef",
    email: "jusef@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "Subscriber",
    selling: "500",
    balance: "600",
  },
  {
    key: "5",
    name: "Asad",
    email: "asad@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "General",
    selling: "500",
    balance: "600",
  },
  {
    key: "6",
    name: "Fahim",
    email: "fahim@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "Subscriber",
    selling: "500",
    balance: "600",
  },
  {
    key: "7",
    name: "Nadir",
    email: "nadir@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "General",
    selling: "500",
    balance: "600",
  },
  {
    key: "8",
    name: "Tushar",
    email: "tushar@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "Subscriber",
    selling: "500",
    balance: "600",
  },
  {
    key: "9",
    name: "Rahman",
    email: "rahman@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "General",
    selling: "500",
    balance: "600",
  },
  {
    key: "10",
    name: "Rafsan",
    email: "rafsan@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "General",
    selling: "500",
    balance: "600",
  },
  {
    key: "11",
    name: "jusef",
    email: "jusef@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "Subscriber",
    selling: "500",
    balance: "600",
  },
  {
    key: "12",
    name: "Asad",
    email: "asad@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "Subscriber",
    selling: "500",
    balance: "600",
  },
  {
    key: "13",
    name: "Fahim",
    email: "fahim@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "General",
    selling: "500",
    balance: "600",
  },
  {
    key: "14",
    name: "Nadir",
    email: "nadir@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "General",
    selling: "500",
    balance: "600",
  },
  {
    key: "15",
    name: "Asad",
    email: "asad@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "Subscriber",
    selling: "500",
    balance: "600",
  },
  {
    key: "16",
    name: "Fahim",
    email: "fahim@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "Subscriber",
    selling: "500",
    balance: "600",
  },
  {
    key: "17",
    name: "Nadir",
    email: "nadir@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    photo: avater,
    location: "Banasree",
    status: "General",
    selling: "500",
    balance: "600",
  }
];

const TotalSellerList = () => {
  const [value, setValue] = useState(new URLSearchParams(window.location.search).get('date') || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(new URLSearchParams(window.location.search).get('category') || "All")
  const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
  const [open, setOpen] = useState();
  const [filter, setFilter] = useState(false);
  const [date, setDate] = useState(false);
  const dropdownRef = useRef();
  const items = [
    {
      label: "Package name",
      key: "All",
    },
    {
      label: "Car",
      key: "Car",
    },
    {
      label: "Bike",
      key: "Bike",
    },
    {
      label: "Cycle",
      key: "Cycle",
    },
  ];

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDate(false)
        setOpen("");
        setFilter(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span style={{
          display: 'flex',
          justifyContent: "start",
          alignItems: 'center',
          gap: '6px'
        }}>
          <img src={record.photo} alt="" />
          <span>
            {record.name}
          </span>
        </span>
      ),
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <p
          style={{
            color: record?.status === "General" ? "#0044B4" : "#B47000"
          }}
        >
          {record?.status}
        </p>
      )
    },
    {
      title: "ACTION",
      dataIndex: "printView",
      key: "printView",
      render: (_, record) => (
        <div style={{ position: "relative", display:'flex' ,justifyContent:'start',alignItems:'center',gap:'10px'}}>
          <FiEye onClick={(e) => (e.stopPropagation(), setOpen(record.key))} size={20} color='black' style={{ cursor: "pointer" }} />
          <img style={{
            width:'18px',
            cursor:'pointer'
          }} src={user} alt="" />
          <div
            onClick={(e) => e.stopPropagation()}
            ref={dropdownRef}
            style={{
              display: record?.key === open ? "block" : "none",
              width: "113px",
              height: "132px",
              borderRadius: "8px",
              zIndex: "2",
              position: "absolute",
              top: "12px",
              left: "-132px",
              background: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "10px 0",
              cursor: "pointer"

            }}
          >
            <p
              style={{
                width: "88px",
                height: "31px",
                borderRadius: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#E0F9F7",
                color: "#2FD5C7",
                margin: "0 auto 0 auto",
                cursor: "pointer",
                marginBottom: "8px"
              }}
            >
              Approve
            </p>
            <p
              onClick={handleDelete}
              style={{
                width: "88px",
                height: "31px",
                borderRadius: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFC3C3",
                color: "#9C0101",
                margin: "0 auto 0 auto",
                marginBottom: "8px"
              }}
            >
              Block
            </p>
            <Link to={`/seller-details/${record?.key}`}>
              <p
                style={{
                  width: "88px",
                  height: "31px",
                  borderRadius: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                  color: "black",
                  margin: "0 auto 0 auto",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                View
              </p>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set('page', page);
    window.history.pushState(null, "", `?${params.toString()}`);
  }

  const onClick = ({ key }) => {
    setCategory(key)
    const params = new URLSearchParams(window.location.search);
    params.set('category', key);
    window.history.pushState(null, "", `?${params.toString()}`);
  };



  const onSelect = (newValue) => {
    const date = newValue.format('MMM-DD-YYYY')
    setValue(date);
    const params = new URLSearchParams(window.location.search);
    params.set('date', date);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>All User</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

          <div
            style={{
              width: "304px",
              height: "40px",
              borderRadius: "8px",
              background: '#fefefe'
            }}
          >
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              prefix={<FiSearch size={14} color="#868FA0" />}
              style={{
                width: "100%",
                height: "100%",
                fontSize: "14px",
                border: 'none',
                outline: 'none',
              }}
              size="middle"
              value={search}
            />
          </div>
          <div
            style={{
              height: "40px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0px 18px",
              color: "#8B8B8B",
              background: '#fefefe',
            }}
          >
            <Dropdown menu={{ items, onClick }} >
              <p
                style={{
                  cursor: "pointer",
                  color: '#717171',
                  borderRadius: "4px",
                }}
                onClick={(e) => e.preventDefault()}
              >
                {category}
                <DownOutlined style={{ paddingLeft: "18px" }} color='#717171' />
              </p>
            </Dropdown>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            gap: '4px',
            height: '40px',
            background: '#fefefe',
            padding: '0 10px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            <button style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}>Data Refresh </button><LuRefreshCw />
          </div>
        </div>

      </div>
      <div
        style={{
          background: "white",
          padding: "20px",
        }}
      >
        <div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 10,
              defaultCurrent: parseInt(page),
              onChange: handlePageChange
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TotalSellerList
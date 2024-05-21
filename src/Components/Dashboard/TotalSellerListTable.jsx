import { Table, } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CiMenuKebab } from "react-icons/ci";
import avater from '../../assets/avater.png'
import { FiEye } from "react-icons/fi";
const data = [
  {
    key: "1",
    name: "Tushar",
    photo: avater,
    email: "tushar@gmail.com",
    contact:"(201) 555-0124",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  },
  {
    key: "2",
    name: "Rahman",
    photo: avater,
    email: "rahman@gmail.com",
    contact:"(201) 555-0124",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
  },
  {
    key: "3",
    name: "Rafsan",
    photo: avater,
    email: "rafsan@gmail.com",
    contact:"(201) 555-0124",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  },
  {
    key: "4",
    name: "jusef",
    photo: avater,
    email: "jusef@gmail.com",
    contact:"(201) 555-0124",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
  },
  {
    key: "5",
    name: "Asad",
    photo: avater,
    email: "asad@gmail.com",
    contact:"(201) 555-0124",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  },
  {
    key: "6",
    name: "Fahim",
    photo: avater,
    email: "fahim@gmail.com",
    contact:"(201) 555-0124",
    status: "Inactive",
    selling: "500",
    balance: "600",
  },
  {
    key: "7",
    name: "Nadir",
    photo: avater,
    email: "nadir@gmail.com",
    contact:"(201) 555-0124",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  }
];

const TotalSellerListTable = () => {
  const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
  const [open, setOpen] = useState();
  const dropdownRef = useRef();
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
          gap:'6px'
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
      title: "Contact Number",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "ACTION",
      dataIndex: "printView",
      key: "printView",
      render: (_, record) => (
        <div style={{ position: "relative",width:'100%' }}>
          <FiEye  onClick={(e) => (e.stopPropagation(), setOpen(record.key))} size={20} color='black' style={{ cursor: "pointer"}} />

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
              left: "-130px",
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen("");
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ height: "fit-content", background: "white", padding: "15px 24px 0 24px" ,width:'100%'}}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "15px", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>New Subscriber</h1>
        <Link to="/seller-list">
          <p style={{ color: "#2FD5C7", fontSize: "12px", textDecoration: "underline" }}>VIEW ALL</p>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 4,
          defaultCurrent: parseInt(page),
          onChange: handlePageChange
        }}
      />
    </div>
  )

};
export default TotalSellerListTable;

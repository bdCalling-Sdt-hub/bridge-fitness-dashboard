import { Table } from 'antd';
import React, { useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import BackButton from './BackButton';

const data = [
    {
      key: "1",
      name: "Tushar ",
      email: "tushar@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "In Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "2",
      name: "Rahman",
      email: "rahman@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "In Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "3",
      name: "Rafsan",
      email: "rafsan@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "In Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "4",
      name: "jusef",
      email: "jusef@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "Out Of Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "5",
      name: "Asad",
      email: "asad@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "Out Of Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "6",
      name: "Fahim",
      email: "fahim@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "Out Of Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "7",
      name: "Nadir",
      email: "nadir@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "In Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "8",
      name: "Tushar ",
      email: "tushar@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "In Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "9",
      name: "Rahman",
      email: "rahman@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "In Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "10",
      name: "Rafsan",
      email: "rafsan@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "In Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "11",
      name: "jusef",
      email: "jusef@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "Out Of Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "12",
      name: "Asad",
      email: "asad@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "Out Of Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "13",
      name: "Fahim",
      email: "fahim@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "Out Of Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
    {
      key: "14",
      name: "Nadir",
      email: "nadir@gmail.com",
      date: "18 Jul, 2023  4:30pm",
      location: "Banasree",
      status: "In Stock",
      selling: "500",
      balance: "600",
      image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    }
];
const Notification = () => {
  const [page, setPage] = useState( new URLSearchParams(window.location.search).get('page') || 1);

  const columns = [
        {
          title: "S.No",
          dataIndex: "key",
          key: "key",
        },
        {
          title: "Notification",
          dataIndex: "notification",
          key: "notification",
          render: (_,record) => (
            <div style={{display: "flex", alignItems: 'center', gap: "16px"}}>
                <img 
                    src={record.image} 
                    alt="" 
                    style={{
                        width: "45px", 
                        height: "45px", 
                        background: record.status === "In Stock" ?  "#03FB75" : "#FB0303" ,
                        borderRadius: "100%",
                    }}
                />
                <div>
                    <p>{record?.name}</p>
                    <p>{record?.email}</p>
                </div>
            </div>
          ),
        },
        {
          title: "Time-Date",
          dataIndex: "date",
          key: "date",
        },
        {
          title: "Actions",
          dataIndex: "status",
          key: "status",
          render: (_,record) => (
            <div style={{display: "flex", cursor: "pointer", width: "30px", borderRadius: "8px", border: "1px solid #D5D5D5", height: "30px", alignItems: 'center', justifyContent:"center"}}>
                <RiDeleteBin6Line size={16} color='#EF3826' />
            </div>
          ),
        }
  ];

  const handlePageChange=(page)=>{
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set('page', page);
    window.history.pushState(null, "", `?${params.toString()}`);
  }
    return (
        <div>
            
            <div style={{marginBottom: "24px"}}>
                <BackButton link="/" />
            </div>
            <div
                style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "14px"
                }}
            >
                <h1 style={{fontSize: "32px", fontWeight: 600, color: "#6A6D7C"}}>Notifications </h1>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    pagination={{
                      pageSize: 8,
                      defaultCurrent: parseInt(page),
                      onChange: handlePageChange
                    }}
                />
            </div>
        </div>
    )
}

export default Notification
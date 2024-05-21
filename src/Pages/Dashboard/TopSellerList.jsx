import React, { useEffect, useRef, useState } from 'react'
import BackButton from './BackButton'
import { Table } from 'antd'
import Swal from 'sweetalert2';
import { CiMenuKebab } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const data = [
    {
      key: "1",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      name: "Farrel Kurniawan",
      email: "farrel@gmail.com",
      price: "600",
      location: "Rampura",
      status: "available",
    },
    {
      key: "2",
      image: "https://img.freepik.com/free-photo/half-profile-image-handsome-young-caucasian-man-with-good-skin-brown-eyes-black-stylish-hair-stubble-posing-isolated-against-blank-wall-looking-front-him-smiling_343059-4560.jpg",
      name: "Yanto Jericho",
      email: "yanto@gmail.com",
      price: "600",
      location: "Banasree",
      status: "available",
    },
    {
      key: "3",
      image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?q=10&h=200",
      name: "Giring Furqon",
      price: "600",
      email: "giring@gmail.com",
      location: "Malibag",
      status: "available",
    },
    {
      key: "4",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT1GyNgHPJMCrWaIxdJqv4YF8nIoWi-HHpj7rSMOqvC9tiKg9xPNyB7IFhJnducb0doO8&usqp=CAU",
      name: "Alan Marcus",
      price: "600",
      location: "Magbazar",
      email: "alan@gmail.com",
      status: "available",
    },
    {
        key: "5",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT1GyNgHPJMCrWaIxdJqv4YF8nIoWi-HHpj7rSMOqvC9tiKg9xPNyB7IFhJnducb0doO8&usqp=CAU",
        name: "Dimas Kamal",
        price: "600",
        location: "Khilgaon",
        email: "dimas@gmail.com",
        status: "available",
      },
      {
        key: "6",
        image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?q=10&h=200",
        name: "Sohail Chowdhury",
        price: "600",
        location: "Basaboo",
        email: "sohail@gmail.com",
        status: "available",
    },
    {
        key: "7",
        image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?q=10&h=200",
        name: "Rina Karina",
        price: "600",
        location: "Badda",
        email: "rina@gmail.com",
        status: "available",
    },
    {
        key: "8",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT1GyNgHPJMCrWaIxdJqv4YF8nIoWi-HHpj7rSMOqvC9tiKg9xPNyB7IFhJnducb0doO8&usqp=CAU",
        name: "Yanto Jericho",
        price: "600",
        location: "Gulsan",
        email: "yanto@gmail.com",
        status: "available",
    },
    {
        key: "9",
        image: "https://img.freepik.com/free-photo/half-profile-image-handsome-young-caucasian-man-with-good-skin-brown-eyes-black-stylish-hair-stubble-posing-isolated-against-blank-wall-looking-front-him-smiling_343059-4560.jpg",
        name: "Google Pixel 7",
        price: "600",
        location: "Banani",
        email: "@gmail.com",
        status: "available",
    },
    {
        key: "10",
        image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?q=10&h=200",
        name: "Google Pixel 7 Pro",
        price: "600",
        location: "Danmondhi",
        email: "@gmail.com",
        status: "available",
    },
    {
        key: "11",
        image: "https://img.freepik.com/free-photo/half-profile-image-handsome-young-caucasian-man-with-good-skin-brown-eyes-black-stylish-hair-stubble-posing-isolated-against-blank-wall-looking-front-him-smiling_343059-4560.jpg",
        name: "Google Pixel 7 Pro",
        price: "600",
        selling: "500",
        location: "Kalabagan",
        email: "@gmail.com",
        status: "available",
    },
    {
        key: "12",
        email: "@gmail.com",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT1GyNgHPJMCrWaIxdJqv4YF8nIoWi-HHpj7rSMOqvC9tiKg9xPNyB7IFhJnducb0doO8&usqp=CAU",
        name: "Google Pixel 7",
        price: "600",
        location: "Hajaribag",
        status: "available",
    },
    {
        key: "13",
        image: "https://img.freepik.com/free-photo/half-profile-image-handsome-young-caucasian-man-with-good-skin-brown-eyes-black-stylish-hair-stubble-posing-isolated-against-blank-wall-looking-front-him-smiling_343059-4560.jpg",
        name: "Google Pixel 7 Pro",
        price: "600",
        selling: "500",
        location: "Mirpur",
        email: "@gmail.com",
        status: "available",
    }
];
  

const TopSellerList = () => {
    const [open, setOpen] = useState();
    const [page, setPage] = useState( new URLSearchParams(window.location.search).get('page') || 1);
    const dropdownRef = useRef();

    const handlePageChange=(page)=>{
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    }

    const handleDelete=(id)=>{
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
            setOpen("");
        }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
        document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    
    const columns = [
        {
          title: "Details",
          dataIndex: "image",
          key: "image",
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
                    <p>{record?.status}</p>
                </div>
            </div>
          ),
        },
        {
          title: "Total Balance",
          dataIndex: "balance",
          key: "balance",
          render: (_,record) => (
            <p>${record?.price}</p>
          ),
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
          render: (_,record) => (
            <p>{record?.location}</p>
          ),
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          render: (_,record) => (
            <p>{record?.email}</p>
          ),
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (_,record) => (
            <div style={{position: "relative"}}>
                <CiMenuKebab onClick={(e)=>(e.stopPropagation() ,setOpen(record.key))} size={20} color='black' style={{ cursor: "pointer" }} />

                <div
                    onClick={(e)=>e.stopPropagation()}
                    ref={dropdownRef}
                    style={{
                        display: record?.key === open ? "block" : "none", 
                        width: "113px",
                        height: "132px",
                        borderRadius: "8px",
                        zIndex: "2",
                        position: "absolute", 
                        top: "12px", 
                        right:"133px", 
                        background: "white", 
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        padding: "10px 0" ,
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
                            background: "#E0F9F7" ,
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
                            background: "#FFC3C3" ,
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
                                background: "white" ,
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
        }
    ];


    return (
        <div>
            <div style={{marginBottom: "16px"}}>
                <BackButton link="/" />
            </div>
            <div 
                style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "10px"
                }}
            >
                <h2 style={{fontSize: "32px", marginBottom: "16px", fontWeight: 600, color: "#6A6D7C"}}>Top Seller List</h2>
                <Table columns={columns} dataSource={data} pagination={{
                  pageSize: 8,
                  current: parseInt(page),
                  onChange: handlePageChange
                }}/>
            </div>
        </div>
    )
}

export default TopSellerList
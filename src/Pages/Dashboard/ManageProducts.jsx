import React, { useEffect, useRef, useState } from 'react';
import { FiEye, FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { Calendar, Dropdown, Input, Slider, Table } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { FaRegImage, FaRegTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CiMenuKebab } from 'react-icons/ci';
import { LuRefreshCw } from "react-icons/lu";
import product from '../../assets/icon/product.png';
import user from '../../assets/icon/user.png';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';
import { Form, Modal, Button } from 'antd';
import { MdOutlineDelete } from 'react-icons/md';
import BackButton from './BackButton';
import { FaPlus } from 'react-icons/fa6';
import TextArea from 'antd/es/input/TextArea';
import { RxCross2 } from "react-icons/rx";
const data = [
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
];
const ManageProducts = () => {
    const [value, setValue] = useState(new URLSearchParams(window.location.search).get('date') || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(new URLSearchParams(window.location.search).get('category') || "All")
    const [gender, setGender] = useState([])
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [open, setOpen] = useState();
    const [filter, setFilter] = useState(false);
    const [date, setDate] = useState(false);
    const dropdownRef = useRef();
    const [openAddModel, setOpenAddModel] = useState(false);
    const [reFresh, setReFresh] = useState("");

    if (reFresh) {
        setTimeout(() => {
            setReFresh("")
        }, 1500)
    }
    const items = [
        {
            label: "male",
            key: "male",
        },
        {
            label: "female",
            key: "female",
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
            title: "Products Name",
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
            key: "product name",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Store",
            dataIndex: "store",
            key: "store",
        },
        {
            title: "ACTION",
            dataIndex: "printView",
            key: "printView",
            render: (_, record) => (
                <div style={{ position: "relative", display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '10px' }}>
                    <RiEditLine size={20} color='#5B52A3' style={{ cursor: "pointer" }} />
                    <RiDeleteBin6Line size={20} color='#C11415' style={{ cursor: "pointer" }} />
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
        if (gender.find(item => key == item)) {
            return
        }
        setGender([...gender, key])
    };
    const handelGenderDelete = (key) => {
        const newGenderList = gender.filter(item => item != key)
        setGender(newGenderList)
    }
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0" }}>
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>All Products</h1>
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
                    <button
                        onClick={() => setOpenAddModel(true)}
                        style={{
                            borderRadius: "4px",
                            color: "#F2F2F2",
                            backgroundColor: "#B47000",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '10px 20px',
                            fontWeight: '500'
                        }}
                    >
                        <FaPlus style={{
                            marginTop: '-2px'
                        }} />
                        Add Product
                    </button>
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
                    borderRadius:'6px'
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
            <Modal
                centered
                open={openAddModel}
                onCancel={() => setOpenAddModel(false)}
                width={700}
                footer={false}
            >
                <div className='p-6'>
                    <h1 className='text-2xl font-semibold' style={{ marginBottom: "12px" }}>Add New Products</h1>
                    <Form
                        name="normal_login"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <div className='grid grid-cols-2 gap-5'>
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>Product Name</label>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="product"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input product name",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="topic here..."
                                        type="text"
                                        style={{
                                            border: "1px solid #E0E4EC",
                                            height: "52px",
                                            background: "white",
                                            borderRadius: "8px",
                                            outline: "none",
                                        }}
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>Product Name</label>
                                <div className='flex justify-between items-center'
                                    style={{
                                        height: "40px",
                                        borderRadius: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        color: "#8B8B8B",
                                        background: '#fefefe',
                                        border: '1px solid #e0e4ec',
                                        padding: '23px 10px',
                                    }}
                                >
                                    <div className=' w-full flex justify-start items-center'>
                                        {
                                            gender.length <= 0 && <p>select gender</p>
                                        }
                                        {
                                            gender.map((item, index) => <button type='button' className='p-1 border mx-1 flex justify-start items-center gap-1 w-fit cursor-default' key={index}> {item} <RxCross2 onClick={() => handelGenderDelete(item)} className='cursor-pointer' /></button>)
                                        }
                                    </div>
                                    <Dropdown menu={{ items, onClick }} >
                                        <p
                                            style={{
                                                cursor: "pointer",
                                                color: '#717171',
                                                borderRadius: "4px",
                                            }}
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <DownOutlined style={{ paddingLeft: "18px" }} color='#717171' />
                                        </p>
                                    </Dropdown>
                                </div>
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>date</label>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="date"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input date",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="topic here..."
                                        type="date"
                                        style={{
                                            border: "1px solid #E0E4EC",
                                            height: "52px",
                                            background: "white",
                                            borderRadius: "8px",
                                            outline: "none",
                                        }}
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>Price</label>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input product price",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="150 CND"
                                        type="text"
                                        style={{
                                            border: "1px solid #E0E4EC",
                                            height: "52px",
                                            background: "white",
                                            borderRadius: "8px",
                                            outline: "none",
                                        }}
                                    />
                                </Form.Item>
                            </div>
                            <p className='font-bold -mb-5'>Products Image</p>
                            <div className='grid grid-cols-4 col-span-2 gap-2 p-4 pt-5 border  my-4 rounded-md'>
                                <label for='product_img1' style={{ display: "block", marginBottom: "5px" }}>
                                    <Form.Item
                                        style={{ marginBottom: 0 }}
                                        name="product_img1"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input product price",
                                            },
                                        ]}
                                    >
                                        <div className='flex justify-center items-center w-full h-full border-dashed border border-black py-10'>
                                            <FaRegImage className='text-2xl' />
                                        </div>
                                        <div className='hidden'>
                                            <Input id='product_img1'
                                                placeholder="150 CND"
                                                type="file"
                                                style={{
                                                    border: "1px solid #E0E4EC",
                                                    height: "52px",
                                                    background: "white",
                                                    borderRadius: "8px",
                                                    outline: "none",
                                                }}
                                            />
                                        </div>
                                    </Form.Item>
                                </label>
                                <label for='product_img2' style={{ display: "block", marginBottom: "5px" }}>
                                    <Form.Item
                                        style={{ marginBottom: 0 }}
                                        name="product_img2"
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input product price",
                                            },
                                        ]}
                                    >
                                        <div className='flex justify-center items-center w-full h-full border-dashed border border-black py-10'>
                                            <FaRegImage className='text-2xl' />
                                        </div>
                                        <div className='hidden'>
                                            <Input id='product_img2'
                                                placeholder="150 CND"
                                                type="file"
                                                style={{
                                                    border: "1px solid #E0E4EC",
                                                    height: "52px",
                                                    background: "white",
                                                    borderRadius: "8px",
                                                    outline: "none",
                                                }}
                                            />
                                        </div>
                                    </Form.Item>
                                </label>
                                <label for='product_img3' style={{ display: "block", marginBottom: "5px" }}>
                                    <Form.Item
                                        style={{ marginBottom: 0 }}
                                        name="product_img3"
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input product price",
                                            },
                                        ]}
                                    >
                                        <div className='flex justify-center items-center w-full h-full border-dashed border border-black py-10'>
                                            <FaRegImage className='text-2xl' />
                                        </div>
                                        <div className='hidden'>
                                            <Input id='product_img3'
                                                placeholder="150 CND"
                                                type="file"
                                                style={{
                                                    border: "1px solid #E0E4EC",
                                                    height: "52px",
                                                    background: "white",
                                                    borderRadius: "8px",
                                                    outline: "none",
                                                }}
                                            />
                                        </div>
                                    </Form.Item>
                                </label>
                                <label for='product_img4' style={{ display: "block", marginBottom: "5px" }}>
                                    <Form.Item
                                        style={{ marginBottom: 0 }}
                                        name="product_img4"
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input product price",
                                            },
                                        ]}
                                    >
                                        <div className='flex justify-center items-center w-full h-full border-dashed border border-black py-10'>
                                            <FaRegImage className='text-2xl' />
                                        </div>
                                        <div className='hidden'>
                                            <Input id='product_img4'
                                                placeholder="150 CND"
                                                type="file"
                                                style={{
                                                    border: "1px solid #E0E4EC",
                                                    height: "52px",
                                                    background: "white",
                                                    borderRadius: "8px",
                                                    outline: "none",
                                                }}
                                            />
                                        </div>
                                    </Form.Item>
                                </label>
                            </div>
                        </div>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }}>Description</label>
                            <Form.Item
                                style={{ marginBottom: 0 }}
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input Description",
                                    },
                                ]}
                            >
                                <TextArea
                                    placeholder="Write here..."
                                    type="text"
                                    style={{
                                        border: "1px solid #E0E4EC",
                                        height: "152px",
                                        background: "white",
                                        borderRadius: "8px",
                                        outline: "none",
                                    }}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{
                                    border: "none",
                                    height: "52px",
                                    background: "#B47000",
                                    color: "white",
                                    borderRadius: "8px",
                                    outline: "none",
                                }}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}
export default ManageProducts

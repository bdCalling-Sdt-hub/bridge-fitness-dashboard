import { Input, Modal, Table } from 'antd';
import avater from '../../assets/avater.png'
import { useEffect, useRef, useState } from 'react';
import { FiEye, FiSearch } from 'react-icons/fi';
import { LuRefreshCw } from 'react-icons/lu';
const data = [
    {
        key: "1",
        name: "Tushar",
        photo: avater,
        email: "tushar@gmail.com",
        date: '1 Feb, 2020',
        contact: "(201) 555-0124",
        location: "Banasree",
        status: "1 monthh",
        selling: "500",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        photo: avater,
        email: "tushar@gmail.com",
        date: '1 Feb, 2020',
        contact: "(201) 555-0124",
        location: "Banasree",
        status: "1 monthh",
        selling: "500",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        photo: avater,
        email: "tushar@gmail.com",
        date: '1 Feb, 2020',
        contact: "(201) 555-0124",
        location: "Banasree",
        status: "1 monthh",
        selling: "500",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        photo: avater,
        email: "tushar@gmail.com",
        date: '1 Feb, 2020',
        contact: "(201) 555-0124",
        location: "Banasree",
        status: "1 monthh",
        selling: "500",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        photo: avater,
        email: "tushar@gmail.com",
        date: '1 Feb, 2020',
        contact: "(201) 555-0124",
        location: "Banasree",
        status: "1 monthh",
        selling: "500",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        photo: avater,
        email: "tushar@gmail.com",
        date: '1 Feb, 2020',
        contact: "(201) 555-0124",
        location: "Banasree",
        status: "1 monthh",
        selling: "500",
        balance: "600",
    },
]
const AllSubscriber = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [open, setOpen] = useState();
    const dropdownRef = useRef();
    const [search, setSearch] = useState("");
    const [openAddModel, setOpenAddModel] = useState(false);
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
            title: "Date",
            dataIndex: "date",
            key: "date",
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
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <>
                    <span className='text-[#B47000]'>{record.status}</span>
                </>
            )
        },
        {
            title: "ACTION",
            dataIndex: "printView",
            key: "printView",
            render: (_, record) => (
                <div style={{ position: "relative", width: '100%' }}>
                    <FiEye onClick={(e) => (e.stopPropagation(), setOpen(record.key), setOpenAddModel(true))} size={20} color='#0044B4' style={{ cursor: "pointer" }} />
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
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0" }}>
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>All Subscriber</h1>
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
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 4,
                    defaultCurrent: parseInt(page),
                    onChange: handlePageChange
                }}
            />
            <Modal
                centered
                open={openAddModel}
                onCancel={() => setOpenAddModel(false)}
                width={500}
                footer={false}
                padding={0}
            >
                <div className='p-2'>
                    <div className='flex flex-col justify-center items-center bg-[#F4EAD9] p-6'>
                        <div className='w-32 h-32 rounded-full overflow-hidden'>
                            <img className='h-full w-full object-cover' src={avater} alt="" />
                        </div>
                        <h1 className='text-2xl font-semibold mt-5'>Patient Mahmud</h1>
                    </div>
                    <div className='p-5'>
                        <div>
                            <p className='text-sm font-semibold text-[#555555] mb-1'>Status</p>
                            <p className='text-[#B47000]'>Subscriber</p>
                        </div>
                        <div className='mt-3'>
                            <p className='text-sm font-semibold text-[#555555] mb-1'>Name</p>
                            <p className='text-[#555555]'>Patient Mahmud</p>
                        </div>
                        <div className='mt-3'>
                            <p className='text-sm font-semibold text-[#555555] mb-1'>Email</p>
                            <p className='text-[#555555]'>mahmud@gmail.com</p>
                        </div>
                        <div className='mt-3'>
                            <p className='text-sm font-semibold text-[#555555] mb-1'>Contact No</p>
                            <p className='text-[#555555]'>+919355574544</p>
                        </div>
                        <div className='mt-3'>
                            <p className='text-sm font-semibold text-[#555555] mb-1'>Date of birth</p>
                            <p className='text-[#555555]'>17 dec, 2024</p>
                        </div>
                        <div className='mt-3'>
                            <p className='text-sm font-semibold text-[#555555] mb-1'>Designation</p>
                            <p className='text-[#555555]'>Actor</p>
                        </div>
                        <div className='mt-3'>
                            <p className='text-sm font-semibold text-[#555555] mb-1'>Address</p>
                            <p className='text-[#555555]'>68/ Joker Vila, Gotham City</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AllSubscriber

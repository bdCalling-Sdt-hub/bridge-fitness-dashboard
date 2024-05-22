import { Form, Input, Modal, Table, Button, Row, Col } from 'antd';
import React, { useState } from 'react'
import { MdOutlineDelete } from 'react-icons/md';
import BackButton from './BackButton';
import { FaPlus } from 'react-icons/fa6';


const data = [
    {
        key: "1",
        fullName: "Tushar",
        email: "tushar@gmail.com",
        userType: "ADMIN",
    },
    {
        key: "2",
        fullName: "Rahman",
        email: "rahman@gmail.com",
        userType: "ADMIN",
    },
    {
        key: "3",
        fullName: "Rafsan",
        email: "rafsan@gmail.com",
        userType: "ADMIN",
    },
    {
        key: "4",
        fullName: "jusef",
        email: "jusef@gmail.com",
        userType: "ADMIN",
    },
    {
        key: "5",
        fullName: "Asad",
        email: "asad@gmail.com",
        userType: "ADMIN",
    },
    {
        key: "6",
        fullName: "Fahim",
        email: "fahim@gmail.com",
        userType: "ADMIN",
    },
    {
        key: "7",
        fullName: "Nadir",
        email: "nadir@gmail.com",
        userType: "ADMIN",
    }
];

const MakeAdmin = () => {
    const [openAddModel, setOpenAddModel] = useState(false);
    const [reFresh, setReFresh] = useState("");

    if (reFresh) {
        setTimeout(() => {
            setReFresh("")
        }, 1500)
    }

    const handleDelete = async (value) => {
        /* Swal.fire({
            title: "Are you sure to delete this User?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            showCancelButton: "No",
            confirmButtonText: "Yes",
        }).then(async(result) => {
            if (result.isConfirmed) {
                const response = await baseURL.get(`/delete-admin/${value?.id}`,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                if(response.status === 200){
                    Swal.fire({
                        position: "center",
                        title: "Deleted!",
                        text: "User Deleted Successfully",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    }).then(()=>{
                        dispatch(AllAdmin());
                    })
                }
                        
            }
        });  */

    }
    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <p>{record?.fullName}</p>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'User Type',
            dataIndex: 'userType',
            key: 'userType',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <MdOutlineDelete onClick={() => handleDelete(record)} className='cursor-pointer' style={{
                    cursor: 'pointer'
                }} size={25} color='red' />
            ),
        },
    ];
    return (
        <div id='makeAdmin'>
            <div style={{ margin: "24px 0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }} >
                    <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F" }}>Make Admin</h3>
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
                        Make Admin
                    </button>
                </div>
            </div>
            <div className='bg-white p-4 rounded-md min-h-[96vh]'>
                <Table columns={columns} dataSource={data} pagination={false} />
            </div>

            <Modal
                centered
                open={openAddModel}
                onCancel={() => setOpenAddModel(false)}
                width={500}
                footer={false}
            >
                <div className='p-6'>
                    <h1 style={{ marginBottom: "12px" }}>Make Admin</h1>
                    <Form
                        name="normal_login"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <div style={{ marginBottom: "16px", width: '100%' }}>
                                    <label style={{ display: "block", marginBottom: "5px" }}>Full Name</label>
                                    <Form.Item
                                        style={{ marginBottom: 0 }}
                                        name="fullName"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input User Full Name",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Enter Full Name"
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
                            </Col>
                            <Col span={12}>
                                <div style={{ marginBottom: "16px", width: '100%' }}>
                                    <label style={{ display: "block", marginBottom: "5px" }} htmlFor="">Email </label>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input User Email",
                                            },
                                        ]}
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Input
                                            type="text"
                                            placeholder="Enter User Email"
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
                            </Col>
                        </Row>



                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }} htmlFor="password">Password</label>
                            <Form.Item
                                style={{ marginBottom: 0 }}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input User Password!",
                                    },
                                ]}
                            >
                                <Input.Password
                                    type="password"
                                    placeholder="Enter User password"
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
                            <label style={{ display: "block", marginBottom: "5px" }} htmlFor="password">User Type</label>
                            <Form.Item
                                style={{ marginBottom: 0 }}
                                name="userType"
                            >
                                <Input
                                    type="Text"
                                    placeholder="Enter User password"
                                    style={{
                                        border: "1px solid #E0E4EC",
                                        height: "52px",
                                        background: "white",
                                        borderRadius: "8px",
                                        outline: "none",
                                    }}
                                    defaultValue="ADMIN"
                                    readOnly
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

export default MakeAdmin
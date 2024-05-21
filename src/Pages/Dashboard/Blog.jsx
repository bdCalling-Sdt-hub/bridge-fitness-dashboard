import { Form, Input, Modal, Table, Button } from 'antd';
import React, { useState } from 'react'
import { MdOutlineDelete } from 'react-icons/md';
import BackButton from './BackButton';
import { FaPlus } from 'react-icons/fa6';
import course from "../../assets/course.png";
import { Col, Row } from 'antd';
import { CiCalendar } from 'react-icons/ci';
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
const data = [
    {
        title: '45-min advance vinyasa yoga',
        img: course,
        topic: 'Yoga',
        date: 'Mon 11/ 06/ 2024'
    },
    {
        title: '45-min advance vinyasa yoga',
        img: course,
        topic: 'Yoga',
        date: 'Mon 11/ 06/ 2024'
    },
    {
        title: '45-min advance vinyasa yoga',
        img: course,
        topic: 'Yoga',
        date: 'Mon 11/ 06/ 2024'
    },

]

const Blog = () => {
    const [pageNumber, setPageNumber] = useState(new URLSearchParams(window.location.search).get('page') || 0);
    const totalPages = Math.ceil(data.length / 6)
    const pages = [...Array(totalPages).keys()];
    const [openAddModel, setOpenAddModel] = useState(false);
    const [reFresh, setReFresh] = useState("");

    if (reFresh) {
        setTimeout(() => {
            setReFresh("")
        }, 1500)
    }
    return (
        <div>
            <div style={{ margin: "24px 0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }} >
                    <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F" }}>Blogs</h3>
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
                        Add Blog
                    </button>
                </div>
            </div>
            <Modal
                centered
                open={openAddModel}
                onCancel={() => setOpenAddModel(false)}
                width={500}
                footer={false}
            >
                <div>
                    <h1 style={{ marginBottom: "12px" }}>Add Blogs</h1>
                    <Form
                        name="normal_login"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <div style={{ marginBottom: "16px" }}>
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

                        <div style={{ marginBottom: "16px" }}>
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
            <div style={{
                background: 'white',
                padding: '30px 20px'
            }}>
                <Row gutter={30}>
                    {data.map((item, index) => {
                        const key = `col-${index}`;
                        return (
                            <Col
                                key={key}
                                xs={{ flex: '100%' }}
                                sm={{ flex: '50%' }}
                                lg={{ flex: '33.33%' }}

                            >
                                <div style={{
                                    width: '100%',
                                    paddingBottom: '20px',
                                    marginBottom: '30px'
                                }}>
                                    <img style={{
                                        width: '100%'
                                    }} src={item?.img} alt="" />
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                        gap: '35px',
                                        fontSize: '14px'
                                    }}>
                                        <p style={{
                                            display: 'flex',
                                            justifyContent: 'start',
                                            alignItems: 'center',
                                            gap: '10px',
                                            color: '#555555'
                                        }}>
                                            <CiCalendar style={{
                                                fontSize: '18px'
                                            }} /> {item?.date}
                                        </p>
                                        <p>Topic: {item?.topic}</p>
                                    </div>
                                    <p style={{
                                        color: '#2F2F2F',
                                        marginTop: '4px',
                                        marginBottom: '22px'
                                    }}>45-min advance vinyasa yoga</p>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: '35px',
                                    }}>
                                        <button style={{
                                            background: 'transparent',
                                            border: '1px solid black',
                                            padding: '12px 36px',
                                            color: '#242424',
                                            cursor: 'pointer'
                                        }}>Delete</button>
                                        <button style={{
                                            background: 'transparent',
                                            border: 'none',
                                            padding: '14px 48px',
                                            color: 'white',
                                            backgroundColor: '#242424',
                                            cursor: 'pointer'
                                        }}>Edit</button>
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
                <div className={`flex justify-center items-center gap-4 mx-4`}>
                    <button disabled={pageNumber === 0} className={`flex justify-start items-center gap-4 mx-4 ${pageNumber !== 0 ? 'text-[#555555]' : 'text-[#C2C2C2]'}`}><SlArrowLeft className='-mt-1' />Previous</button>
                    {pages.map((item, index) => <button className={`${pageNumber === item ? 'text-[#555555] border rounded-full' : 'text-[#C2C2C2]'} py-1 px-3 `} key={index}>{item + 1}</button>)}
                    <button disabled={pageNumber !== pageNumber.length - 1} className={`flex justify-start items-center gap-4 mx-4 ${pageNumber !== pageNumber.length - 1 ? 'text-[#C2C2C2]' : ' text-[#555555]'}`}>Next<SlArrowRight className='-mt-1' /></button>
                </div>
            </div>
        </div>
    )
}

export default Blog

import { Form, Input, Modal, Table, Button, Row, Col } from 'antd';
import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa6';
import { RxCross2 } from "react-icons/rx";

const FAQ = () => {
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
                    <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F" }}>Frequently Asked Questions</h3>
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
                        Add FAQ
                    </button>
                </div>
            </div>
            <div className='bg-white py-6 px-4'>
                <div className='flex justify-between items-start gap-4 '>
                    <div className='w-full '>
                        <p className='text-base font-medium bg-[#E8D3B0] rounded-xl py-2 px-4'><span className='mr-4'>Q:</span> What is an affiliate e-commerce website?</p>
                        <div className='flex justify-start items-start gap-2  py-2 px-4 bg-[#F8F1E6] rounded-xl my-4'>
                            <p className='text-[#6D6D6D] font-medium'>Ans:</p>
                            <p className='text-[#919191] leading-[24px] mb-6'>convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at </p>
                        </div>
                    </div>
                    <div className='w-[4%] flex justify-start items-center pt-3 gap-2'>
                        <CiEdit className='text-2xl cursor-pointer' />
                        <RxCross2 className='text-2xl cursor-pointer' />
                    </div>
                </div>
                <div className='flex justify-between items-start gap-4 '>
                    <div className='w-full '>
                        <p className='text-base font-medium bg-[#E8D3B0] rounded-xl py-2 px-4'><span className='mr-4'>Q:</span> What is an affiliate e-commerce website?</p>
                        <div className='flex justify-start items-start gap-2  py-2 px-4 bg-[#F8F1E6] rounded-xl my-4'>
                            <p className='text-[#6D6D6D] font-medium'>Ans:</p>
                            <p className='text-[#919191] leading-[24px] mb-6'>convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at </p>
                        </div>
                    </div>
                    <div className='w-[4%] flex justify-start items-center pt-3 gap-2'>
                        <CiEdit className='text-2xl cursor-pointer' />
                        <RxCross2 className='text-2xl cursor-pointer' />
                    </div>
                </div>
                <div className='flex justify-between items-start gap-4 '>
                    <div className='w-full '>
                        <p className='text-base font-medium bg-[#E8D3B0] rounded-xl py-2 px-4'><span className='mr-4'>Q:</span> What is an affiliate e-commerce website?</p>
                        <div className='flex justify-start items-start gap-2  py-2 px-4 bg-[#F8F1E6] rounded-xl my-4'>
                            <p className='text-[#6D6D6D] font-medium'>Ans:</p>
                            <p className='text-[#919191] leading-[24px] mb-6'>convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at </p>
                        </div>
                    </div>
                    <div className='w-[4%] flex justify-start items-center pt-3 gap-2'>
                        <CiEdit className='text-2xl cursor-pointer' />
                        <RxCross2 className='text-2xl cursor-pointer' />
                    </div>
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
                    <h1 style={{ marginBottom: "12px" }}>Add FAQ</h1>
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

export default FAQ

import { Form, Input, Modal, Table, Button, Row, Col } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa6';
import { RxCross2 } from "react-icons/rx";
const data = [
    {
        key: '1',
        question: "What is an affiliate e-commerce website?",
        ans: 'convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at '
    },
    {
        key: '1',
        question: "What is an affiliate e-commerce website?",
        ans: 'convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at '
    },
    {
        key: '1',
        question: "What is an affiliate e-commerce website?",
        ans: 'convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at '
    },
    {
        key: '1',
        question: "What is an affiliate e-commerce website?",
        ans: 'convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at '
    },
    {
        key: '1',
        question: "What is an affiliate e-commerce website?",
        ans: 'convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at '
    },
    {
        key: '1',
        question: "What is an affiliate e-commerce website?",
        ans: 'convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at '
    },
]
const FAQ = () => {
    const [openAddModel, setOpenAddModel] = useState(false);
    const [reFresh, setReFresh] = useState("");
    const [openEditModal, setOpenEditModal] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [editId, seteditId] = useState('')
    if (reFresh) {
        setTimeout(() => {
            setReFresh("")
        }, 1500)
    }
    const handeldelete = () => {
        setShowDelete(false)
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
            <div className='bg-white py-6 px-4 rounded-md'>
                {
                    data.map(item => <div key={item?.key} className='flex justify-between items-start gap-4 '>
                        <div className='w-full '>
                            <p className='text-base font-medium bg-[#E8D3B0] rounded-xl py-2 px-4'><span className='mr-4'>Q:</span>{item?.question}</p>
                            <div className='flex justify-start items-start gap-2  py-2 px-4 bg-[#F8F1E6] rounded-xl my-4'>
                                <p className='text-[#6D6D6D] font-medium'>Ans:</p>
                                <p className='text-[#919191] leading-[24px] mb-6'>{item?.ans}</p>
                            </div>
                        </div>
                        <div className='w-[4%] flex justify-start items-center pt-3 gap-2'>
                            <CiEdit onClick={() => {
                                setOpenAddModel(true)
                                seteditId(item?.key)

                            }} className='text-2xl cursor-pointer' />
                            <RxCross2 onClick={() => {
                                setDeleteId(item?.key)
                                setShowDelete(true)
                            }} className='text-2xl cursor-pointer' />
                        </div>
                    
                    </div>)
                }
            </div>
            <Modal
                centered
                open={openAddModel}
                onCancel={() => setOpenAddModel(false)}
                width={500}
                footer={false}
            >
                <div className='p-6'>
                    <h1 style={{ marginBottom: "12px" }}>Add FAQ</h1>
                    <Form
                        name="normal_login"
                        initialValues={{
                            remember: true,
                        }}
                    >

                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }} htmlFor="question">Question</label>
                            <Form.Item
                                style={{ marginBottom: 0 }}
                                name="question"
                            >
                                <Input
                                    type="Text"
                                    placeholder="Enter answer"
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
                            <label style={{ display: "block", marginBottom: "5px" }} htmlFor="answer">Answer</label>
                            <Form.Item
                                style={{ marginBottom: 0 }}
                                name="answer"
                            >
                                <TextArea
                                    type="Text"
                                    placeholder="Enter answer"
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
            <Modal
                centered
                open={showDelete}
                onCancel={() => setShowDelete(false)}
                width={400}
                footer={false}
            >
                <div className='p-6 text-center'>
                    <p className='text-[#B47000] text-center font-semibold'>Are you sure !</p>
                    <p className='pt-4 pb-12 text-center'>Do you want to  delete this content ?</p>
                    <button onClick={handeldelete} className='bg-[#B47000] py-2 px-5 text-white rounded-md'>Confirm</button>
                </div>
            </Modal>
        </div>
    )
}

export default FAQ

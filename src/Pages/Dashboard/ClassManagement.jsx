import { Form, Input, Modal, Table, Button } from 'antd';
import React, { useState } from 'react'
import { MdOutlineDelete } from 'react-icons/md';
import BackButton from './BackButton';
import { FaFilePdf, FaImage, FaPlus } from 'react-icons/fa6';
import course from "../../assets/course.png";
import { Col, Row } from 'antd';
import { CiCalendar, CiVideoOn } from 'react-icons/ci';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import TextArea from 'antd/es/input/TextArea';
import { IoIosDocument } from "react-icons/io";
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
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
const ClassManagement = () => {
    const [pageNumber, setPageNumber] = useState(new URLSearchParams(window.location.search).get('page') || 0);
    const [Program, setProgram] = useState(new URLSearchParams(window.location.search).get('program') || 'all');
    const { name } = useParams()
    console.log(Program, name)
    const totalPages = Math.ceil(data.length / 6)
    const pages = [...Array(totalPages).keys()];
    const [openAddModel, setOpenAddModel] = useState(false);
    const [openUpdateModel, setOpenUpdateModel] = useState(false);
    const [reFresh, setReFresh] = useState("");
    const [showDelete, setShowDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')
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
            <div style={{ marginTop: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }} >
                    <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F" }}>All Classes</h3>
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
                        Add new class
                    </button>
                </div>
            </div>
            <div className='flex justify-start items-center gap-2 mb-6'>
                <p>{Program}</p> / <p>{name}</p>
            </div>
            <Modal
                centered
                open={openAddModel}
                onCancel={() => setOpenAddModel(false)}
                width={700}
                footer={false}
            >
                <div className='p-6'>
                    <h1 className='text-2xl font-semibold' style={{ marginBottom: "12px" }}>Add new class</h1>
                    <Form
                        name="normal_login"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <div className='grid grid-cols-2 gap-3 py-6'>
                            <div>
                                <label style={{ display: "block", marginBottom: "5px" }}>Topic</label>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="topic"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Topic",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Topic here ..."
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
                            <div>
                                <label style={{ display: "block", marginBottom: "5px" }}>Tittle</label>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input tittle ",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="tittle here..."
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
                            <div>
                                <label style={{ display: "block", marginBottom: "5px" }}>Date</label>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="date"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input date ",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="tittle here..."
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
                            <div>
                                <label for="video" style={{ display: "block", marginBottom: "5px" }}>Add image
                                    <Form.Item
                                        style={{ marginBottom: 0 }}
                                        name="video"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Add pdf ",
                                            },
                                        ]}
                                    >
                                        <label for="video" className="btn">
                                            <div className='border p-2 rounded-lg'>
                                                <span className='flex justify-start items-center w-fit bg-[#DADADA] py-[6px] px-2 gap-2 rounded-md'>
                                                    <FaImage /> browse Image
                                                </span>
                                            </div>
                                        </label>
                                        <div className='hidden'>
                                            <Input id='video'
                                                placeholder="tittle here..."
                                                type="file"
                                                value={``}
                                                style={{
                                                    border: "1px solid #E0E4EC",
                                                    height: "52px",
                                                    paddingTop: '10px',
                                                    background: "white",
                                                    borderRadius: "8px",
                                                    outline: "none",
                                                }}
                                            />
                                        </div>
                                    </Form.Item>
                                </label>
                            </div>
                            <div className='row-span-2 col-span-2'>
                                <label style={{ display: "block", marginBottom: "5px" }}>Description </label>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Description ",
                                        },
                                    ]}
                                >
                                    <TextArea
                                        placeholder="tittle here..."
                                        style={{
                                            border: "1px solid #E0E4EC",
                                            height: "140px",
                                            paddingTop: '10px',
                                            background: "white",
                                            borderRadius: "8px",
                                            outline: "none",
                                        }}
                                    />
                                </Form.Item>
                            </div>
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
                                Publish
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <Modal
                centered
                open={openUpdateModel}
                onCancel={() => setOpenUpdateModel(false)}
                width={700}
                footer={false}
            >
                <div className='p-6'>
                    <h1 className='text-2xl font-semibold' style={{ marginBottom: "12px" }}>Update class</h1>
                    <Form
                        name="normal_login"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <div className='grid grid-cols-2 gap-3 py-6'>
                            <div>
                                <label style={{ display: "block", marginBottom: "5px" }}>Topic</label>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="topic"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Topic",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Topic here ..."
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
                            <div>
                                <label style={{ display: "block", marginBottom: "5px" }}>Tittle</label>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input tittle ",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="tittle here..."
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
                            <div>
                                <label style={{ display: "block", marginBottom: "5px" }}>Date</label>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="date"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input date ",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="tittle here..."
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
                            <div>
                                <label for="video" style={{ display: "block", marginBottom: "5px" }}>Add image
                                    <Form.Item
                                        style={{ marginBottom: 0 }}
                                        name="video"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Add pdf ",
                                            },
                                        ]}
                                    >
                                        <label for="video" className="btn">
                                            <div className='border p-2 rounded-lg'>
                                                <span className='flex justify-start items-center w-fit bg-[#DADADA] py-[6px] px-2 gap-2 rounded-md'>
                                                    <FaImage /> browse Image
                                                </span>
                                            </div>
                                        </label>
                                        <div className='hidden'>
                                            <Input id='video'
                                                placeholder="tittle here..."
                                                type="file"
                                                value={``}
                                                style={{
                                                    border: "1px solid #E0E4EC",
                                                    height: "52px",
                                                    paddingTop: '10px',
                                                    background: "white",
                                                    borderRadius: "8px",
                                                    outline: "none",
                                                }}
                                            />
                                        </div>
                                    </Form.Item>
                                </label>
                            </div>
                            <div className='row-span-2 col-span-2'>
                                <label style={{ display: "block", marginBottom: "5px" }}>Description </label>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Description ",
                                        },
                                    ]}
                                >
                                    <TextArea
                                        placeholder="tittle here..."
                                        style={{
                                            border: "1px solid #E0E4EC",
                                            height: "140px",
                                            paddingTop: '10px',
                                            background: "white",
                                            borderRadius: "8px",
                                            outline: "none",
                                        }}
                                    />
                                </Form.Item>
                            </div>
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
                                Publish
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <div style={{
                background: 'white',
                padding: '30px 20px',
                borderRadius: '6px'
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
                                        fontSize: '14px',
                                        marginTop: '8px'
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
                                        <button onClick={() => {
                                            setShowDelete(true)
                                            setDeleteId(item?._id)
                                        }} style={{
                                            background: 'transparent',
                                            border: '1px solid black',
                                            padding: '12px 36px',
                                            color: '#242424',
                                            cursor: 'pointer'
                                        }}>Delete</button>
                                        <button onClick={() => setOpenUpdateModel(true)} style={{
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
                <div className={`flex justify-center items-center gap-4 mx-4`}>
                    <button disabled={pageNumber === 0} className={`flex justify-start items-center gap-4 mx-4 ${pageNumber !== 0 ? 'text-[#555555]' : 'text-[#C2C2C2]'}`}><SlArrowLeft className='-mt-1' />Previous</button>
                    {pages.map((item, index) => <button className={`${pageNumber === item ? 'text-[#555555] border rounded-full' : 'text-[#C2C2C2]'} py-1 px-3 `} key={index}>{item + 1}</button>)}
                    <button disabled={pageNumber !== pageNumber.length - 1} className={`flex justify-start items-center gap-4 mx-4 ${pageNumber !== pageNumber.length - 1 ? 'text-[#C2C2C2]' : ' text-[#555555]'}`}>Next<SlArrowRight className='-mt-1' /></button>
                </div>
            </div>
        </div>
    )
}

export default ClassManagement

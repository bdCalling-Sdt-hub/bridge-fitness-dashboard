import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { Input, Table } from 'antd';
import { FaRegImage, } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { LuRefreshCw } from "react-icons/lu";
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';
import { Form, Modal, Button } from 'antd';
import { FaPlus } from 'react-icons/fa6';
import TextArea from 'antd/es/input/TextArea';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AddProducts } from '../../ReduxSlices/Products/AddProductSlice';
import { Select } from 'antd';
import { GetProducts } from '../../ReduxSlices/Products/GetProductsSlice';
import { ServerUrl } from '../../../Config';
const ManageProducts = () => {
    const [form] = Form.useForm()
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [openAddModel, setOpenAddModel] = useState(false);
    const [reFresh, setReFresh] = useState("");
    const [images, setImages] = useState([])
    const [imagesUploadError, setImagesUploadError] = useState(null)
    const dispatch = useDispatch()
    const { products, meta } = useSelector(state => state.GetProducts)
    const [ItemPerPage, setItemPerPage] = useState(10)
    if (reFresh) {
        setTimeout(() => {
            setReFresh("")
        }, 1500)
    }

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
            key: "_id",
            render: (_, data, index) => (
                <p className='font-extrabold'>{index + 1}</p>
            )
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
                    <img className='w-10 h-10' src={`${ServerUrl}/${record.images[0]}`} alt="" />
                    <span>
                        {record.productName}
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
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "ACTION",
            dataIndex: "printView",
            key: "printView",
            render: (_, record) => (
                <div style={{ position: "relative", display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '10px' }}>
                    <RiEditLine size={20} color='#5B52A3' style={{ cursor: "pointer" }} />
                    <RiDeleteBin6Line onClick={()=>handleDelete(record._id)} size={20} color='#C11415' style={{ cursor: "pointer" }} />
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
    // add products 
    const onFinish = (values) => {
        form.setFieldsValue(values)
        const formData = new FormData();
        const { date, ...otherValues } = values
        formData.append("date", date?.toString().split('T')[0]);
        Object.keys(otherValues).forEach((key) => {
            formData.append(key, values[key]);
        });

        for (const image of images) {
            formData.append("image", image);
        }
        dispatch(AddProducts(formData)).then((res) => {
            if (res.type == 'AddProducts/fulfilled') {
                toast.success('product Successfully added')
                setOpenAddModel(false)
                form.resetFields()
                setImages([])
            }
        })
    };
    // get products 
    useEffect(() => {
        dispatch(GetProducts({ page: page, limit: ItemPerPage ,searchTerm:search}))
    }, [ItemPerPage,page,search])
    // image error message
    useEffect(() => {
        if (!imagesUploadError) return
        console.log('running')
        toast.error(imagesUploadError)
        setImagesUploadError(null)
    }, [imagesUploadError])
    // image upload handler
    const handleImageUpload = (e) => {
        let imagesFiles = []
        const FileList = Array.from(e.target.files)
        FileList.map((item) => {
            if ((images.length + imagesFiles.length) >= 4) {
                return setImagesUploadError("you can't upload more then 4 image")
            }
            if (item.type.startsWith('image')) {
                imagesFiles.push(item)
                setImages([...images, ...imagesFiles])

            } else {
                setImagesUploadError(`${item.type} is not allowed please select valid image`)
            }
        })

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
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setPage(1)
                            }}
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
                    borderRadius: '6px'
                }}
            >
                <div>
                    <Table
                        columns={columns}
                        dataSource={products}
                        pagination={{
                            total: meta?.total,
                            current: parseInt(page),
                            onChange: handlePageChange,
                            // onShowSizeChange: onShowSizeChange,
                            showSizeChanger:false,
                            // pageSize: ItemPerPage
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
                        // initialValues={{
                        //     remember: true,
                        // }}
                        onFinish={onFinish}
                    >
                        <div className='grid grid-cols-2 gap-5'>

                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>Product Name</label>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="productName"
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
                                <label style={{ display: "block", marginBottom: "5px" }}>Gender</label>
                                <Form.Item
                                    style={{
                                        marginBottom: 0
                                    }}
                                    name="gender">
                                    <Select
                                        style={{
                                            border: "1px solid #E0E4EC",
                                            height: "52px",
                                            background: "white",
                                            borderRadius: "8px",
                                            outline: "none",
                                        }}
                                        defaultValue="male"
                                        options={[
                                            {
                                                value: 'male',
                                                label: 'Male',
                                            },
                                            {
                                                value: 'female',
                                                label: 'Female',
                                            },
                                        ]}
                                    />
                                </Form.Item>
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
                                {
                                    images.map((item, index) => <div className='relative flex justify-center items-center w-full h-full border-dashed border border-black py-10' key={item.name}>
                                        <img className='w-full h-full object-cover' src={URL.createObjectURL(item)} alt="" />
                                        <button onClick={() => {
                                            const NewImages = images.filter((image, i) => index !== i)
                                            setImages(NewImages)
                                        }} type='button' className='absolute p-1 rounded-full text-xl text-white bg-red-500 top-1 right-1'>
                                            <IoClose />
                                        </button>
                                    </div>)
                                }
                                {
                                    [...Array(images.length <= 4 ? 4 - images.length : 0).keys()].map((item) => <label key={item} for='product_img1' className='cursor-pointer' style={{ display: "block", marginBottom: "5px" }}>
                                        <Form.Item
                                            style={{ marginBottom: 0 }}
                                            name="product_img1"

                                        >
                                            <div className='flex justify-center items-center w-full h-full border-dashed border border-black py-10'>
                                                <FaRegImage className='text-2xl' />
                                            </div>
                                            <div className='hidden'>
                                                <Input id='product_img1'
                                                    type="file"
                                                    multiple
                                                    onChange={handleImageUpload}
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
                                    </label>)
                                }

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
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }}>quantity</label>
                            <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="quantity"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input quantity",
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
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}
export default ManageProducts

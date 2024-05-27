import React, { useState } from 'react'
import { RiEditLine } from 'react-icons/ri';
import { Modal, Table, } from 'antd';
import { FaPlus, FaRegImage } from 'react-icons/fa6';
const data = [
    {
        key: "1",
        name: "Basic Membership",
        date: "15 May 2020 8:00 am",
    },
    {
        key: "2",
        name: "Standard Membership",
        date: "15 May 2020 8:00 am",
    },
    {
        key: "3",
        name: "Premium Membership",
        date: "15 May 2020 8:00 am",
    },
]

const descriptions = [
    { feature: 'On-demand Access to ourworkout library', id: 'bjasu1' },
    { feature: 'New Classes Every Week', id: 'bjasu2' },
    { feature: 'Join a Global Community', id: 'bjasu3' },
]

const CreateProgram = () => {
    const [subName, setsubName] = useState('');
    const [subPrice, setsubPrice] = useState('');
    const [descriptionFeatures, setDescriptionFeatures] = useState(descriptions)
    const [openAddModel, setOpenAddModel] = useState(false);
    const [reFresh, setReFresh] = useState("");
    const [formTitle,setFormTitle]=useState('Add New Program')
    if (reFresh) {
        setTimeout(() => {
            setReFresh("")
        }, 1500)
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
            key: "pakg",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "",
            render: (_, record) => (
                <>
                    <button onClick={() => {
                        setOpenAddModel(true)
                        const manageSubscription = data.filter(item => item.key == record.key)
                        setsubName(manageSubscription[0].name)
                        setsubPrice(manageSubscription[0].price)
                        setFormTitle('Edit Program')
                    }} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        <RiEditLine style={{
                            fontSize: '22px'
                        }} />
                    </button>
                </>
            )
        },
    ];
    const handelsubmit = (e) => {

    }
    return (
        <div>
            <div style={{ margin: "24px 0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }} >
                    <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F" }}>Create Program</h3>
                    <button
                        onClick={() => {
                            setFormTitle('Add New Program')
                            setOpenAddModel(true)}
                        }
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
                        Create Program
                    </button>
                </div>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </div>
            <Modal
                centered
                open={openAddModel}
                onCancel={() => setOpenAddModel(false)}
                width={500}
                footer={false}
            >
                <div className='p-6 '>
                    <h1 className='font-semibold text-[#555555]' style={{ marginBottom: "12px" }}>{formTitle}</h1>
                    <form onSubmit={handelsubmit}>
                        <div>
                            <p className='text-[#6D6D6D] py-1'>Package Name</p>
                            <input onChange={(e) => { setsubName(e.target.value) }} className='w-[100%] border outline-none px-3 py-[10px]' type="text" value={subName} />
                        </div>
                        <p className='text-[#6D6D6D] py-1'>Package Image</p>
                        <label for='product_img1' style={{ display: "block", margin: "4px 0" }} className='p-3 border '>
                                <div className='flex justify-center items-center w-full h-full border-dashed border border-black py-10'>
                                    <FaRegImage className='text-2xl' />
                                </div>
                                <div className='hidden'>
                                    <input id='product_img1'
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
                        </label>
                    </form>
                    <div className='text-center mt-6'>
                        <button className='bg-[#B47000] px-6 py-3 text-[#FEFEFE]'>
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CreateProgram

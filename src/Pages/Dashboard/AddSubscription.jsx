import React, { useEffect, useState } from 'react'
import { RiEditLine } from 'react-icons/ri';
import { Modal, Table, } from 'antd';
import { FaPlus } from 'react-icons/fa6';
import { CiCircleMinus } from 'react-icons/ci';
const data = [
    {
        key: "1",
        name: "Basic Membership",
        price: "40 CND",
    },
    {
        key: "2",
        name: "Standard Membership",
        price: "80 CND",
    },
    {
        key: "3",
        name: "Premium Membership",
        price: "100 CND",
    },
]
function generateRandomNumber() {
    const randomNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
    return randomNumber;
}
const descriptions = [
    { feature: 'On-demand Access to ourworkout library', id: 'bjasu1' },
    { feature: 'New Classes Every Week', id: 'bjasu2' },
    { feature: 'Join a Global Community', id: 'bjasu3' },
]
const AddSubscription = () => {
    const [subName, setsubName] = useState('');
    const [subPrice, setsubPrice] = useState('');
    const [descriptionFeatures, setDescriptionFeatures] = useState(descriptions)
    const [openAddModel, setOpenAddModel] = useState(false);
    const [reFresh, setReFresh] = useState("");
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
            title: "Price",
            dataIndex: "price",
            key: "price",
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0" }}>
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>Subscription</h1>
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
                width={700}
                footer={false}
            >
                <div className='p-6 '>
                    <h1 className='font-semibold text-[#555555]' style={{ marginBottom: "12px" }}>Manage Subscriptions</h1>
                    <form onSubmit={handelsubmit}>
                        <div>
                            <p className='text-[#6D6D6D] py-1'>Package Name</p>
                            <input onChange={(e) => { setsubName(e.target.value) }} className='w-[50%] border outline-none px-3 py-[10px]' type="text" value={subName} />
                        </div>
                        <div className='mt-2'>
                            <p className='text-[#6D6D6D] py-1'>Package Price</p>
                            <input onChange={(e) => { setsubPrice(e.target.value); }} className='w-[50%] border outline-none px-3 py-[10px]' type="text" value={subPrice} />
                        </div>
                    </form>
                    <p className='text-[#6D6D6D] py-1'>Description </p>
                    <div className='w-full  py-3 pb-10 px-3  border'>
                        <div className='w-full  flex flex-col justify-start items-start gap-2'>
                            {
                                descriptionFeatures?.map((item) => <span key={item?.id} className='relative w-full'>
                                    <input className='w-[90%] bg-[#FEFEFE] border py-3 px-2' type="text" name="" id="" defaultValue={item?.feature || 'please insert a feature'} />
                                    <CiCircleMinus onClick={() => {
                                        const newfeatures = descriptionFeatures.filter((filterItem) => filterItem?.id !== item?.id)
                                        setDescriptionFeatures(newfeatures)
                                    }} className='absolute right-3 top-[50%] translate-y-[-50%] text-2xl cursor-pointer text-[#E2BCC1]' />
                                </span>)
                            }

                            <div className='w-full relative py-3'>
                                <button onClick={() => {
                                    setDescriptionFeatures([...descriptionFeatures, { feature: false, id: generateRandomNumber() }])
                                }} className='p-1 bg-[#B47000] rounded-full absolute right-[8.5px]'>
                                    <FaPlus className='text-xl text-white' />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-6'>
                        <button className='bg-[#B47000] px-6 py-3 text-[#FEFEFE]'>
                            Save & Change
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default AddSubscription

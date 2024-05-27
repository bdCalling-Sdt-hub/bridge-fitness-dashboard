import React, { useState } from 'react'
import { RiEditLine } from 'react-icons/ri';
import { Modal, Table, } from 'antd';
import { FaPlus } from 'react-icons/fa6';
import { MdReadMore } from 'react-icons/md';
import { Link } from 'react-router-dom';
const data = [
    {
        key: "1",
        program: "Basic Membership",
        name: "Core Crushed",
    },
    {
        key: "2",
        program: "Standard Membership",
        name: "Core Crushed",
    },
    {
        key: "3",
        program: "Premium Membership",
        name: "Core Crushed",
    },
]


const Series = () => {
    const [openAddModel, setOpenAddModel] = useState(false);
    const [reFresh, setReFresh] = useState("");
    const [formTitle, setFormTitle] = useState('Add New Series')
    const [series, setSeries] = useState('')
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
            title: "Series",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Program",
            dataIndex: "program",
            key: "program",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "",
            render: (_, record) => (
                <div className='flex justify-start items-center gap-3'>
                    <button onClick={() => {
                        setOpenAddModel(true)
                        setFormTitle('Edit Series')
                        setSeries(record.name)
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
                    <Link to={`/series/${record?.name}?program=${record?.program}`}>
                        <MdReadMore style={{
                            fontSize: '25px'
                        }} />
                    </Link>
                </div>
            )
        },
    ];
    const handleSubmit = e => {
        console.log(e.target)
    }
    return (
        <div>
            <div style={{ margin: "24px 0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }} >
                    <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F" }}>Create Series</h3>
                    <button
                        onClick={() => {
                            setFormTitle('Add New Series')
                            setOpenAddModel(true)
                        }
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
                        Create Series
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
                onCancel={() => setOpenAddModel(false)}
                open={openAddModel}
                footer={false}
            >
                <div className='p-6'>
                    <h1 className='text-2xl font-semibold' style={{ marginBottom: "12px" }}>{formTitle}</h1>
                    <form onSubmit={handleSubmit}>
                        <p className='text-[#6D6D6D] py-1'>Package Name</p>
                        <select name='program' className="w-full p-4 border py-3 outline-none rounded-md cursor-pointer" id="">
                            {[...Array(5).keys()].map(item => <option className="cursor-pointer" key={item} value="">Basic Membership</option>)}
                        </select>
                        <p className='text-[#6D6D6D] py-1'>Title</p>
                        <input value={series} onChange={(e) => setSeries(e.target.value)} className="w-full p-4 border py-3 outline-none rounded-md" name='title' />
                        <div className="flex justify-center items-center mt-7">
                            <input className="px-6 py-2 bg-[#B47000] text-white cursor-pointer" value={`Save`} type="submit" />
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Series

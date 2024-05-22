import React, { useMemo, useState } from 'react'
import { Col, Row } from 'antd';
import { LuPhone } from 'react-icons/lu';
import { FaPlus, FaXmark } from 'react-icons/fa6';
import { CgMail } from "react-icons/cg";
function generateRandomNumber() {
    const randomNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
    return randomNumber;
}
const Contact = () => {
    const isAdmin = true
    const totalNumbers = [
        { number: '+65481123832', id: 'bjasu1' },
        { number: '+65481123832', id: 'bjasu2' },
    ]
    const totalEmailIds = [
        { email: 'bdCalling@gmail.com', id: 'bjasu1' },
        { email: 'bdCalling@gmail.com', id: 'bjasu2' },
    ]
    const [callingNumers, setCallingNumbers] = useState(totalNumbers)
    const [emailIds, setCemailIds] = useState(totalEmailIds)
    return (
        <>
            <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F", padding: '40px 0' }}>Contact Us</h3>
            <Row gutter={16}>
                <Col
                    xs={{ flex: '50%' }}
                >
                    <div className='w-full  px-20 py-10 bg-[#FBFBFB] rounded-md'>
                        <div className='flex justify-start items-center gap-4 text-[#575757]'>
                            <span className='p-3 bg-[#FFF2B4] rounded-full'><LuPhone className='text-xl' /></span> <p className='font-medium text-lg'>Call To Us</p>
                        </div>
                        <div className='w-full mt-6 flex flex-col justify-start items-start gap-2'>
                            {
                                callingNumers?.map((item) => <span key={item?.id} className='relative w-full'>
                                    <input className='w-[90%] bg-[#FEFEFE] border py-3 px-2' type="text" disabled={!isAdmin} name="" id="" defaultValue={item?.number || 'please insert a number'} />
                                    <FaXmark onClick={() => {
                                        const newNumbers = callingNumers.filter((filterItem) => filterItem?.id !== item?.id)
                                        setCallingNumbers(newNumbers)
                                    }} className='absolute right-3 top-[50%] translate-y-[-50%] text-2xl cursor-pointer ' />
                                </span>)
                            }

                            <div className='w-full relative py-3'>
                                <button onClick={() => {
                                    setCallingNumbers([...callingNumers, { number: false, id: generateRandomNumber() }])
                                }} className='p-2 bg-[#B47000] rounded-full absolute right-[4px]'>
                                    <FaPlus className='text-2xl text-white' />
                                </button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col
                    xs={{ flex: '50%' }}
                >
                    <div className='w-full  px-20 py-10 bg-[#FBFBFB] rounded-md'>
                        <div className='flex justify-start items-center gap-4 text-[#575757]'>
                            <span className='p-3 bg-[#FFF2B4] rounded-full'><CgMail className='text-xl' /></span> <p className='font-medium text-lg'>Write To US</p>
                        </div>
                        <div className='w-full mt-6 flex flex-col justify-start items-start gap-2'>
                            {
                                emailIds?.map((item) => <span key={item?.id} className='relative w-full'>
                                    <input className='w-[90%] bg-[#FEFEFE] border py-3 px-2' type="text" disabled={!isAdmin} name="" id="" defaultValue={item?.email || 'please insert a valid email'} />
                                    <FaXmark onClick={() => {
                                        const newEmailIds = emailIds.filter((filterItem) => filterItem?.id !== item?.id)
                                        setCemailIds(newEmailIds)
                                    }} className='absolute right-3 top-[50%] translate-y-[-50%] text-2xl cursor-pointer ' />
                                </span>)
                            }

                            <div className='w-full relative py-3'>
                                <button onClick={() => {
                                    setCemailIds([...emailIds, { email: false, id: generateRandomNumber() }])
                                }} className='p-2 bg-[#B47000] rounded-full absolute right-[4px]'>
                                    <FaPlus className='text-2xl text-white' />
                                </button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Contact

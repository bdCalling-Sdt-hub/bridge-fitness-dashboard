import React, { useEffect, useMemo, useState } from 'react'
import { Col, Row } from 'antd';
import { LuPhone } from 'react-icons/lu';
import { FaPlus, FaXmark } from 'react-icons/fa6';
import { CgMail } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { GetContact } from '../../ReduxSlices/Contact/GetContactSlice';
import { UpdateContact } from '../../ReduxSlices/Contact/UpdateContactSlice';
import { AddContact } from '../../ReduxSlices/Contact/AddContactSlice';
import Swal from 'sweetalert2';
function generateRandomNumber() {
    const randomNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
    return randomNumber;
}
const Contact = () => {
    const dispatch = useDispatch()
    const isAdmin = true
    const [callingNumers, setCallingNumbers] = useState([])
    const [emailIds, setCemailIds] = useState([])
    const { ContactData } = useSelector(state => state.GetContact)
    const [error, setError] = useState([])
    const [emailError, setEmailError] = useState([])
    useEffect(() => {
        dispatch(GetContact())
    }, [])
    useEffect(() => {
        setCemailIds(ContactData?.email || [])
        setCallingNumbers(ContactData?.number || [])
    }, [ContactData])
    const saveData = () => {
        callingNumers?.map(item => {
            if (!item?.number) {
                setError([...error, item.id])
            }
        })
        emailIds?.map(item => {
            if (!item?.email) {
                setEmailError([...error, item.id])
            }
        })
        if (emailError.length > 0 || error.length > 0) {
            return false
        }
        const data = {
            email: emailIds,
            number: callingNumers
        }
        if (ContactData?._id) {
            dispatch(UpdateContact({ id: ContactData._id, data })).then((res) => {
                if (res.type == 'UpdateContact/fulfilled') {
                    dispatch(GetContact())
                    Swal.fire({
                        title: "updated!",
                        text: "Your Contact info been Updated.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
        } else {
            dispatch(AddContact(data)).then((res) => {
                if (res.type == 'AddContact/fulfilled') {
                    dispatch(GetContact())
                    Swal.fire({
                        title: "Added!",
                        text: "Your Contact info been added.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
        }
    }
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
                                    <input onInput={(e) => {
                                        setError([])
                                        const newArray = callingNumers.map(items => {
                                            if (items?.id == item.id) {
                                                return { ...items, number: e.target.value }
                                            } else {
                                                return items
                                            }
                                        })
                                        setCallingNumbers(newArray)
                                    }} className='w-[90%] bg-[#FEFEFE] border py-3 px-2' type="text" disabled={!isAdmin} name="" id="" placeholder='please insert a number' defaultValue={item?.number || ''} />
                                    <FaXmark onClick={() => {
                                        const newNumbers = callingNumers.filter((filterItem) => filterItem?.id !== item?.id)
                                        setCallingNumbers(newNumbers)
                                    }} className='absolute right-3 top-[50%] translate-y-[-50%] text-2xl cursor-pointer ' />
                                    {
                                        error.includes(item?.id) && <p className='text-red-500'>please input a number or delete this field</p>
                                    }
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
                                    <input onInput={(e) => {
                                        setEmailError([])
                                        const newArray = emailIds.map(items => {
                                            if (items?.id == item.id) {
                                                return { ...items, email: e.target.value }
                                            } else {
                                                return items
                                            }
                                        })
                                        setCemailIds(newArray)
                                    }} className='w-[90%] bg-[#FEFEFE] border py-3 px-2' type="text" disabled={!isAdmin} name="" id="" defaultValue={item?.email || ''} placeholder='please insert a valid email' />
                                    <FaXmark onClick={() => {
                                        const newEmailIds = emailIds.filter((filterItem) => filterItem?.id !== item?.id)
                                        setCemailIds(newEmailIds)
                                    }} className='absolute right-3 top-[50%] translate-y-[-50%] text-2xl cursor-pointer ' />
                                    {
                                        emailError.includes(item?.id) && <p className='text-red-500'>please input a email or delete this field</p>
                                    }
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
            <div className='text-center'>
                <button onClick={saveData} className='disabled:bg-gray-300 bg-[#B47000]' style={{
                    display: 'block',
                    padding: '12px 24px',
                    margin: "0 auto",
                    marginTop: '30px',
                    fontWeight: '500',
                    color: 'white'
                }}>Save & change</button>
            </div>
        </>
    )
}

export default Contact

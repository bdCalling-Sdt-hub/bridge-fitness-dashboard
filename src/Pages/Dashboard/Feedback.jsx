import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllFeedback } from '../../ReduxSlices/Feedback/GetAllFeedbackSlice'
import { ServerUrl } from '../../../Config'
import { Empty, Pagination } from 'antd'
import { ApproveFeedback } from '../../ReduxSlices/Feedback/ApproveFeedbackSlice'
import Swal from 'sweetalert2'
import { DeleteFeedback } from '../../ReduxSlices/Feedback/DeleteFeedbackSlice'

const Feedback = () => {
    const dispatch = useDispatch()
    const { Feedback, meta } = useSelector(state => state.GetAllFeedback)
    const [itemPerPage, setItemPerPage] = useState(20)
    const [page, setPage] = useState(1)
    useEffect(() => {
        dispatch(GetAllFeedback({ page: page, limit: itemPerPage, }))
    }, [])
    const onChange = (pageNumber) => {
        setPage(pageNumber)
    };
    const onShowSizeChange = (current, size) => {
        setItemPerPage(size);
    }
    const handleApprove = (id) => {
        dispatch(ApproveFeedback({ id: id })).then((res) => {
            if (res.type == 'ApproveFeedback/fulfilled') {
                Swal.fire({
                    title: "Approved!",
                    text: "feedback has been Approved.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    dispatch(GetAllFeedback({ page: page, limit: itemPerPage, }))
                })
            }
        })
    }
    const handleDelete = (id) => {
        dispatch(DeleteFeedback({ id: id })).then((res) => {
            if (res.type == 'DeleteFeedback/fulfilled') {
                Swal.fire({
                    title: "Deleted!",
                    text: "feedback has been Deleted.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    dispatch(GetAllFeedback({ page: page, limit: itemPerPage, }))
                })
            }
        })
    }
    return (
        <div className='bg-white p-6 rounded-md'>
            <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F" }}>
                Feedbacks
            </h3>
            <div className='grid grid-cols-3 gap-6 mt-4'>
                {
                    (Feedback && Feedback.length) <= 0 && [...Array(3).keys()].map((item) => <Empty key={item} />)
                }
                {
                    Feedback.slice(0, 10).map((item, index) => (
                        <div
                            className={` relative pb-5 rounded-md`}
                            key={item?._id}
                            style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}
                        >
                            <div className='px-8 py-6  text-black text-center flex flex-col justify-center items-center gap-2 '>
                                <div className='flex justify-center items-center gap-3'>
                                    <div className='h-20 w-20 rounded-full overflow-hidden'>
                                        <img src={item?.user?.profile_image.includes('http') ? 'https://i.ibb.co/d4RSbKx/Ellipse-980.png' : `${ServerUrl}/${item?.user?.profile_image}`} className='h-full w-full object-cover' alt="" />
                                    </div>
                                    <div>
                                        <h4 className='text-[#555555] font-semibold whitespace-nowrap text-left'>{item?.user?.name}</h4>
                                        <p className='text-[#555555] font-thin whitespace-nowrap text-left'>{item?.user?.role}</p>
                                    </div>
                                </div>
                                <p className='mt-2 capitalize'>{item?.text}</p>
                                <p className='capitalize'>status : <span className={`${item?.approveStatus == 'pending' ? 'text-red-600' : 'text-green-600'}`}>{item?.approveStatus}</span></p>
                            </div>
                            <div className='absolute right-1 bottom-1'>
                                <button onClick={() => handleDelete(item?._id)} className='p-1 px-3 mr-2 bg-red-600  rounded-md uppercase text-white hover:scale-105 active:scale-95 transition-all'>delete</button>
                                {
                                    item?.approveStatus == 'pending' && <button onClick={() => handleApprove(item?._id)} className='p-1 px-3 bg-[#B47000] rounded-md uppercase text-white hover:scale-105 active:scale-95 transition-all'>approve</button>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='text-center mt-8'>
                <Pagination defaultCurrent={page} total={meta?.total} pageSize={itemPerPage} onShowSizeChange={onShowSizeChange} onChange={onChange} />
            </div>
        </div>
    )
}

export default Feedback


import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useDispatch, useSelector } from 'react-redux';
import { AddPrivecy } from '../../ReduxSlices/Privecy/AddPrivecySlice';
import Swal from 'sweetalert2';
import { PrivecyPolicy } from '../../ReduxSlices/Privecy/PrivecyPolicySlice';
const PrivacyPolicy = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [isLoading, seLoading] = useState(false)
    const dispatch = useDispatch()
    const { PrivecyPolicyData } = useSelector(state => state.PrivecyPolicy)
    useEffect(() => {
        setContent(PrivecyPolicyData[0]?.description)
    }, [PrivecyPolicyData])
    useEffect(() => {
        dispatch(PrivecyPolicy())
    }, [])
    const handleTerms = () => {
        seLoading(true)
        dispatch(AddPrivecy({ description: content })).then((res) => {
            seLoading(false)
            setContent('')
            if (res.type == 'AddPrivecy/fulfilled') {
                Swal.fire({
                    title: "Added",
                    text: "New Terms has been Added.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    title: "opps!",
                    text: "something went's wrong",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        })
    }
    const config = {
        readonly: false,
        placeholder: 'Start typings...',
        style: {
            height: 400,
        }
    }
    return (
        <>
            <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F", padding: '40px 0' }}>Privacy Policy</h3>
            <div>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={newContent => setContent(newContent)}
                    onChange={newContent => { }}
                />
            </div>
            <button disabled={isLoading} onClick={handleTerms} className='disabled:bg-gray-300 bg-[#B47000]' style={{
                display: 'block',
                padding: '12px 24px',
                margin: "0 auto",
                marginTop: '30px',
                fontWeight: '500',
                color: 'white'
            }}>Save & change</button>
        </>
    )
}

export default PrivacyPolicy

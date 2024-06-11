import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { useDispatch, useSelector } from 'react-redux';
import { AddTerms } from '../../ReduxSlices/Terms/AddTermsSlice';
import Swal from 'sweetalert2';

const Terms = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [isLoading, seLoading] = useState(false)
    const dispatch = useDispatch()
    const handleTerms = () => {
        seLoading(true)
        dispatch(AddTerms({ description: content })).then((res) => {
            seLoading(false)
            setContent('')
            if (res.type == 'AddTerms/fulfilled') {
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
            <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F", padding: '40px 0' }}>Terms & Condition</h3>
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

export default Terms

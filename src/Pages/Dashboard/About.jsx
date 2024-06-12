import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { AddAbout } from '../../ReduxSlices/About/AddAboutSlice';
import { GetAboutContent } from '../../ReduxSlices/About/GetAboutContentSlice';


const About = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [isLoading, seLoading] = useState(false)
    const dispatch = useDispatch()
    const { AboutUs } = useSelector(state => state.GetAboutContent)
    useEffect(() => {
        setContent(AboutUs?.description)
    }, [AboutUs])
    useEffect(() => {
        dispatch(GetAboutContent())
    }, [])
    const handleTerms = () => {
        seLoading(true)
        dispatch(AddAbout({ description: content })).then((res) => {
            seLoading(false)
            setContent('')
            if (res.type == 'AddAbout/fulfilled') {
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
            <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F", padding: '40px 0' }}>About us</h3>
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
    );
};

export default About

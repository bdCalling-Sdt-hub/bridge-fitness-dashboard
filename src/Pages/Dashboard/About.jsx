import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';


const About = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = {
        readonly: false,
        placeholder: 'Start typings...'
    }
    console.log(content)
    return (
        <>
            <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F",padding:'40px 0' }}>About us</h3>
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
        </>
    );
};

export default About

import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowCircleLeft } from "react-icons/md";

const BackButton = ({ link }) => {
    const navigate = useNavigate()
    return (
        <div 
            onClick={()=>navigate(`${link}`)}
            style={{
                width: "fit-content",
                color: "#62676C",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
            }}
        > 
            <MdOutlineArrowCircleLeft size={24} color='#62676C' />
            <p style={{fontSize: "20px"}}>Back</p>
        </div>
    )
}

export default BackButton
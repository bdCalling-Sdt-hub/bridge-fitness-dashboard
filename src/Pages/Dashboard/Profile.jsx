import React, { useState } from 'react'
import BackButton from './BackButton'
import { Form, Input, Button } from 'antd';
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Swal from 'sweetalert2';

const Profile = () => {
    const [image, setImage] = useState("https://avatars.design/wp-content/uploads/2021/02/corporate-avatars-TN-1.jpg");
    const [imgURL, setImgURL] = useState(image);
    const handleSubmit=(values)=>{
        console.log(values)
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Updated Successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }
    const handleReset=()=>{
        window.location.reload()
    }
    const onChange = (e) => {
        const file= e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setImgURL(imgUrl);
        setImage(file)
    };
    const initialFormValues = {
        fullName: "Nadir Hossain",
        email: "nadirhossain336@gmail.com",
        mobile_number: "01756953936"
    };

    return (
        <div>
            <div style={{margin: "30px 0"}}>
                <BackButton link="/" />
            </div>

            <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "38px"}}>
                <input onChange={onChange} type="file" name="" id="img" style={{display: "none"}} />
                <label  
                    htmlFor="img" 
                    style={{
                        width: "130px", 
                        cursor: "pointer", 
                        height: "130px", 
                        borderRadius: "18px", 
                        border: "1px dashed #4C535F", 
                        background: "white",
                        backgroundImage: `url(${imgURL})`, 
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        
                    }}
                >
                    <div 
                        style={{
                            background: "rgba(0, 0, 0, 0.4)",
                            width: "100%", 
                            height: "100%", 
                            borderRadius: "18px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems:"center",
                            justifyContent: "center",
                            
                        }}
                    >
                        <MdOutlineAddPhotoAlternate size={36} color='white' />
                        <p style={{color:'white', marginTop: "12px"}}>Upload Photo</p>
                    </div>
                </label>
            </div>

            <div style={{display: "flex",  alignItems: "center", justifyContent: "center"}}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={initialFormValues}
                    style={{width: "543px", height: "fit-content"}}
                    onFinish={handleSubmit}
                >

                    <div style={{marginBottom: "20px"}}>
                        <label style={{display: "block", marginBottom: "5px" }}>Full Name</label>
                        <Form.Item
                            style={{marginBottom: 0}}
                            name="fullName"
                        >
                            <Input
                                placeholder="Enter Your Full Name"
                                type="text"
                                style={{
                                border: "1px solid #E0E4EC",
                                height: "52px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                                }}
                            />
                        </Form.Item>
                    </div>
    
                    <div style={{marginBottom: "20px"}}>
                        <label style={{display: "block", marginBottom: "5px" }} htmlFor="">Email</label>
                        <Form.Item
                            name="email"
                            style={{marginBottom: 0}}
                        >
                            <Input
                                type="text"
                                placeholder="Enter Email"
                                style={{
                                border: "1px solid #E0E4EC",
                                height: "52px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                                }}
                            />
                        </Form.Item>
                    </div>
    
                    <div style={{marginBottom: "40px"}}>
                        <label style={{display: "block", marginBottom: "5px" }} htmlFor="email">Phone Number</label>
                        <Form.Item
                            style={{marginBottom: 0}}
                            name="mobile_number"
                        >
                            <Input
                                type="text"
                                placeholder="Enter Phone Number"
                                style={{
                                border: "1px solid #E0E4EC",
                                height: "52px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                                }}
                            />
                        </Form.Item>
                    </div>

                    <div style={{width: "100%", display: "flex", gap: "16px", alignItems: "center"}}>
                        <div style={{width: "100%"}}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    style={{
                                        border: "none",
                                        height: "51px",
                                        background: "#2FD5C7",
                                        color: "white",
                                        borderRadius: "8px",
                                        outline: "none",
                                    }}
                                >
                                    UPDATE
                                </Button>
                            </Form.Item>
                        </div>
                        <div style={{width: "100%"}}>
                            <Form.Item>
                                <Button
                                    onClick={handleReset}
                                    block
                                    style={{
                                        border: "none",
                                        height: "51px",
                                        background: "#BFF2EE",
                                        color: "#2FD5C7",
                                        borderRadius: "8px",
                                        outline: "none",
                                    }}
                                >
                                    RESET
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Profile
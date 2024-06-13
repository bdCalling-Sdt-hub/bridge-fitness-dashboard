import React, { useState } from 'react'
import BackButton from './BackButton'
import { Form, Input, Button } from 'antd';
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Swal from 'sweetalert2';
import { ChangePass } from '../../ReduxSlices/Profile/ChangePassSlice';

const Profile = () => {
    const [image, setImage] = useState();
    const [form] = Form.useForm()
    const [tab, setTab] = useState(new URLSearchParams(window.location.search).get('tab') || "Profile");
    const dispatch = useAppDispatch()
    const { user }= useAppSelector(state => state.Profile)
    // console.log(user)
    const handlePageChange = (tab) => {
        setTab(tab);
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        setImage(file)

    }
    const onFinish = (values) => {
        if (values?.new_password !== values?.confirm_password) {
            return Swal.fire({
                title: "Confirm password doesn't match",
                icon: "error",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "okey"
            })
        }
        form.setFieldsValue(values)
        dispatch(ChangePass({ oldPassword: values.current_password, newPassword: values.new_password }))
            .then((res) => {
                if (res.type === 'ChangePass/fulfilled') {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your password has been changed",
                        showConfirmButton: false,
                        timer: 1500
                    }).then((response) => {
                        form.resetFields();
                    })
                }
            })
    };
    const onEditProfile = (values) => {
        // console.log(values)
        const data= {
            profile_image: image,
            name: values.fullName,
            contact: values.mobileNumber,
            address: values.address
        }
        dispatch(EditProfile(data))
            .then((res) => {
                if (res.type === 'EditProfile/fulfilled') {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your profile has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    useEffect(() => {
        const data = {
            fullName: user.name,
            mobileNumber: user.phone_number,
            address: user.address
        }
        form.setFieldsValue(data)
    }, [user])

    return (
        <div>
            <div style={{ margin: "30px 0" }}>
                <BackButton link="/" />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "38px" }}>
                <input onChange={onChange} type="file" name="" id="img" style={{ display: "none" }} />
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
                            alignItems: "center",
                            justifyContent: "center",

                        }}
                    >
                        <MdOutlineAddPhotoAlternate size={36} color='white' />
                        <p style={{ color: 'white', marginTop: "12px" }}>Upload Photo</p>
                    </div>
                </label>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={initialFormValues}
                    style={{ width: "543px", height: "fit-content" }}
                    onFinish={onFinish}
                >

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", marginBottom: "5px" }}>Full Name</label>
                        <Form.Item
                            style={{ marginBottom: 0 }}
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

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", marginBottom: "5px" }} htmlFor="">Email</label>
                        <Form.Item
                            name="email"
                            style={{ marginBottom: 0 }}
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

                    <div style={{ marginBottom: "40px" }}>
                        <label style={{ display: "block", marginBottom: "5px" }} htmlFor="email">Phone Number</label>
                        <Form.Item
                            style={{ marginBottom: 0 }}
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

                    <div style={{ width: "100%", display: "flex", gap: "16px", alignItems: "center" }}>
                        <div style={{ width: "100%" }}>
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
                        <div style={{ width: "100%" }}>
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
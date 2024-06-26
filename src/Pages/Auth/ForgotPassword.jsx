import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import forgatePass from "../../assets/forgatePass.png";
import { useDispatch } from "react-redux";
import { ForgetPass } from "../../ReduxSlices/Authentication/ForgetPassSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(ForgetPass({ email: values.email }))
    .then(response => {
        if (response?.payload?.success && values.email) {
          localStorage.setItem('resetEmail', values.email)
            Swal.fire({
                title: "please check your email",
                text: "a verification code has been sent to your email",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "okey"
            }).then(()=>{
              navigate("/otp")
            })
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            timer:1500,
            showConfirmButton:false,
            showCloseButton:false
          });
        }
    })
  };
  return (
    <div className="grid grid-cols-2 gap-0 "
      style={{
        width: "100%",
        background: "#F4EAD9",
        height: "100vh",
      }}
    >
      <div className="flex justify-center items-center">
        <img src={forgatePass} alt="" />
      </div>
      <div className="w-full bg-white flex justify-center items-center">
        <Form
          name="normal_login"
          className="password-form"
          initialValues={{
            remember: true,
          }}
          style={{ width: "630px", background: "white", borderRadius: "12px", padding: "90px 57px" }}

          onFinish={onFinish}
        >
          <h1 style={{ fontSize: "32px", marginBottom: "54px", color: "#494949", textAlign: "center" }}>Forgot Password</h1>

          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}> Email Address</label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="email"
              id="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email address"
                type="email"
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              style={{
                height: "45px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#555555",
                color: "white",
                alignSelf: "bottom",
                marginTop: "30px",
              }}
            >
              Send a Code
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;

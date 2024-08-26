import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import loginImage from "../../assets/loginImage.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { UserData, reset } from "../../ReduxSlices/SigninSlice";

import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, userData, accessToken, message } =
    useSelector((state) => state.UserData);
  // useEffect(() => {
  //   if (isError == true) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: message,
  //     });
  //   }
  //   if (isSuccess == true) {
  //     localStorage.setItem("yourInfo", JSON.stringify(userData));
  //     window.location.href = "/";
  //   }

  //   dispatch(reset());
  // }, [isLoading, isError, isSuccess, dispatch, navigate]);

  const onFinish = (values) => {
    dispatch(UserData(values)).then((res) => {
      console.log(res)
      if (res.type == 'UserData/fulfilled') {
        navigate('/')
        location.reload()
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res?.payload?.message,
          showCloseButton: false,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  return (
    <div
      className="grid grid-cols-2 gap-0"
      style={{
        width: "100%",
        background: "#F4EAD9",
        height: "100vh",
      }}
    >
      <div className="flex justify-center items-center">
        <img src={loginImage} alt="" />
      </div>
      <div className="bg-white flex justify-center items-center">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          style={{
            width: "630px",
            background: "white",
            borderRadius: "12px",
            padding: "90px 57px",
          }}
          onFinish={onFinish}
        >
          <h1
            style={{ fontSize: "32px", color: "#6A6D7C", textAlign: "center" }}
          >
            Login to Account
          </h1>
          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px" }}
            >
              {" "}
              Email address:{" "}
            </label>
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

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{ display: "block", marginBottom: "5px" }}
              htmlFor="password"
            >
              Password
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter your password"
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: "#6A6D7C" }}>Remember me</Checkbox>
            </Form.Item>
            <Link
              className="login-form-forgot "
              style={{ color: "#B47000" }}
              to="/forgot-password"
            >
              Forgot password
            </Link>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              style={{
                height: "52px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#242424",
                marginTop: "56px",
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

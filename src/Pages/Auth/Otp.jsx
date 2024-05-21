import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");

  const handleResendEmail = () => {
    const email = JSON.parse(localStorage.getItem("email"));

  };
  const handleVerifyOtp=()=>{
    Swal.fire({
      title: "Password Reset",
      text: "Your password has been successfully reset. click confirm to set a new password",
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/update-password")
      }
    });
  }

  return (
    <div
      style={{
        width: "100%",
        background: "#BFF2EE",
        height: "100vh",
        display:"flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={{width: "630px",  background: "white", borderRadius: "12px", padding: "90px 57px"}}>
        <h1 style={{fontSize: "32px", color: "#6A6D7C", marginBottom: "13px", textAlign: "center"}}>Check your email</h1>
        <p style={{width: "380px", color: "#B8B8B8",  margin: "0 auto 0 auto"}}>
          We sent a reset link to <span style={{color: "#545454"}}> contact@dscode...com </span>
          enter 6 digit code that mentioned in the email
        </p>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px",}}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{
              height: "44px",
              width: "44px",
              borderRadius: "8px",
              marginRight: "16px",
              fontSize: "20px",
              border: "1px solid #A9A9A9",
              color: "#2B2A2A",
              outline: "none"
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <Button
          onClick={handleVerifyOtp}
              block
              htmlType="submit"
              style={{
                height: "52px",
                fontWeight: "400px",
                fontSize: "18px",
                color: "white",
                background: "#2FD5C7",
                marginTop: "30px",
                border: "none",
                outline: "none",
                marginBottom: "20px"
              }}
            >
              Verify
        </Button>
        <p style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          Didn’t receive code?
          <p onClick={handleResendEmail} style={{color: "#2FD5C7", textDecoration: "underline", cursor: "pointer"}}>Resend </p>
        </p>
      </div>
    </div>
  );
};

export default Otp;

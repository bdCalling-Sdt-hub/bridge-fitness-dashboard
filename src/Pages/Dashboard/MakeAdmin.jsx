import { Form, Input, Modal, Table, Button, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AddAdmin } from "../../ReduxSlices/MakeAdminSlice/AddAdminSlice";
import { DeleteAdmin } from "../../ReduxSlices/MakeAdminSlice/DeleteAdminSlice";
import Swal from "sweetalert2";

const MakeAdmin = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [reFresh, setReFresh] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteID, setdeleteID] = useState('')
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(AddAdmin(values)).then((response) => {
      console.log(response)
      if (response.type === "AddAdmin/fulfilled") {
        setOpenAddModel(false);
        Swal.fire({
          title: "Admin Added",
          text: "new admin has been added.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // useEffect(() => {
  //   dispatch(AddAdmin()).then((res)=>console.log(res));
  // }, [dispatch]);

  const admins = useSelector((state) => state.AddAdmin.userData);
  console.log(admins)
  const data = admins
    ? admins.map((admin, index) => ({
      key: index + 1,
      fullName: admin.name,
      email: admin.email,
      userType: admin.role,
    }))
    : [];

  if (reFresh) {
    setTimeout(() => {
      setReFresh("");
    }, 1500);
  }

  const handleDelete = async () => {
    dispatch(DeleteAdmin({ id: deleteID })).then((res) => {
      console.log(res)
      if (res.type == "DeleteAdmin/fulfilled") {
        Swal.fire({
          position: "center",
          title: "Deleted!",
          text: "User Deleted Successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          setShowDelete(false);
          setdeleteID('')
          dispatch(AllAdmin());
        });
      }
    });
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <p>{record?.fullName}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <MdOutlineDelete
          onClick={() => {
            setShowDelete(true);
            setdeleteID(record.id);
          }}
          className="cursor-pointer"
          style={{
            cursor: "pointer",
          }}
          size={25}
          color="red"
        />
      ),
    },
  ];

  return (
    <div id="makeAdmin">
      <div style={{ margin: "24px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F" }}>
            Make Admin
          </h3>
          <button
            onClick={() => setOpenAddModel(true)}
            style={{
              borderRadius: "4px",
              color: "#F2F2F2",
              backgroundColor: "#B47000",
              border: "none",
              outline: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              padding: "10px 20px",
              fontWeight: "500",
            }}
          >
            <FaPlus
              style={{
                marginTop: "-2px",
              }}
            />
            Make Admin
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md min-h-[96vh]">
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>

      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 style={{ marginBottom: "12px" }}>Make Admin</h1>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
              role: "ADMIN",
            }}
            onFinish={onFinish}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: "16px", width: "100%" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Full Name
                  </label>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input User Full Name",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Full Name"
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
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: "16px", width: "100%" }}>
                  <label
                    style={{ display: "block", marginBottom: "5px" }}
                    htmlFor=""
                  >
                    Email{" "}
                  </label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input User Email",
                      },
                    ]}
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      type="text"
                      placeholder="Enter User Email"
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
              </Col>
            </Row>

            <div style={{ marginBottom: "16px" }}>
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
                    message: "Please input User Password!",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Enter User password"
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

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{ display: "block", marginBottom: "5px" }}
                htmlFor="password"
              >
                Phone Number
              </label>
              <Form.Item
                style={{ marginBottom: 0 }}
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please input Phone Number",
                  },
                ]}
              >
                <Input
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  border: "none",
                  height: "52px",
                  background: "#B47000",
                  color: "white",
                  borderRadius: "8px",
                  outline: "none",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        centered
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#B47000] text-center font-semibold">
            Are you sure !
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this content ?
          </p>
          <button
            onClick={handleDelete}
            className="bg-[#B47000] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MakeAdmin;

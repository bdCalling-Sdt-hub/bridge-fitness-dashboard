import React, { useEffect, useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { Form, Input, Modal, Table } from "antd";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AllProgram } from "../../ReduxSlices/CreateProgram/GetCreateProgramesSlice";
import moment from "moment";
import { AddProgram } from "../../ReduxSlices/CreateProgram/AddCreateProgramSlice";

const CreateProgram = () => {
  const [subName, setsubName] = useState("");
  const [subPrice, setsubPrice] = useState("");
  const [openAddModel, setOpenAddModel] = useState(false);
  const [reFresh, setReFresh] = useState("");
  const [formTitle, setFormTitle] = useState("Add New Program");
  const [imgFile, setImgFile] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllProgram());
  }, [dispatch]);

  const programs = useSelector((state) => state.GetProgram.userData.data);
  console.log(programs);

  const data = programs?.map((program, index) => ({
    key: index + 1,
    name: program?.title,
    date: moment(program?.createdAt).format("l"),
  }));

  if (reFresh) {
    setTimeout(() => {
      setReFresh("");
    }, 1500);
  }

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "pakg",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (_, record) => (
        <>
          <button
            onClick={() => {
              setOpenAddModel(true);
              const manageSubscription = data.filter(
                (item) => item.key == record.key
              );
              setsubName(manageSubscription[0].name);
              setsubPrice(manageSubscription[0].price);
              setFormTitle("Edit Program");
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <RiEditLine
              style={{
                fontSize: "22px",
              }}
            />
          </button>
        </>
      ),
    },
  ];

  const onFinish = (values) => {
    const formData = new FormData();
    if (imgFile) {
      formData.append("image", imgFile);
    }
    if (!imgFile) {
      return false;
    }
    formData.append("title", values.title);
    dispatch(AddProgram(formData)).then((res) => console.log(res));
  };
  // images
  const handleChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  return (
    <div>
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
            Create Program
          </h3>
          <button
            onClick={() => {
              setFormTitle("Add New Program");
              setOpenAddModel(true);
            }}
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
            Create Program
          </button>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={500}
        footer={false}
      >
        <div className="p-6 ">
          <h1
            className="font-semibold text-[#555555]"
            style={{ marginBottom: "12px" }}
          >
            {formTitle}
          </h1>
          <Form onFinish={onFinish}>
            <div>
              <p className="text-[#6D6D6D] py-1">Package Name</p>
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input Package Name",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setsubName(e.target.value);
                  }}
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>

            <div>
              <p className="text-[#6D6D6D] py-1">Package Image</p>

              <label
                htmlFor="image"
                style={{ display: "block", margin: "4px 0" }}
                className="p-3 border"
              >
                <Form.Item name="image">
                  {imgFile ? (
                    <img src={URL.createObjectURL(imgFile)} alt="" />
                  ) : (
                    <div className="flex justify-center items-center w-full h-full border-dashed border border-black py-10">
                      <FaRegImage className="text-2xl" />
                    </div>
                  )}
                  <div className="hidden">
                    <Input
                      id="image"
                      placeholder="150 CND"
                      type="file"
                      onChange={handleChange}
                      style={{
                        border: "1px solid #E0E4EC",
                        height: "52px",
                        background: "white",
                        borderRadius: "8px",
                        outline: "none",
                      }}
                    />
                  </div>
                </Form.Item>
              </label>
            </div>
            <div className="text-center mt-6">
              <button className="bg-[#B47000] px-6 py-3 text-[#FEFEFE]">
                Save
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateProgram;

import React, { useEffect, useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { Form, Input, Modal, Table } from "antd";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AllProgram } from "../../ReduxSlices/CreateProgram/GetCreateProgramesSlice";
import moment from "moment";
import { AddProgram } from "../../ReduxSlices/CreateProgram/AddCreateProgramSlice";
import { ServerUrl } from "../../../Config";
import Swal from "sweetalert2";
import { UpdateProgram } from "../../ReduxSlices/CreateProgram/UpdateProgramSlice";

const CreateProgram = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [formTitle, setFormTitle] = useState("Add New Program");
  const [imgFile, setImgFile] = useState(null);
  const [itemForEdit, setItemForEdit] = useState(null)
  const dispatch = useDispatch();
  const [form] = Form.useForm()
  useEffect(() => {
    dispatch(AllProgram());
  }, [dispatch]);
  const programs = useSelector((state) => state.AllProgram?.userData?.data);
  const data = programs?.map((program, index) => ({
    key: index + 1,
    name: program?.title,
    date: moment(program?.createdAt).format("l"),
    img: program?.image,
    id:program?._id
  }));
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
              setFormTitle("Edit Program");
              setItemForEdit(record)
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
    if (formTitle == 'Add New Program') {
      if (imgFile) {
        formData.append("image", imgFile);
      }
      if (!imgFile) {
        return false;
      }
      formData.append("title", values.title);
      dispatch(AddProgram(formData)).then((res) => {
        if (res.type == 'AddProgram/fulfilled') {
          Swal.fire({
            title: "Added!",
            text: "New Program has been added.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(()=>{
            form.resetFields()
            dispatch(AllProgram());
            setImgFile(null)
            setOpenAddModel(false)
            setItemForEdit(null)
          });;
        }
      });
    } else {
      if (imgFile) {
        formData.append("image", imgFile);
      } else {
        formData.append("image", itemForEdit.img);
      }
      formData.append("title", values.title);
      dispatch(UpdateProgram({id:itemForEdit?.id,data:formData})).then((res) => {
        if (res.type == 'UpdateProgram/fulfilled') {
          dispatch(AllProgram());
          Swal.fire({
            title: "Updated!",
            text: "Program has been Updated.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(()=>{
            form.resetFields()
            dispatch(AllProgram());
            setImgFile(null)
            setOpenAddModel(false)
            setItemForEdit(null)
          });
        }
      });
    }

  };
  // images
  const handleChange = (e) => {
    setImgFile(e.target.files[0]);
  };
  useEffect(() => {
    if (!itemForEdit) {
      return
    }
    form.setFieldsValue({ title: itemForEdit.name })
  }, [itemForEdit])
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
              setItemForEdit(null)
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
        onCancel={() => { setItemForEdit(null); setImgFile(null); setOpenAddModel(false) }}
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
          <Form onFinish={onFinish} form={form}>
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

                  <div className="flex justify-center items-center w-full h-full border-dashed border border-black py-10">
                    {imgFile ? (
                      <img src={URL.createObjectURL(imgFile)} alt="" />
                    ) : itemForEdit?.img ? <img src={`${ServerUrl}${itemForEdit.img}`} alt="" /> : (
                      <FaRegImage className="text-2xl" />)}
                  </div>

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

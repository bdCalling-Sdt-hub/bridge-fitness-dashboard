import React, { useEffect, useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { Form, Input, Modal, Select, Table } from "antd";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AllProgram } from "../../ReduxSlices/CreateProgram/GetCreateProgramesSlice";
import moment from "moment";
import { AddProgram } from "../../ReduxSlices/CreateProgram/AddCreateProgramSlice";
import { ServerUrl } from "../../../Config";
import Swal from "sweetalert2";
import { UpdateProgram } from "../../ReduxSlices/CreateProgram/UpdateProgramSlice";
import { MdDelete } from "react-icons/md";
import { DeleteProgram } from "../../ReduxSlices/CreateProgram/DeleteProgramSlice";
import { AllCategory } from "../../ReduxSlices/Category/AllCategorysSlice";

const CreateProgram = () => {
  const [page, setPage] = useState(1)
  const [openAddModel, setOpenAddModel] = useState(false);
  const [formTitle, setFormTitle] = useState("Add New Program");
  const [imgFile, setImgFile] = useState(null);
  const [itemForEdit, setItemForEdit] = useState(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(AllProgram(page));
    dispatch(AllCategory());
  }, [dispatch, page]);
  const { userData: category } = useSelector((state) => state.AllCategory);
  const { userData } = useSelector((state) => state.AllProgram);
  const { isLoading } = useSelector((state) => state.AddProgram);
  const data = userData?.data?.map((program, index) => ({
    key: index + 1,
    name: program?.title,
    date: moment(program?.createdAt).format("l"),
    img: program?.image,
    id: program?._id,
    accessType: program?.accessType,
    category: program?.category || "category not found",
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
      key: "name",
    },
    {
      title: "Category ",
      dataIndex: "category",
      key: "category",
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
        <div className="flex justify-start items-center gap-3">
          <button
            onClick={() => {
              setOpenAddModel(true);
              setFormTitle("Edit Program");
              setItemForEdit(record);
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
          <button
            onClick={() => {
              setItemForEdit(record);
              handeldelete()
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
            <MdDelete style={{ fontSize: "22px" }} />
          </button>
        </div>
      ),
    },
  ];

  const onFinish = (values) => {
    const formData = new FormData();
    if (formTitle == "Add New Program") {
      if (imgFile) {
        formData.append("image", imgFile);
      }
      if (!imgFile) {
        return false;
      }
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("accessType", values.subscription);
      dispatch(AddProgram(formData)).then((res) => {
        if (res.type == "AddProgram/fulfilled") {
          Swal.fire({
            title: "Added!",
            text: "New Program has been added.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            form.resetFields();
            dispatch(AllProgram());
            setImgFile(null);
            setOpenAddModel(false);
            setItemForEdit(null);
          });
        } else {
          Swal.fire({
            title: "Ops !!",
            text: "failed to add  New Program",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          })
        }
      });
    } else {
      if (imgFile) {
        formData.append("image", imgFile);
      } else {
        formData.append("image", itemForEdit.img);
      }
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("accessType", values.subscription);
      dispatch(UpdateProgram({ id: itemForEdit?.id, data: formData })).then(
        (res) => {
          if (res.type == "UpdateProgram/fulfilled") {
            dispatch(AllProgram());
            Swal.fire({
              title: "Updated!",
              text: "Program has been Updated.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              form.resetFields();
              dispatch(AllProgram());
              setImgFile(null);
              setOpenAddModel(false);
              setItemForEdit(null);
            });
          }
        }
      );
    }
  };
  // images
  const handleChange = (e) => {
    setImgFile(e.target.files[0]);
  };
  useEffect(() => {
    if (!itemForEdit) {
      return;
    }
    form.setFieldsValue({ title: itemForEdit.name, subscription: itemForEdit.accessType });
  }, [itemForEdit]);
  const handeldelete = () => {
    if (!itemForEdit?.id) {
      return
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteProgram({ id: itemForEdit?.id })).then((res) => {
          console.log(res)
          if (res.type == 'DeleteProgram/fulfilled') {
            Swal.fire({
              title: "Deleted!",
              text: "Your Program has been Deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            dispatch(AllProgram(page));
            setItemForEdit(null);
          } else {
            Swal.fire({
              title: "Ops !!",
              text: "failed to delete  Program",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            })
          }
        })
      }
    });

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
              setItemForEdit(null);
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
        <Table columns={columns} dataSource={data} pagination={{
          pageSize: userData?.meta?.limit || 10,
          total: userData?.meta?.total || 0,
          current: page,
          onChange: (page) => setPage(page)
        }} />
      </div>
      <Modal
        centered
        open={openAddModel}
        onCancel={() => {
          // null;
          setImgFile(null);
          setOpenAddModel(false);
          form.resetFields();
        }}
        width={600}
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
              <p className="text-[#6D6D6D] py-1">Program Name</p>
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
            <div className="row-span-2 col-span-2" style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Category
              </label>
              <Form.Item
                style={{
                  marginBottom: 0,
                }}
                name="category"
              >
                <Select
                  placeholder={'category'}
                  style={{
                    border: "1px solid #E0E4EC",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                  options={category?.map((item) => {
                    return {
                      value: item?.name,
                      label: item?.name,
                    };
                  })}
                ></Select>
              </Form.Item>
            </div>
            <div className="row-span-2 col-span-2" style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Subscription
              </label>
              <Form.Item
                style={{
                  marginBottom: 0,
                }}
                name="subscription"
              >
                <Select
                  placeholder={'subscription'}
                  style={{
                    border: "1px solid #E0E4EC",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                  options={[
                    { value: 'basic', label: "Basic" },
                    { value: 'standard', label: "Standard" },
                    { value: 'premium', label: "Premium" },
                  ]}
                ></Select>
              </Form.Item>
            </div>
            <div>
              <p className="text-[#6D6D6D] py-1">Program Image</p>

              <label
                htmlFor="image"
                style={{ display: "block", margin: "4px 0" }}
                className="p-3 border"
              >
                <Form.Item name="image">
                  <div className="flex justify-center items-center w-full h-[300px]  border-dashed border border-black py-10">
                    {imgFile ? (
                      <img className="w-full h-full object-contain" src={URL.createObjectURL(imgFile)} alt="" />
                    ) : itemForEdit?.img ? (
                      <img className="w-full h-full object-contain" src={`${ServerUrl}${itemForEdit.img}`} alt="" />
                    ) : (
                      <FaRegImage className="text-2xl" />
                    )}
                  </div>

                  <div className="hidden">
                    <Input
                      id="image"
                      type="file"
                      onInput={handleChange}
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
              <button disabled={isLoading} className="bg-[#B47000] px-6 py-3 disabled:bg-gray-400 text-[#FEFEFE]">
                {isLoading ? 'Loading...' : 'Create'}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateProgram;

import React, { useEffect, useRef, useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";
import {
  Calendar,
  DatePicker,
  Dropdown,
  Input,
  Select,
  Slider,
  Table,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaRegImage, FaRegTrashCan, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { LuRefreshCw } from "react-icons/lu";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { Form, Modal, Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { AllProducts } from "../../ReduxSlices/AllProductSlice";
import moment from "moment";
import { ManageProduct } from "../../ReduxSlices/ManageProductSlice";

const ManageProducts = () => {
  const [imageList, setImageList] = useState([]);
  const dispatch = useDispatch();
  console.log(imageList);
  useEffect(() => {
    dispatch(AllProducts());
  }, [dispatch]);

  const onFinish = (values) => {
    const formData = new FormData();

    // for (const image of imageList) {
    //   formData.append("images", [image]);
    // }

    imageList.forEach((image) => formData.append("imageList[]", image));

    formData.append("date", moment(values?.date).format("YYYY-MM-DD"));

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    console.log(formData);

    dispatch(ManageProduct(formData)).then((response) => {
      if (response.type === "ManageProduct/fulfilled") {
        setOpenAddModel(false);
      }
    });
  };

  const products = useSelector((state) => state.AllProducts.userData.data);
  const loading = useSelector((state) => state.AllProducts.loading);
  const error = useSelector((state) => state.AllProducts.error);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState([]);
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );
  const dropdownRef = useRef();
  const [openAddModel, setOpenAddModel] = useState(false);
  const [reFresh, setReFresh] = useState("");

  useEffect(() => {
    if (reFresh) {
      setTimeout(() => {
        setReFresh("");
      }, 1500);
    }
  }, [reFresh]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDate(false);
        setOpen("");
        setFilter(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const data = products
    ? products.map((product, index) => ({
        key: index + 1,
        date: moment(product?.updatedAt).format("MM/DD/YYYY"),
        photo: product?.images[0],
        name: product.productName,
        store: products?.items,
        price: product.price,
        gender: product.gender,
      }))
    : [];

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Products Name",
      dataIndex: "name",
      render: (text, record) => (
        <span
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <img src={record.photo} alt="" />
          <span>{record.name}</span>
        </span>
      ),
      key: "product name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Store",
      dataIndex: "store",
      key: "store",
    },
    {
      title: "ACTION",
      dataIndex: "printView",
      key: "printView",
      render: (_, record) => (
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <RiEditLine size={20} color="#5B52A3" style={{ cursor: "pointer" }} />
          <RiDeleteBin6Line
            size={20}
            color="#C11415"
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const onClick = ({ key }) => {
    if (gender.find((item) => key === item)) {
      return;
    }
    setGender([...gender, key]);
  };

  const handelGenderDelete = (key) => {
    const newGenderList = gender.filter((item) => item !== key);
    setGender(newGenderList);
  };

  const handleChange = (e) => {
    const file = [...imageList, e.target.files[0]];
    setImageList(file);
  };

  const handleRemove = (id) => {
    const data = imageList.filter((_item, index) => index !== id);
    setImageList(data);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "16px 0",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>
          All Products
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "304px",
              height: "40px",
              borderRadius: "8px",
              background: "#fefefe",
            }}
          >
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              prefix={<FiSearch size={14} color="#868FA0" />}
              style={{
                width: "100%",
                height: "100%",
                fontSize: "14px",
                border: "none",
                outline: "none",
              }}
              size="middle"
              value={search}
            />
          </div>
          <button
            onClick={() => setOpenAddModel(true)}
            style={{
              borderRadius: "4px",
              color: "#F2F2F2",
              backgroundColor: "#B47000",
              border: "none",
              outline: "none",

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
            Add Product
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "4px",
              height: "40px",
              background: "#fefefe",
              padding: "0 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <button
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              Data Refresh{" "}
            </button>
            <LuRefreshCw />
          </div>
        </div>
      </div>
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "6px",
        }}
      >
        <div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 10,
              defaultCurrent: parseInt(page),
              onChange: handlePageChange,
            }}
          />
        </div>
      </div>

      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={700}
        footer={false}
      >
        <div className="p-6">
          <h1
            className="text-[20px] font-semibold"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Add Product
          </h1>

          <Form onFinish={onFinish}>
            <div style={{ marginBottom: "16px", width: "100%" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Product Name
              </label>
              <Form.Item
                style={{ marginBottom: 0 }}
                name="productName"
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

            <div className="flex gap-3">
              <div className="w-[50%] flex-1">
                <label>Gender</label>
                <Form.Item
                  name="gender"
                  rules={[
                    { required: true, message: "Please select a gender!" },
                  ]}
                >
                  <Select placeholder="Select Gender">
                    <Select.Option value="male">male</Select.Option>
                    <Select.Option value="female">female</Select.Option>
                    <Select.Option value="baby">baby</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="w-[50%]  flex-1">
                <label>Store</label>
                <Form.Item
                  name="store"
                  rules={[
                    { required: true, message: "Please select a store!" },
                  ]}
                >
                  <Select placeholder="Select Store">
                    <Select.Option value="option1">Option 1</Select.Option>
                    <Select.Option value="option2">Option 2</Select.Option>
                    <Select.Option value="option3">Option 3</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="flex gap-3 w-full">
              <div style={{ marginBottom: "16px", width: "50%" }}>
                <label style={{ display: "block" }} htmlFor="">
                  Price
                </label>
                <Form.Item
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please input Price",
                    },
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    type="text"
                    style={{
                      width: "100%",
                      height: "45px",
                      background: "#F2F2F2",
                    }}
                  />
                </Form.Item>
              </div>

              <div className="w-1/2 flex-1 ">
                <label>Date</label>
                <Form.Item name="date">
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{
                      width: "100%",
                      height: "45px",
                      background: "#F2F2F2",
                    }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="w-full" style={{ marginBottom: "16px" }}>
              <label>Product Image</label>
              <div className="flex-row-reverse items-center gap-6">
                {/* image container */}
                <div className="flex items-center gap-6 w-full">
                  {imageList &&
                    imageList.map((item, index) => {
                      return (
                        <div key={index} className="relative border m-5 ms-0">
                          <FaTrash
                            onClick={() => handleRemove(index)}
                            size={16}
                            color="red"
                            className="absolute right-2 top-2 cursor-pointer"
                          />
                          <img
                            style={{
                              width: 70,
                              height: 60,
                              borderRadius: 8,
                              padding: 10,
                            }}
                            src={URL?.createObjectURL(item)}
                            alt=""
                          />
                        </div>
                      );
                    })}
                </div>

                {/* image upload trigger */}
                <Form.Item name="images">
                  <div
                    style={{
                      display: imageList?.length > 2 ? "none" : "block",
                    }}
                    className="w-full"
                  >
                    <input
                      style={{ display: "none" }}
                      className="w-[100%]"
                      onChange={handleChange}
                      type="file"
                      id="img"
                    />
                    <label
                      htmlFor="img"
                      className=" h-[150px] rounded-md border-dashed border-[1px] border-[#D9D9D9] flex flex-col justify-center items-center cursor-pointer w-[100%]"
                    >
                      <FaRegImage size={36} color={"#868FA0"} />
                      <span className="text-[12px] font-[400] text-[#2F2F2F] p-2">
                        Click to Upload Image
                      </span>
                    </label>
                  </div>
                </Form.Item>
              </div>
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

            <div style={{ marginBottom: "16px" }}>
              <label>Description</label>
              <Form.Item name="description">
                <TextArea
                  typeof="text"
                  name="description"
                  className="w-full rounded-md p-2"
                  style={{ background: "#F2F2F2", border: "none" }}
                  rows={4}
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

          {/* 
          <Form onFinish={onFinish}>
            <div className="flex flex-col gap-4 mt-6">
              <div>
                <label>Product Name</label>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input Product Name",
                    },
                  ]}
                >
                  <input
                    className="h-[45px] w-full rounded-md p-2"
                    style={{ background: "#F2F2F2", border: "none" }}
                  />
                </Form.Item>
              </div>
              <div className="flex gap-3">
                <div className="w-[50%] flex-1">
                  <Form.Item
                    style={{
                      height: "60px",
                    }}
                  >
                    <label>Gender</label>
                    <Select>
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="Female">Female</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-[50%]  flex-1">
                  <Form.Item>
                    <label>Store</label>
                    <Select>
                      <Select.Option value="option1">Option 1</Select.Option>
                      <Select.Option value="option2">Option 2</Select.Option>
                      <Select.Option value="option3">Option 3</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div> 


              <div className=" flex gap-3 w-full">
                <div className="w-1/2">
                  <label>Price</label>
                  <input
                    type="text"
                    className="h-[45px] w-full rounded-md p-2"
                    style={{ background: "#F2F2F2", border: "none" }}
                    name="price"
                  />
                </div>

                <div className="w-1/2 flex-1 ">
                  <label>Date</label>
                  <DatePicker
                    onChange={onChange}
                    needConfirm
                    name="date"
                    style={{
                      width: "100%",
                      height: "45px",
                      background: "#F2F2F2",
                    }}
                  />
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="upload">
                  <label> Product Image</label>
                  {image ? (
                    <div
                      className="h-[150px] w-full rounded-md border-dashed border-[1px] border-[#D9D9D9] flex flex-col justify-center items-center cursor-pointer"
                      style={{ background: "#F2F2F2" }}
                    >
                      <img src={image} alt="" srcSet="" />
                    </div>
                  ) : (
                    <>
                      <div
                        className="h-[150px] w-full rounded-md border-dashed border-[1px] border-[#D9D9D9] flex flex-col justify-center items-center cursor-pointer"
                        style={{ background: "#F2F2F2" }}
                      >
                        <FaRegImage size={36} color={"#868FA0"} />
                        <span className="text-[12px] font-[400] text-[#2F2F2F]">
                          Click to Upload Image
                        </span>
                      </div>
                    </>
                  )}
                  <input
                    onChange={(e) => {
                      setImage(URL.createObjectURL(e.target.files[0]));
                    }}
                    className="hidden"
                    style={{ display: "none" }}
                    type="file"
                    id="upload"
                    name="Image"
                  />
                </label>
              </div>
              <div className="w-full">
                <label>Description</label>
                <TextArea
                  typeof="text"
                  className="w-full rounded-md p-2"
                  style={{ background: "#F2F2F2", border: "none" }}
                  rows={4}
                />
              </div>
              <div className="flex gap-4 justify-end items-center">
                <button
                  onClick={() => setOpenAddModel(false)}
                  className="rounded-md px-4 py-2 h-10"
                  style={{
                    background: "#F2F2F2",
                    color: "#000",
                    border: "none",
                  }}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md px-4 py-2 h-10"
                  style={{
                    background: "#B47000",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Add Product
                </button>
              </div>
            </div>
          </Form> */}
        </div>
      </Modal>
    </div>
  );
};

export default ManageProducts;

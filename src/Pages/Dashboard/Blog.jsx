import { Form, Input, Modal, Button, Pagination, Select, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { FaImage, FaPlus, FaRegImage } from "react-icons/fa6";
import { Col, Row } from "antd";
import { CiCalendar } from "react-icons/ci";

import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBlog } from "../../ReduxSlices/Blog/GetAllBlogSlice";
import { ServerUrl } from "../../../Config";
import { AddBlog } from "../../ReduxSlices/Blog/AddBlogSlice";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { UpdateBlog } from "../../ReduxSlices/Blog/UpdateBlogSlice";
import Swal from "sweetalert2";
import { DeleteBlog } from "../../ReduxSlices/Blog/DeleteBlogSlice";
import { Subscription } from "../../ReduxSlices/AddSubscription";
const Blog = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const dispatch = useDispatch()
  const { AllBlog, meta } = useSelector(state => state.GetAllBlog)
  const [itemPerPage, setItemPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [form] = Form.useForm()
  const [images, setImages] = useState([])
  const [imagesUploadError, setImagesUploadError] = useState(null)
  const [editItemData, seteditItemData] = useState({})
  const [submitType, setsubmitType] = useState('add')
  const [selectedItemImage, setSelectedItemImage] = useState([]);
  const [imageToDelete, setImageToDelete] = useState([])
  useEffect(() => {
    dispatch(GetAllBlog({ page: page, limit: itemPerPage, }))
  }, [page, itemPerPage]) 

// subscription  
useEffect(() => {
  dispatch(Subscription());
}, [dispatch]); 

const subscriptions = useSelector((state)=>state.Subscription.userData) 
const data = subscriptions?.map((subs) => ({
  value: subs?.title,
  label:subs?.title,
}));   

  const onChange = (pageNumber) => {
    setPage(pageNumber)
  };
  const onShowSizeChange = (current, size) => {
    setItemPerPage(size);
  }

  const handeldelete = () => {
    dispatch(DeleteBlog({ id: deleteId })).then((res) => {
      if (res.type == 'DeleteBlog/fulfilled') {
        setShowDelete(false)
        dispatch(GetAllBlog({ page: page, limit: itemPerPage }))
        Swal.fire({
          title: "Deleted!",
          text: "Your Blog has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
  };
  // add update blog
  const onFinish = (values) => {
    form.setFieldsValue(values)
    const formData = new FormData();
    const { date, ...otherValues } = values
    formData.append("date", date?.toString().split('T')[0]);
    Object.keys(otherValues).forEach((key) => {
      formData.append(key, values[key]);
    });
    for (const image of images) {
      formData.append("image", image);
    }
    if (submitType === 'add') {
      dispatch(AddBlog(formData)).then((res) => {
        if (res.type == 'AddBlog/fulfilled') {
          toast.success('product Successfully added')
          setOpenAddModel(false)
          form.resetFields()
          setImages([])
          dispatch(GetAllBlog({ page: page, limit: itemPerPage, }))
        }
      })
    } else {
      if (imageToDelete.length > 0) {
        formData.append("imageToDelete", JSON.stringify(imageToDelete))
      }

      dispatch(UpdateBlog({ data: formData, id: editItemData?._id })).then((res) => {
        console.log(res)
        if (res.type == 'UpdateBlog/fulfilled') {
          toast.success('product Successfully added')
          setOpenAddModel(false)
          form.resetFields()
          setImages([])
          setImageToDelete([])
          seteditItemData({})
          dispatch(GetAllBlog({ page: page, limit: itemPerPage }))
        }
      })
      // dispatch(GetProducts({ page: page, limit: ItemPerPage, searchTerm: search }))
    }
  };
  useEffect(() => {
    if (!imagesUploadError) return
    toast.error(imagesUploadError)
    setImagesUploadError(null)
  }, [imagesUploadError])

  // image upload handler
  const handleImageUpload = (e) => {
    let imagesFiles = []
    const FileList = Array.from(e.target.files)
    FileList.map((item) => {
      if (((images.length + (selectedItemImage.length)) + imagesFiles.length) >= 4) {
        return setImagesUploadError("you can't upload more then 4 image")
      }
      if (item.type.startsWith('image')) {
        imagesFiles.push(item)
        setImages([...images, ...imagesFiles])

      } else {
        setImagesUploadError(`${item.type} is not allowed please select valid image`)
      }
    })

  }
  useEffect(() => {
    form.setFieldsValue({ ...editItemData, date: editItemData.createdAt?.split('T')[0] })
    setSelectedItemImage(editItemData?.images ? editItemData?.images : [])
  }, [editItemData])
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
            Blogs
          </h3>
          <button
            onClick={() => { setsubmitType('add'); seteditItemData({}); form.resetFields(); setOpenAddModel(true) }}
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
            Add Blog
          </button>
        </div>
      </div>
      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={700}
        footer={false}
      >
        <div className='p-6'>
          <h1 className='text-2xl font-semibold' style={{ marginBottom: "12px" }}>{submitType == 'add' ? "Add New Blog" : 'Update Blog'}</h1>
          <Form
            name="normal_login"
            onFinish={onFinish}
            form={form}
          >
            <div className='grid grid-cols-2 gap-5'>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Topic Name</label>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name="topic"
                  rules={[
                    {
                      required: true,
                      message: "Please input Topic",
                    },
                  ]}
                >
                  <Input
                    placeholder="topic here..."
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

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>date</label>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Please input date",
                    },
                  ]}
                >
                  <Input
                    placeholder="topic here..."
                    type="date"
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
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Blog Name</label>
              <Form.Item
                style={{ marginBottom: 0 }}
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input title",
                  },
                ]}
              >
                <Input
                  placeholder="title"
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
            <p className='font-bold mb-1'>Products Image</p>
            <div className='grid grid-cols-4 col-span-2 gap-2 p-4 pt-5 border  my-4 rounded-md'>
              {
                selectedItemImage.map((item, index) => <div className='relative flex justify-center items-center w-full h-full border-dashed border border-black py-10' key={index}>
                  <img className='w-full h-full object-cover' src={`${ServerUrl}${item}`} alt="" />
                  <button onClick={() => {
                    const filterImage = selectedItemImage.filter((image, i) => index == i)
                    setImageToDelete([...imageToDelete, filterImage[0]])
                    const NewImages = selectedItemImage.filter((image, i) => index !== i)
                    setSelectedItemImage(NewImages)
                  }} type='button' className='absolute p-1 rounded-full text-xl text-white bg-red-500 top-1 right-1'>
                    <IoClose />
                  </button>
                </div>)
              }
              {
                images.map((item, index) => <div className='relative flex justify-center items-center w-full h-full border-dashed border border-black py-10' key={index}>
                  <img className='w-full h-full object-cover' src={URL.createObjectURL(item)} alt="" />
                  <button onClick={() => {
                    const NewImages = images.filter((image, i) => index !== i)
                    setImages(NewImages)
                  }} type='button' className='absolute p-1 rounded-full text-xl text-white bg-red-500 top-1 right-1'>
                    <IoClose />
                  </button>
                </div>)
              }
              {
                [...Array((images.length + (selectedItemImage.length)) <= 4 ? 4 - (images.length + (selectedItemImage.length)) : 0).keys()].map((item) => <label key={item} htmlFor='product_img1' className='cursor-pointer' style={{ display: "block", marginBottom: "5px" }}>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name="product_img1"

                  >
                    <div className='flex justify-center items-center w-full h-full border-dashed border border-black py-10'>
                      <FaRegImage className='text-2xl' />
                    </div>
                    <div className='hidden'>
                      <Input id='product_img1'
                        type="file"
                        multiple
                        onInput={handleImageUpload}
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
                </label>)
              }

            </div> 

            <div style={{ marginBottom: "16px" }}>
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
                  placeholder="subscription"
                    style={{
                      border: "1px solid #E0E4EC",
                      height: "52px",
                      background: "white",
                      borderRadius: "8px",
                      outline: "none",
                    }}
                    options={data}
                  />
                </Form.Item>
              </div> 

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Description</label>
              <Form.Item
                style={{ marginBottom: 0 }}
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input Description",
                  },
                ]}
              >
                <TextArea
                  placeholder="Write here..."
                  type="text"
                  style={{
                    border: "1px solid #E0E4EC",
                    height: "152px",
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
      <div
        style={{
          background: "white",
          padding: "30px 20px",
          borderRadius: "6px",
        }}
      >
        <Row gutter={30}>
          {AllBlog.map((item, index) => {
            const key = `col-${index}`;
            return (
              <Col
                key={item?._id}
                xs={{ flex: "100%" }}
                sm={{ flex: "50%" }}
                lg={{ flex: "33.33%" }}
              >
                <div
                  style={{
                    width: "100%",
                    paddingBottom: "20px",
                    marginBottom: "30px",
                  }}
                >
                  <div className="w-full h-[300px] overflow-hidden">
                    <img className="w-full h-full object-cover"
                      src={`${ServerUrl}${item?.images[0]}`}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                      marginTop: "8px",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "10px",
                        color: "#555555",
                      }}
                    >
                      <CiCalendar
                        style={{
                          fontSize: "18px",
                          marginTop: '-3px',
                        }}
                      />{" "}
                      {item?.createdAt?.split('T')[0]}
                    </p>
                    <p>Topic : {item?.topic}</p>
                  </div>
                  <p
                    style={{
                      color: "#2F2F2F",
                      marginTop: "8px",
                      marginBottom: "22px",
                    }}
                  >
                    {item?.title}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "35px",
                    }}
                  >
                    <button
                      onClick={() => {
                        setShowDelete(true);
                        setDeleteId(item?._id);
                      }}
                      style={{
                        background: "transparent",
                        border: "1px solid black",
                        padding: "12px 36px",
                        color: "#242424",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setsubmitType('update')
                        seteditItemData(item)
                        setOpenAddModel(true);
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: "14px 48px",
                        color: "white",
                        backgroundColor: "#242424",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        {
          AllBlog.length <= 0 ? <Empty /> : <div className='text-center mt-8'>
            <Pagination defaultCurrent={page} total={meta?.total} pageSize={itemPerPage} onShowSizeChange={onShowSizeChange} onChange={onChange} />
          </div>
        }

      </div>
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
            onClick={handeldelete}
            className="bg-[#B47000] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default Blog;

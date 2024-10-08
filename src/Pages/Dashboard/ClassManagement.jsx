import { Form, Input, Modal, Button, Pagination, Empty, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaFilePdf, FaImage, FaPlus, FaVideo } from "react-icons/fa6";
import { Col, Row } from "antd";
import { CiCalendar } from "react-icons/ci";
import TextArea from "antd/es/input/TextArea";

import { useParams } from "react-router-dom";
import { IoDocumentSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { GetAllClass } from "../../ReduxSlices/Classes/GetAllClassSlice";
import baseAxios, { ServerUrl } from "../../../Config";
import { AllProgram } from "../../ReduxSlices/CreateProgram/GetCreateProgramesSlice";
import { AddClass, setProgress } from "../../ReduxSlices/Classes/AddClassSlice";
import Swal from "sweetalert2";
import { AllSeries } from "../../ReduxSlices/CreateSeries/GetAllSeriesSlice";
import { UpdateClass, setUpdateProgress } from "../../ReduxSlices/Classes/UpdateClassSlice";
import { DeleteClass } from "../../ReduxSlices/Classes/DeleteClassSlice";
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Subscription } from "../../ReduxSlices/AddSubscription";

const ClassManagement = () => {
  const [form] = Form.useForm()
  const [pageNumber, setPageNumber] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );
  const [Program, setProgram] = useState(
    new URLSearchParams(window.location.search).get("program") || "all"
  );

  const [ProgramID, setProgramID] = useState(
    new URLSearchParams(window.location.search).get("id") || ''
  );
  const [SeriesID, setSeriesID] = useState(
    new URLSearchParams(window.location.search).get("series") || ''
  );
  const { name } = useParams();
  const [limit, setlimit] = useState(20)
  const [openAddModel, setOpenAddModel] = useState(false);
  const [editItem, seteditItem] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [formFor, setFormFor] = useState('Add New Class')
  const [deleteId, setDeleteId] = useState('')
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setProgress] = useState(0);
  const [uploadFiles, setuploadFiles] = useState({
    video: false,
    doc: false,
    pdf: false,
    videoName: false,
    pdfName: false,
    docName: false,
  })
  const [submitError, setSubmitError] = useState(false)
  const dispatch = useDispatch()
  const { Classes, meta } = useSelector(state => state.GetAllClass)
  const { isError, isSuccess, isLoading, progress, message } = useSelector((state) => state.AddClass);
  const { isLoading: UpdateLoading, progress: updateProgress, } = useSelector((state) => state.UpdateClass);
  const handeldelete = () => {
    if (!deleteId) {
      return
    }
    dispatch(DeleteClass({ id: deleteId })).then((res) => {
      if (res.type == 'DeleteClass/fulfilled') {
        setOpenAddModel(false)
        Swal.fire({
          title: "Deleted!",
          text: "Your Class has been Deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setShowDelete(false);
        setDeleteId('')
        dispatch(GetAllClass({ page: pageNumber, limit: limit, searchTerm: search, program: ProgramID, series: SeriesID }))
      }
    })
  };
  // upload video 
  const uploadFile = async (file) => {
    const CHUNK_SIZE = 5 * 1024 * 1024;
    let res
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('originalname', file.name);
      formData.append('chunkIndex', chunkIndex);
      formData.append('totalChunks', totalChunks);

      res = await baseAxios.post('/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(((chunkIndex + 1) / totalChunks) * 100);
          setProgress(percentCompleted);
        },
      });
    }
    return res
  };
  const getVideoDuration = async (file) => {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(file);

      videoElement.addEventListener('loadedmetadata', () => {
        const durationInSeconds = videoElement.duration;
        resolve(durationInSeconds); // Resolve the duration when metadata is loaded
      });

      videoElement.addEventListener('error', (error) => {
        reject(error); // Reject the promise if there's an error
      });
    });
  };

  const onFinish = async (values) => { //videoDuration
    const formData = new FormData();
    const { date, ...otherValues } = values;
    if (formFor == 'Add New Class') {
      if (uploadFiles?.video || uploadFiles?.doc || uploadFiles?.pdf) {
        return setSubmitError('please select video , doc file and a pdf file')
      } else {
        setSubmitError(false)
      }
      formData.append("date", date?.toString().split('T')[0]);
      Object.keys(otherValues).forEach((key) => {
        formData.append(key, values[key]);
      });
      Swal.fire({
        title: `your video size is ${Math.floor(uploadFiles?.videoName?.size / 1048576)} MB`,
        text: `it may take a while`,
        icon: "info",
        showConfirmButton: true,
        timer: 3500,
      });
      formData.append('program', ProgramID)
      formData.append('series', SeriesID)
      // formData.append('video', uploadFiles.videoName)
      formData.append('docs', uploadFiles.docName)
      formData.append('pdf', uploadFiles.pdfName)
      setLoading(true)
      const videoDuration = await getVideoDuration(uploadFiles.videoName)
      formData.append('videoDuration', Math.ceil(videoDuration))
      const res = await uploadFile(uploadFiles.videoName) // upload video
      const video = res?.data?.path
      console.log(video)
      if (res?.data?.success) {
        formData.append('video', video)
      } else {
        return Swal.fire({
          title: "oops!",
          text: "something went wrong",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      dispatch(AddClass({
        value: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch(setProgress(percentCompleted));
        }
      })).then((res) => {
        if (res.type == 'AddClass/fulfilled') {
          setOpenAddModel(false)
          setLoading(false)
          Swal.fire({
            title: "Added!",
            text: "Your Class has been Added.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          form.resetFields()
          setuploadFiles({
            video: false,
            doc: false,
            pdf: false,
            videoName: false,
            pdfName: false,
            docName: false,
          })
          dispatch(GetAllClass({ page: pageNumber, limit: limit, searchTerm: search, program: ProgramID, series: SeriesID }))
        } else {
          Swal.fire({
            title: "oops!",
            text: "somthing went wrong",
            icon: "error",
            showConfirmButton: true,
            timer: 3500,
          });
        }
      })
    } else {
      formData.append("date", date?.toString().split('T')[0]);
      Object.keys(otherValues).forEach((key) => {
        formData.append(key, values[key]);
      });
      if (uploadFiles.videoName) {
        const videoDuration = await getVideoDuration(uploadFiles.videoName)
        formData.append('videoDuration', Math.ceil(videoDuration))
        const res = await uploadFile(uploadFiles.videoName)
        const video = res?.data?.path
        if (res?.data?.success) {
          formData.append('video', video)
        } else {
          return Swal.fire({
            title: "oops!",
            text: "something went wrong",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
      Swal.fire({
        title: `your video size is ${Math.floor(uploadFiles?.videoName?.size / 1048576)} MB`,
        text: `it may take a while`,
        icon: "info",
        showConfirmButton: false,
        timer: 1500,
      });
      if (uploadFiles.docName) {
        formData.append('docs', uploadFiles.docName)
      }
      if (uploadFiles.pdfName) {
        formData.append('pdf', uploadFiles.pdfName)
      }
      formData.append('program', ProgramID)
      formData.append('series', SeriesID)
      setLoading(true)
      dispatch(UpdateClass({
        id: editItem?._id,
        data: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch(setUpdateProgress(percentCompleted));
        }
      })).then((res) => {
        if (res.type == 'UpdateClass/fulfilled') {
          setOpenAddModel(false)
          setLoading(false)
          Swal.fire({
            title: "Updated!",
            text: "Your Class has been Updated.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          form.resetFields()
          setuploadFiles({
            video: false,
            doc: false,
            pdf: false,
            videoName: false,
            pdfName: false,
            docName: false,
          })
          dispatch(GetAllClass({ page: pageNumber, limit: limit, searchTerm: search, program: ProgramID, series: SeriesID }))
        } else {
          Swal.fire({
            title: "oops!",
            text: "somthing went wrong",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
    }
  };

  // fetch data
  useEffect(() => {
    dispatch(GetAllClass({ page: pageNumber, limit: limit, searchTerm: search, program: ProgramID, series: SeriesID }))
  }, [limit, pageNumber, search])

  useEffect(() => {
    if (!editItem) {
      return
    }
    setLoading(false)
    form.resetFields()
    form.setFieldsValue(editItem)
  }, [editItem])
  const onChangePage = (pageNumber) => {
    setPageNumber(pageNumber)
  };
  const onShowSizeChange = (current, size) => {
    setlimit(size);
  }
  return (
    <div>
      <div style={{ marginTop: "24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F" }}>
            All Classes
          </h3>
          <div className="flex justify-end items-center gap-3">
            <Input
              onChange={(e) => {
                setSearch(e.target.value)
                setPageNumber(1)
              }}
              placeholder="Search..."
              prefix={<FiSearch size={14} color="#868FA0" />}
              suffix={<RxCross2 className="cursor-pointer" onClick={() => setSearch('')} size={14} color="#868FA0" />}
              style={{
                width: "250px",
                height: "43px",
                fontSize: "14px",
                border: 'none',
                outline: 'none',
              }}
              size="middle"
              value={search}
            />
            <button
              onClick={() => { setFormFor('Add New Class'); setOpenAddModel(true); seteditItem({}); form.resetFields(); setLoading(false) }}
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
              Add new class
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2 mb-6">
        <p>{Program}</p> / <p>{name}</p>
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
            className="text-2xl font-semibold"
            style={{ marginBottom: "12px" }}
          >
            {formFor}
          </h1>
          <Form
            onFinish={onFinish}
            name="normal_login"
            form={form}
            initialValues={{
              remember: true,
            }}
          >
            <div className="grid grid-cols-2 gap-3 py-6">
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Topic
                </label>
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
                    placeholder="Topic here ..."
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
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Tittle
                </label>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input tittle ",
                    },
                  ]}
                >
                  <Input
                    placeholder="tittle here..."
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
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Program
                </label>
                <Form.Item
                  style={{ marginBottom: 0 }}
                >
                  <Input value={Program} disabled className="w-full disabled:text-black"
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
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Series
                </label>
                <Form.Item
                  style={{ marginBottom: 0 }}

                >
                  <Input disabled className="w-full disabled:text-black"
                    value={name}
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
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Date
                </label>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Please input date ",
                    },
                  ]}
                >
                  <Input
                    placeholder="tittle here..."
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
              <div>
                <label
                  htmlFor="video"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Add video
                  <div className="border p-2 rounded-lg">
                    <span className="flex justify-start items-center w-fit bg-[#DADADA] py-[6px] px-2 gap-2 rounded-md">
                      {
                        uploadFiles?.videoName ? <p>{uploadFiles?.videoName?.name?.slice(0, 34)}....</p> : editItem?.video ? <p>{editItem?.video}</p> : <><FaVideo /> browse video</>
                      }
                    </span>
                  </div>
                  <div className="hidden">
                    <input type="file" />
                    <Input
                      onInput={(e) => {
                        if (!e.target.files[0].type.startsWith('video')) {
                          setuploadFiles({ ...uploadFiles, video: 'not a valid video', videoName: false })
                        } else {
                          setuploadFiles({ ...uploadFiles, video: false, videoName: e.target.files[0] })
                        }
                      }}
                      id="video"
                      placeholder="tittle here..."
                      type="file"

                      style={{
                        border: "1px solid #E0E4EC",
                        height: "52px",
                        paddingTop: "10px",
                        background: "white",
                        borderRadius: "8px",
                        outline: "none",
                      }}
                    />
                  </div>
                  {
                    uploadFiles?.video && <p className="text-red-500">{uploadFiles.video}</p>
                  }
                </label>
              </div>
              <div>
                <label
                  htmlFor="pdf"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Add pdf
                  <div className="border p-2 rounded-lg">
                    <span className="flex justify-start items-center w-fit bg-[#DADADA] py-[6px] px-2 gap-2 rounded-md">
                      {
                        uploadFiles?.pdfName ? <p>{uploadFiles?.pdfName?.name?.slice(0, 34)}....</p> : editItem?.pdfFile ? <p>{editItem?.pdfFile?.split('/')[2].slice(0, 34)}....</p> : <> <FaFilePdf /> browse pdf</>
                      }
                    </span>
                  </div>
                  {/* </label> */}
                  <div className="hidden">
                    <Input
                      onInput={(e) => {
                        if (!e.target.files[0].type.startsWith('application/pdf')) {
                          setuploadFiles({ ...uploadFiles, pdf: 'not a valid pdf', pdfName: false })
                        } else {
                          setuploadFiles({ ...uploadFiles, pdf: false, pdfName: e.target.files[0] })
                        }
                      }}
                      id="pdf"
                      placeholder="tittle here..."
                      type="file"
                      style={{
                        border: "1px solid #E0E4EC",
                        height: "52px",
                        paddingTop: "10px",
                        background: "white",
                        borderRadius: "8px",
                        outline: "none",
                      }}
                    />
                  </div>
                  {
                    uploadFiles?.pdf && <p className="text-red-500">{uploadFiles.pdf}</p>
                  }
                </label>
              </div>
              <div>
                <label
                  htmlFor="doc"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Add Doc File
                  <div className="border p-2 rounded-lg">
                    <span className="flex justify-start items-center w-fit bg-[#DADADA] py-[6px] px-2 gap-2 rounded-md">
                      {
                        uploadFiles?.docName ? <p>{uploadFiles?.docName?.name?.slice(0, 34)}....</p> : editItem?.docFile ? <p>{editItem?.docFile?.split('/')[2].slice(0, 34)}....</p> : <> <IoDocumentSharp /> browse doc</>
                      }
                    </span>
                  </div>
                  {/* </label> */}
                  <div className="hidden">
                    <Input
                      onInput={(e) => {
                        if (!e.target.files[0].type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                          setuploadFiles({ ...uploadFiles, doc: 'not a valid doc  ', docName: false })
                        } else {
                          setuploadFiles({ ...uploadFiles, doc: false, docName: e.target.files[0] })
                        }
                      }}
                      id="doc"
                      placeholder="tittle here..."
                      type="file"

                      style={{
                        border: "1px solid #E0E4EC",
                        height: "52px",
                        paddingTop: "10px",
                        background: "white",
                        borderRadius: "8px",
                        outline: "none",
                      }}
                    />
                  </div>
                  {
                    uploadFiles?.doc && <p className="text-red-500">{uploadFiles.doc}</p>
                  }
                </label>
              </div>
              {
                submitError && <p className="text-red-500 col-span-2">{submitError}</p>
              }
              <div className="row-span-2 col-span-2">
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Description{" "}
                </label>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please Description ",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="tittle here..."
                    style={{
                      border: "1px solid #E0E4EC",
                      height: "140px",
                      paddingTop: "10px",
                      background: "white",
                      borderRadius: "8px",
                      outline: "none",
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            {/* {
              loading && <div className="w-full h-3 bg-gray-200 rounded-md mb-2 relative overflow-hidden">
                <div style={{
                  transition: '1s',
                  width: `${uploadProgress}%`
                }} className={`absolute left-0 top-0 h-full bg-[#b47000]`}>
                </div>
              </div>
            } */}
            {
              loading && <div className="w-full h-3 bg-gray-200 rounded-md mb-2 relative overflow-hidden animate-bounce">
                <div style={{
                  transition: '1s',
                  width: `${uploadProgress}%`
                }} className={`absolute left-0 top-0 h-full bg-[#b47000]`}>
                </div>
              </div>
            }
            <Form.Item>
              <Button disabled={loading}
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
                {
                  loading ? 'loading.....' : 'Publish'
                }
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
          {Classes.map((item, index) => {
            console.log(`${ServerUrl}/${item?.video}`)
            const key = item?._id;
            return (
              <Col
                key={key}
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
                  <div className="w-full h-[300px]">
                    <video autoPlay={false} muted loop className="w-full h-full object-cover">
                      {
                        item?.video && <source src={`${ServerUrl}/${item?.video}`} />
                      }
                    </video>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "start",
                      gap: "35px",
                      fontSize: "14px",
                      marginTop: "8px",
                    }}
                  >
                    <p className="whitespace-nowrap"
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
                        }}
                      />{" "}
                      {item?.date?.split('T')[0]}
                    </p>
                    <p>Topic: {item?.topic}</p>
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
                      onClick={() => { setFormFor('Update Class'); form.resetFields(); setLoading(false); setOpenAddModel(true); seteditItem(item) }}
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
        {
          Classes.length <= 0 ? <Empty /> : <div className='text-center mt-8'>
            <Pagination defaultCurrent={pageNumber} total={meta?.total} pageSize={limit} onShowSizeChange={onShowSizeChange} onChange={onChangePage} />
          </div>
        }

      </div>
    </div>
  );
};

export default ClassManagement;

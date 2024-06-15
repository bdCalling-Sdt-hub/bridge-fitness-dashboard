import React, { useEffect, useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { Form, Input, Modal, Table } from "antd";
import { FaPlus, FaRegImage, FaVideo } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AllProgram } from "../../ReduxSlices/CreateProgram/GetCreateProgramesSlice";
import moment from "moment";
import { AddProgram } from "../../ReduxSlices/CreateProgram/AddCreateProgramSlice";
import { ServerUrl } from "../../../Config";
import Swal from "sweetalert2";
import { UpdateProgram } from "../../ReduxSlices/CreateProgram/UpdateProgramSlice";

const AddBaner = () => {
    const [openAddModel, setOpenAddModel] = useState(false);
    const [formTitle, setFormTitle] = useState("Add New Program");
    const [imgFile, setImgFile] = useState(null);
    const [itemForEdit, setItemForEdit] = useState(null);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [uploadFiles, setuploadFiles] = useState({
        video: false,
        doc: false,
        pdf: false,
        videoName: false,
        pdfName: false,
        docName: false,
    })
    useEffect(() => {
        dispatch(AllProgram());
    }, [dispatch]);
    const programs = useSelector((state) => state.AllProgram?.userData?.data);
    const data = programs?.map((program, index) => ({
        key: index + 1,
        name: program?.title,
        date: moment(program?.createdAt).format("l"),
        img: program?.image,
        id: program?._id,
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
                </>
            ),
        },
    ];

    const onFinish = (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
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
    };
    // images
    const handleChange = (e) => {
        setImgFile(e.target.files[0]);
    };
    useEffect(() => {
        if (!itemForEdit) {
            return;
        }
        form.setFieldsValue({ title: itemForEdit.name });
    }, [itemForEdit]);

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
                        Banner
                    </h3>
                </div>
            </div>
            <div>
                <Table columns={columns} dataSource={data} pagination={false} />
            </div>
            <Modal
                centered
                open={openAddModel}
                onCancel={() => {
                    // null;
                    setImgFile(null);
                    setOpenAddModel(false);
                    form.resetFields()
                }}
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
                            <p className="text-[#6D6D6D] py-1">banner title</p>
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
                            <label
                                htmlFor="video"
                                style={{ display: "block", marginBottom: "5px" }}
                            >
                                video
                                <div className="border p-2 rounded-lg">
                                    <span className="flex justify-start items-center w-fit bg-[#DADADA] py-[6px] px-2 gap-2 rounded-md">
                                        {
                                            uploadFiles?.videoName ? <p>{uploadFiles?.videoName?.name?.slice(0, 34)}....</p> : false ? <p>{editItem?.video?.split('/')[2].slice(0, 34)}....</p> : <><FaVideo /> browse video</>
                                        }
                                    </span>
                                </div>
                                <div className="hidden">
                                    <Input
                                        onChange={(e) => {
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

export default AddBaner

import React, { useEffect, useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { Form, Input, Modal, Table } from "antd";
import { FaImage, FaPlus, FaRegImage, FaVideo } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AllProgram } from "../../ReduxSlices/CreateProgram/GetCreateProgramesSlice";
import { ServerUrl } from "../../../Config";
import Swal from "sweetalert2";
import { UpdateProgram } from "../../ReduxSlices/CreateProgram/UpdateProgramSlice";
import { GetBannerData } from "../../ReduxSlices/Banner/GetBannerDataSlice";
import { UpdateBanner } from "../../ReduxSlices/Banner/UpdateBannerSlice";

const AddBaner = () => {
    const [openAddModel, setOpenAddModel] = useState(false);
    const [formTitle, setFormTitle] = useState("Update Banner");
    const [itemForEdit, setItemForEdit] = useState(null);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [uploadFiles, setuploadFiles] = useState({
        video: false,
        logo: false,
        pdf: false,
        videoName: false,
        pdfName: false,
        logoName: false,
    })
    useEffect(() => {
        dispatch(GetBannerData());
    }, [dispatch]);
    const { BannerData } = useSelector((state) => state.GetBannerData);
    const data = [{ ...BannerData }]
    const columns = [
        {
            title: "banner title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "banner video",
            dataIndex: "video",
            render: (_, record) => (
                <>
                    <video className="w-36" autoPlay={false} muted loop>
                        {
                            record?.video && <source src={`${ServerUrl}${record?.video}`} />
                        }
                    </video>
                </>
            ),
            key: "video",
        },
        {
            title: "website logo",
            dataIndex: "logo",
            render: (_, record) => {
                return (
                    <>
                        {
                            record?.logo && <img src={`${ServerUrl}${record?.logo}`} alt="" />
                        }
                    </>
                )
            },
            key: "video",
        },
        {
            title: "Edit",
            dataIndex: "",
            key: "",
            render: (_, record) => (
                <>
                    <button
                        onClick={() => {
                            setOpenAddModel(true);
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
        setLoading(true)
        const formData = new FormData();
        formData.append("title", values.title);
        if (uploadFiles?.videoName) {
            formData.append("video", uploadFiles?.videoName);
        }
        if (uploadFiles?.logoName) {
            formData.append("image", uploadFiles?.logoName);
        }
        dispatch(UpdateBanner({ id: BannerData?._id, data: formData })).then(
            (res) => {
                setLoading(false)
                if (res.type == "UpdateBanner/fulfilled") {
                    dispatch(GetBannerData());
                    Swal.fire({
                        title: "Updated!",
                        text: "Banner has been Updated.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        form.resetFields();
                        dispatch(GetBannerData());
                        setOpenAddModel(false);
                    });
                }
            }
        );
    };
    useEffect(() => {
        if (!BannerData) {
            return;
        }
        form.setFieldsValue({ title: BannerData.title });
    }, [BannerData]);

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
                        Website setting
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
                                        message: "Please input banner title",
                                    },
                                ]}
                            >
                                <Input
                                    defaultValue={BannerData?.title}
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
                                banner video
                                <div className="border p-2 rounded-lg">
                                    <span className="flex justify-start items-center w-fit bg-[#DADADA] py-[6px] px-2 gap-2 rounded-md">
                                        {
                                            uploadFiles?.videoName ? <p>{uploadFiles?.videoName?.name?.slice(0, 34)}....</p> : BannerData?.video ? <p>{BannerData?.video?.split('/')[2].slice(0, 34)}....</p> : <><FaVideo /> browse video</>
                                        }
                                    </span>
                                </div>
                                <div className="hidden">
                                    <Input
                                        accept="video/*"
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
                            <label
                                htmlFor="logo"
                                style={{ display: "block", marginBottom: "5px" }}
                            >
                                websi xte logo
                                <div className="border p-2 rounded-lg">
                                    <span className="flex justify-start items-center w-fit bg-[#DADADA] py-[6px] px-2 gap-2 rounded-md">
                                        {
                                            uploadFiles?.logoName ? <img src={URL.createObjectURL(uploadFiles?.logoName)} alt="" /> : BannerData?.logo ? <img src={`${ServerUrl}${BannerData?.logo}`} alt="" srcset="" /> : <><FaImage /> browse logo</>
                                        }
                                    </span>
                                </div>
                                <div className="hidden">
                                    <Input
                                        accept="image/png"
                                        onInput={(e) => {
                                            if (!e.target.files[0].type.startsWith('image')) {
                                                setuploadFiles({ ...uploadFiles, logo: 'not a valid video', logoName: false })
                                            } else {
                                                setuploadFiles({ ...uploadFiles, logo: false, logoName: e.target.files[0] })
                                            }
                                        }}
                                        id="logo"
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
                            <button disabled={loading} className="bg-[#B47000] px-6 py-3 disabled:bg-gray-400 text-[#FEFEFE]">
                                {loading?'loading...':'Save'}
                            </button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default AddBaner

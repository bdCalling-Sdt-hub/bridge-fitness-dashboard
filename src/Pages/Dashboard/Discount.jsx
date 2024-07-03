import React, { useEffect, useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { Form, Input, Modal, Select, Table } from "antd";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { ServerUrl } from "../../../Config";
import Swal from "sweetalert2";
import { AddDiscount } from "../../ReduxSlices/Discount/AddDiscountSlice";
import { UpdateDiscount } from "../../ReduxSlices/Discount/UpdateDiscountSlice";
import { AllDiscount } from "../../ReduxSlices/Discount/GetAllDiscountSlice";
import toast, { Toaster } from "react-hot-toast";
import { ActiveToken } from "../../ReduxSlices/Discount/ActiveTokenSlice";
const Discount = () => {
    const [openAddModel, setOpenAddModel] = useState(false);
    const [formTitle, setFormTitle] = useState("Add New Discount");
    const [imgFile, setImgFile] = useState(null);
    const [itemForEdit, setItemForEdit] = useState(null);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const Discount = useSelector(state => state.AllDiscount?.Discounts)
    useEffect(() => {
        dispatch(AllDiscount()).then((res) => console.log(res));
    }, [dispatch]);
    console.log(Discount)
    const data = Discount?.map((item, index) => ({
        key: index + 1,
        name: item?.code,
        percentage: item?.discountPercent,
        img: item?.image,
        id: item?._id,
        isActive:item?.isActive
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
            title: "discount Percent",
            dataIndex: "percentage",
            key: "percentage",
            render: (_, record) => (<p className={`${record?.isActive?'font-semibold text-black':'font-normal text-gray-400'}`}>{record?.percentage}%</p>)
        },
        {
            title: "Action",
            dataIndex: "",
            key: "",
            render: (_, record) => (
                <div className="flex justify-start items-center gap-2">
                    <button
                        onClick={() => {
                            setOpenAddModel(true);
                            setFormTitle("Edit Discount");
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
                    <Select
                        className="w-40"
                        defaultValue={record?.isActive ? 'Active':'DeActive'}
                        onChange={(value) => {
                            handleActive(record?.id, value);
                        }}
                        options={[
                            { value: true, label: "Active"},
                            { value: false, label: "DeActive" },
                        ]}
                    />
                </div>
            ),
        },
    ];
    const handleActive = (id, value) => {
        dispatch(ActiveToken({ data: { isActive: value }, id: id })).then(
            (res) => {

                if (res.type == "ActiveToken/fulfilled") {
                    toast.success(`Discount ${value} Successfully`);
                    dispatch(AllDiscount());
                } else {
                    toast.error(`something went wrong`);
                }
            }
        );
    };
    const onFinish = (values) => {
        const formData = new FormData();
        if (formTitle == "Add New Discount") {
            if (imgFile) {
                formData.append("image", imgFile);
            }
            if (!imgFile) {
                return false;
            }
            formData.append("code", values.code);
            formData.append("discountPercent", values.percentage);
            dispatch(AddDiscount(formData)).then((res) => {
                if (res.type == "AddDiscount/fulfilled") {
                    Swal.fire({
                        title: "Added!",
                        text: "New Program has been added.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        form.resetFields();
                        dispatch(AllDiscount());
                        setImgFile(null);
                        setOpenAddModel(false);
                        setItemForEdit(null);
                    });
                }
            });
        } else {
            if (imgFile) {
                formData.append("image", imgFile);
            } else {
                formData.append("image", itemForEdit.img);
            }
            formData.append("code", values.code);
            formData.append("discountPercent", values.percentage);
            dispatch(UpdateDiscount({ id: itemForEdit?.id, data: formData })).then(
                (res) => {
                    if (res.type == "UpdateDiscount/fulfilled") {
                        dispatch(AllDiscount());
                        Swal.fire({
                            title: "Updated!",
                            text: "Program has been Updated.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(() => {
                            form.resetFields();
                            dispatch(AllDiscount());
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
        form.setFieldsValue({ code: itemForEdit.name, percentage: itemForEdit.percentage });
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
                        All Discounts
                    </h3>
                    <button
                        onClick={() => {
                            setItemForEdit(null);
                            setFormTitle("Add New Discount");
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
                        Create Discount
                    </button>
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
                            <p className="text-[#6D6D6D] py-1">Discount Code</p>
                            <Form.Item
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input Discount Code",
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
                            <p className="text-[#6D6D6D] py-1">Discount percentage</p>
                            <Form.Item
                                name="percentage"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input percentage",
                                    },
                                ]}
                            >
                                <Input
                                    className="w-[100%] border outline-none px-3 py-[10px]"
                                    type="number"
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <p className="text-[#6D6D6D] py-1">Discount Image</p>

                            <label
                                htmlFor="image"
                                style={{ display: "block", margin: "4px 0" }}
                                className="p-3 border"
                            >
                                <Form.Item name="image">
                                    <div className="flex justify-center items-center w-full h-full border-dashed border border-black py-10">
                                        {imgFile ? (
                                            <img src={URL.createObjectURL(imgFile)} alt="" />
                                        ) : itemForEdit?.img ? (
                                            <img src={`${ServerUrl}${itemForEdit.img}`} alt="" />
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
                            <button className="bg-[#B47000] px-6 py-3 text-[#FEFEFE]">
                                Save
                            </button>
                        </div>
                    </Form>
                </div>
            </Modal>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default Discount

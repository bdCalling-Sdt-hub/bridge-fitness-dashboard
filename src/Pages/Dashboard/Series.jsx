import React, { useEffect, useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { Form, Input, Modal, Table } from "antd";
import { FaPlus } from "react-icons/fa6";
import { MdReadMore } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllSeries } from "../../ReduxSlices/CreateSeries/GetAllSeriesSlice";
import { AddSeries } from "../../ReduxSlices/CreateSeries/AddSeriesSlice";
import { AllProgram } from "../../ReduxSlices/CreateProgram/GetCreateProgramesSlice";
import Swal from "sweetalert2";
import { UpdateSeries } from "../../ReduxSlices/CreateSeries/UpdateSerieSlice";

const Series = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [formTitle, setFormTitle] = useState("Add New Series");
  const [series, setSeries] = useState("");
  const [itemForEdit, setItemForEdit] = useState(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(AllSeries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(AllProgram());
  }, [dispatch]);

  const programs = useSelector((state) => state.AllProgram?.userData?.data);
  console.log(programs);

  const items = useSelector((state) => state.AllSeries.userData);
console.log(items)
  const data = items?.data?.map((item, index) => ({
    key: index + 1,
    program: item?.program?.title,
    name: item?.title,
    id: item?.id,
    _id:item?.program?._id
  }));

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Series",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Program",
      dataIndex: "program",
      key: "program",
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
              setFormTitle("Edit Series");
              setSeries(record);
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
          <Link to={`/series/${record?.name}?program=${record?.program}&id=${record?._id}&series=${record?.id}`}>
            <MdReadMore
              style={{
                fontSize: "25px",
              }}
            />
          </Link>
        </div>
      ),
    },
  ];
  const onFinish = (values) => {
    console.log(values);

    if (formTitle == "Add New Series") {
      dispatch(AddSeries(values)).then((res) => {
        if (res.type == "AddSeries/fulfilled") {
          Swal.fire({
            title: "Added!",
            text: "New Program has been added.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            form.resetFields();
            dispatch(AllSeries());
            setOpenAddModel(false);
            setItemForEdit(null);
          });
        }
      });
    } else {
      console.log(values);
      dispatch(UpdateSeries({ id: itemForEdit.id, data: values })).then(
        (res) => {
          if (res.type == "UpdateSeries/fulfilled") {
            dispatch(AllSeries());
            Swal.fire({
              title: "Updated!",
              text: "Series has been Updated.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              form.resetFields();
              dispatch(AllSeries());
              setOpenAddModel(false);
              setItemForEdit(null);
            });
          }
        }
      );
    }
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
            Create Series
          </h3>
          <button
            onClick={() => {
              setFormTitle("Add New Series");
              setItemForEdit(null);
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
            Create Series
          </button>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
      <Modal
        centered
        onCancel={() => setOpenAddModel(false)}
        open={openAddModel}
        footer={false}
      >
        <div className="p-6">
          <h1
            className="text-2xl font-semibold"
            style={{ marginBottom: "12px" }}
          >
            {formTitle}
          </h1>
          <Form onFinish={onFinish} form={form}>
            <p className="text-[#6D6D6D] py-1">Package Name</p>
            <Form.Item
              name="program"
              rules={[
                {
                  required: true,
                  message: "Please input Package Name",
                },
              ]}
            >
              <select
                className="w-full p-4 border py-3 outline-none rounded-md cursor-pointer"
                id=""
              >
                {programs?.map((program) => (
                  <option
                    className="cursor-pointer "
                    key={program?.id}
                    value={program?.id}
                  >
                    {program?.title}
                  </option>
                ))}
              </select>
            </Form.Item>
            <p className="text-[#6D6D6D] py-1">Title</p>

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
                value={series}
                onChange={(e) => setSeries(e.target.value)}
                className="w-full p-4 border py-3 outline-none rounded-md"
              />
            </Form.Item>

            <div className="flex justify-center items-center mt-7">
              <Input
                className="px-6 py-2 bg-[#B47000] text-white cursor-pointer"
                value={`Save`}
                type="submit"
              />
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Series;

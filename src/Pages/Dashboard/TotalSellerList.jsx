import React, { useEffect, useRef, useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Calendar, Dropdown, Input, Modal, Table } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AllUsers } from "../../ReduxSlices/AllUsersSlice";
import ServerUrl from "../../../Config";

const TotalSellerList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );
  const [valueData, setValueData] = useState(null);
  // all user
  useEffect(() => {
    dispatch(AllUsers({ page: page, searchTerm: search }));
  }, [page, search]);

  const userdata = useSelector((state) => state.AllUsers.userData);

  const data = userdata.map((users, index) => ({
    key: index + 1,
    name: users.name,
    photo: users?.profile_image.includes("http")
      ? users?.profile_image
      : `${ServerUrl}${users?.profile_image}`,
    email: users.email,
    phoneNumber: users.phone_number,
    status: "General",
  }));

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

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
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
          <img src={record.photo} alt="Image" className="w-16 h-9 " />
          <span>{record.name}</span>
        </span>
      ),
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <p
          style={{
            color: record?.status === "General" ? "#0044B4" : "#B47000",
          }}
        >
          {record?.status}
        </p>
      ),
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
          <FiEye
            onClick={() => setValueData(record)}
            size={20}
            color="black"
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
          All User
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
        open={valueData}
        onCancel={() => setValueData(null)}
        width={500}
        footer={false}
        padding={0}
      >
        <div className="p-2 ">
          <div className="flex flex-col justify-center items-center bg-[#F4EAD9] p-6">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={valueData?.photo}
                alt=""
              />
            </div>
            <h1 className="text-2xl font-semibold mt-5">{valueData?.name}</h1>
          </div>

          <div className="p-5">
            <div>
              <p className="text-sm font-semibold text-[#555555] mb-1">
                Status
              </p>
              <p className="text-[#B47000]"> {valueData?.status}</p>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold text-[#555555] mb-1">Name</p>
              <p className="text-[#555555]">{valueData?.name}</p>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold text-[#555555] mb-1">Email</p>
              <p className="text-[#555555]">{valueData?.email}</p>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold text-[#555555] mb-1">
                Contact No
              </p>
              <p className="text-[#555555]">{valueData?.phoneNumber}</p>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold text-[#555555] mb-1">
                Date of birth
              </p>
              <p className="text-[#555555]">17 dec, 2024</p>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold text-[#555555] mb-1">
                Designation
              </p>
              <p className="text-[#555555]">Actor</p>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold text-[#555555] mb-1">
                Address
              </p>
              <p className="text-[#555555]">68/ Joker Vila, Gotham City</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TotalSellerList;

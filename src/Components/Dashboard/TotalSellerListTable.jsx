import { Table, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ServerUrl from "../../../Config";
import Swal from "sweetalert2";
import { FiEye } from "react-icons/fi";

const TotalSellerListTable = ({ Subscribers }) => {
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );
  const [open, setOpen] = useState();
  const [valueData, setValueData] = useState(null);
  const dropdownRef = useRef();

  const newSubscriber = Subscribers.newSubscribers;
  console.log(newSubscriber);
  const data = newSubscriber?.slice(0, 6)?.map((subs, index) => ({
    key: index + 1,
    name: subs.user_id?.name,
    photo: subs.user_id?.profile_image.includes("http")
      ? subs.user_id?.profile_image
      : `${ServerUrl}${subs.user_id?.profile_image}`,
    email: subs.user_id?.email,
    contact: subs.user_id?.phone_number,
    location: subs.user_id?.address,
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
      render: (text, record) => (
        <span
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <img src={record.photo} className=" h-10 w-14" alt="" />
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
      title: "Contact Number",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (_, record) => (
        <>
          {record?.location ? (
            <p>{record?.location}</p>
          ) : (
            <p className="text-red-500">not added</p>
          )}
        </>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "printView",
      key: "printView",
      render: (_, record) => (
        <div style={{ position: "relative", width: "100%" }}>
          <FiEye
            onClick={(e) => (
              e.stopPropagation(), setOpen(record.key), setValueData(record)
            )}
            size={20}
            color="black"
            style={{ cursor: "pointer" }}
          />

          <div onClick={(e) => e.stopPropagation()} ref={dropdownRef}></div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        height: "fit-content",
        background: "white",
        padding: "15px 24px 0 24px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>
          New Subscriber
        </h1>
        <Link to="/all-subscriber">
          <p
            style={{
              color: " #707070",
              fontSize: "12px",
              textDecoration: "underline",
            }}
          >
            VIEW ALL
          </p>
        </Link>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />

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
                Contact Number
              </p>
              <p className="text-[#555555]">{valueData?.contact}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default TotalSellerListTable;

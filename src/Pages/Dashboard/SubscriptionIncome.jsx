import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Dropdown, Input, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { LuRefreshCw } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { AllSubscription } from "../../ReduxSlices/Subscription/GetAllSubscriptionSlice";
const SubscriptionIncome = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  const [category, setCategory] = useState(
    new URLSearchParams(window.location.search).get("category") || "All"
  );
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );

  const dropdownRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllSubscription({ page: page, searchTerm: search }));
  }, [page, search]);

  const subscribers = useSelector(
    (state) => state?.AllSubscription?.allSubscription
  );
  console.log(subscribers);

  const data = subscribers?.map((subs, index) => ({
    key: index + 1,
    name: subs?.user_id?.name,
    email: subs?.user_id?.email,
    // date: subs?.user_id?.name,
    photo: subs?.user_id?.profile_image,
    package: subs?.plan_id?.title,
    status: subs?.user_id?.name,
    price: `$${subs?.plan_id?.price}`,
  }));

  const items = [
    {
      label: "Package name",
      key: "All",
    },
    {
      label: "Car",
      key: "Car",
    },
    {
      label: "Bike",
      key: "Bike",
    },
    {
      label: "Cycle",
      key: "Cycle",
    },
  ];

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
          <img src={record.photo} alt="" />
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
      title: "Package name",
      dataIndex: "package",
      key: "package",
    },
    {
      title: "Package Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const onClick = ({ key }) => {
    setCategory(key);
    const params = new URLSearchParams(window.location.search);
    params.set("category", key);
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
        <div className="flex justify-start items-center  gap-5">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-md"
          >
            <FaArrowLeft />
          </button>
          <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>
            Subscription Income Details
          </h1>
        </div>
        {/* <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
        </div> */}
      </div>
      <div
        style={{
          background: "white",
          padding: "20px",
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
    </div>
  );
};

export default SubscriptionIncome;

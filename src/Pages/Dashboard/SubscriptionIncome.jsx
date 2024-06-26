import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Dropdown, Input, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { LuRefreshCw } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { AllSubscription } from "../../ReduxSlices/Subscription/GetAllSubscriptionSlice";
import { CSVLink } from "react-csv";
const SubscriptionIncome = () => {
  const [search, setSearch] = useState("");
 
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

  const data = subscribers?.map((subs, index) => ({
    key: index + 1,
    name: subs?.user_id?.name,
    email: subs?.user_id?.email,
    // date: subs?.user_id?.name,
    photo: subs?.user_id?.profile_image,
    package: subs?.plan_id?.title,
    status: subs?.user_id?.name,
    price: `$${subs?.plan_id?.price}`,
    gender: subs?.user_id?.gender,
    age: subs?.user_id?.age
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
  const exportCsv = data.map((item) => ({ name: item?.name, email: item?.email, package: item?.package, price: item?.price, age: item?.age, gender: item?.gender }))
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
        <CSVLink filename="subscriptionIncome" className="p-2 bg-[#b47000] text-white hover:text-white" data={exportCsv}>Download csv</CSVLink>
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

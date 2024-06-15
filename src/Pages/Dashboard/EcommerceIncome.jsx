import React, { useEffect, useRef, useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";
import { Calendar, Dropdown, Input, Slider, Table } from "antd";
import { FaArrowLeft, FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

import { LuRefreshCw } from "react-icons/lu";
import avater from "../../assets/avater.png";

import product from "../../assets/icon/product.png";
import { useDispatch, useSelector } from "react-redux";
import { AllEcommerce } from "../../ReduxSlices/GetEcommerceIncomeSlice";

const EcommerceIncome = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllEcommerce({ page: page, searchTerm: search }));
  }, [page, search]);

  const ecommerce = useSelector((state) => state?.AllEcommerces?.allEcommerce);
  const data = ecommerce?.map((subs, index) => {
    console.log(subs?.product)
    return ({
    key: index + 1,
    name: subs?.user?.name,
    email: subs?.user?.email,
    // date: subs?.user_id?.name,
    photo: subs?.user?.profile_image,
    package: subs?.product?.productName,
    status: subs?.user_id?.name,
    price: `$${subs?.product?.price}`,
    // balance: subs?.user_id?.name,
  })});

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
      title: "Product Name",
      dataIndex: "package",
      render: (text, record) => (
        <span
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>{record.package}</span>
        </span>
      ),
      key: "package",
    },
    {
      title: "Amount",
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
            Ecommerce Income Details
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

export default EcommerceIncome;

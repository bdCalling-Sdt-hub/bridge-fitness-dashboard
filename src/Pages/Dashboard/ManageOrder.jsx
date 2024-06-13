import { Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";
import { LuRefreshCw } from "react-icons/lu";

import { useDispatch, useSelector } from "react-redux";
import { AllProducts } from "../../ReduxSlices/AllProductSlice";
import moment from "moment";

const ManageOrder = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.AllProducts.userData.data);
  console.log(products);

  const data = products.map((product, index) => ({
    key: index + 1,
    name: product?.user?.name,
    email: product?.user?.email,
    deliveryTime: moment(product?.updatedAt).format("MM/DD/YYYY"),
    photo: product?.images,
    product: product?.productName,
    status: product?.orderStatus,
    totalItems: product?.quantity,
    Price: product?.totalAmount,
  }));

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.pushState(null, "", `?${params.toString()}`);
  };
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
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Delivery Time",
      dataIndex: "deliveryTime",
      key: "deliveryTime",
    },
    {
      title: "Product name",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Total Items",
      dataIndex: "totalItems",
      key: "totalItems",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <p
          style={{
            color: record?.status === "Completed" ? "white" : "black",
            width: "100%",
            textAlign: "center",
            borderRadius: "4px",
            background:
              record?.status === "Pending"
                ? "#f2f2f2"
                : record?.status === "Confirm"
                ? "#f8f1e6"
                : record?.status === "Delivery"
                ? "#e8d3b0"
                : "#b47000",
            padding: "5px 0",
            cursor: "pointer",
          }}
        >
          {record?.status}
        </p>
      ),
    },
  ];
  return (
    <div id="manageOrder">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "16px 0",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>
          All Products
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

          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "4px",
              height: "40px",
              background: "#fefefe",
              padding: "0 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <button
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              Data Refresh{" "}
            </button>
            <LuRefreshCw />
          </div>
        </div>
      </div>
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
  );
};

export default ManageOrder;

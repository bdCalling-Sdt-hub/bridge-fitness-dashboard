import { Dropdown, Input, Modal, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Subscribers } from "../../ReduxSlices/SubscribersSlice";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";
import { ServerUrl } from "../../../Config";
const AllSubscriber = () => {
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState();
  const dropdownRef = useRef();
  const [search, setSearch] = useState("");
  const [ItemPerPage, setItemPerPage] = useState(10);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [valueData, setValueData] = useState(null);
  const [items, setItem] = useState([{ label: 'All', key: 'All' }])
  const [category, setCategory] = useState(
    new URLSearchParams(window.location.search).get("category") || "All"
  );
  const [plan, setPlan] = useState("");
  useEffect(() => {
    dispatch(Subscribers({ page: page, plan_type: plan }));
  }, [ItemPerPage, page, plan]);

  const subscibers = useSelector((state) => state.SubscriberUser.userData);
  const data = subscibers?.data?.map((users, index) =>{
   return ({
      key: index + 1,
      name: users?.user_id?.name,
      photo: users?.user_id?.profile_image.includes("http")
        ? users?.user_id?.profile_image
        : `${ServerUrl}${users?.user_id?.profile_image}`,
      email: users?.user_id?.email,
      contact: users?.user_id?.phone_number,
      date: moment(users?.startDate).format("MM/DD/YYYY"),
      status: "General",
    })
  });

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
          <img src={record.photo} alt={record.photo} className=" w-10 h-8 " />
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
      title: "Date",
      dataIndex: "date",
      key: "date",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          <span className="text-[#B47000]">{record.status}</span>
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
              e.stopPropagation(),
              setOpen(record.key),
              setOpenAddModel(true),
              setValueData(record)
            )}
            size={20}
            color="#0044B4"
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
  useEffect(() => {
    const filterItem = subscibers?.planTypes?.map(item => (
      { label: item, key: item }
    ))
    if (!filterItem) {
      return
    }
    filterItem.push({ label: 'All', key: 'All' })
    setItem(filterItem)
  }, [subscibers])

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

  const onClick = ({ key }) => {
 
    setPlan(key);
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
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>
          All Subscriber
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              height: "40px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 10px",
              color: "#8B8B8B",
              background: "#fefefe",
            }}
          >
            <Dropdown menu={{ items, onClick }}>
              <p
                style={{
                  cursor: "pointer",
                  color: "#717171",
                  borderRadius: "4px",
                }}
                onClick={(e) => e.preventDefault()}
              >
                {category}
                <DownOutlined style={{ paddingLeft: "18px" }} color="#717171" />
              </p>
            </Dropdown>
          </div>
        </div>
      </div>
      {subscibers?.length === 0 ? (
        <img
          src="https://api.asm.skype.com/v1/objects/0-sa-d2-b07fa14d83225f4f0e001cb3694fe116/views/imgpsh_fullsize_anim"
          alt=""
        />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            defaultCurrent: parseInt(page),
            onChange: handlePageChange,
          }}
        />
      )}

      <Modal
        centered
        open={valueData}
        onCancel={() => setValueData(null)}
        width={500}
        footer={false}
        padding={0}
      >
        {valueData ? (
          <div className="p-2">
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
                <p className="text-[#B47000]">{valueData?.status}</p>
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold text-[#555555] mb-1">
                  Name
                </p>
                <p className="text-[#555555]">{valueData?.name}</p>
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold text-[#555555] mb-1">
                  Email
                </p>
                <p className="text-[#555555]">{valueData?.email}</p>
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold text-[#555555] mb-1">
                  Contact No
                </p>
                <p className="text-[#555555]">{valueData?.contact}</p>
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold text-[#555555] mb-1">
                  Date
                </p>
                <p className="text-[#555555]">{valueData?.date}</p>
              </div>
            </div>
          </div>
        ) : (
          []
        )}
      </Modal>
    </div>
  );
};

export default AllSubscriber;

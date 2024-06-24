import React, { useEffect, useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { Modal, Table } from "antd";
import { FaPlus } from "react-icons/fa6";
import { CiCircleMinus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Subscription } from "../../ReduxSlices/AddSubscription";
import { useForm } from "react-hook-form";
import { AddSubscriptions } from "../../ReduxSlices/Subscription/AddSubscriptionSlice";
import Swal from "sweetalert2";
function generateRandomNumber() {
  const randomNumber = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return randomNumber;
}
const AddSubscription = () => {
  const [subName, setsubName] = useState("");
  const [subPrice, setsubPrice] = useState("");
  const [openAddModel, setOpenAddModel] = useState(false);
  const dispatch = useDispatch();
  const [descriptionFeatures, setDescriptionFeatures] = useState([]);
  const [error, setError] = useState([])
  const [seubId, setSubId] = useState()
  useEffect(() => {
    dispatch(Subscription());
  }, [dispatch]);

  const subscriptions = useSelector((state) => state.Subscription.userData); 
  const data = subscriptions?.map((subs, index) => ({
    key: index + 1,
    name: subs?.title,
    price: subs?.price,
    feature: subs?.items,
    id: subs?._id
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
      key: "pakg",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (_, record) => (
        <>
          <button
            onClick={() => {
              setOpenAddModel(true);
              const manageSubscription = data.filter(
                (item) => item.key == record.key
              );
              setsubName(manageSubscription[0]?.name);
              setsubPrice(manageSubscription[0]?.price);
              setDescriptionFeatures(manageSubscription[0]?.feature)
              setSubId(manageSubscription[0]?.id)
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
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    setError([])
    const SubscriptionData = {
      title: subName,
      price: subPrice,
      items: descriptionFeatures
    }
    SubscriptionData?.items?.map(item => {
      if (!item?.title) {
        setError([...error, item.id])
      }
    })
    if (error.length > 0) {
      return false
    }
    dispatch(AddSubscriptions({ id: seubId, SubscriptionData })).then((res) => {
      if (res.type == 'AddSubscriptions/fulfilled') {
        dispatch(Subscription());
        Swal.fire({
          title: "updated!",
          text: "plan has been updated.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
      }).then(()=>{
        setOpenAddModel(false)
      });
      }else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 1500,
          showConfirmButton: false,
          showCloseButton: false
        });
      }
    })
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
          Subscription
        </h1>
      </div>
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={700}
        footer={false}
      >
        <div className="p-6 ">
          <h1
            className="font-semibold text-[#555555]"
            style={{ marginBottom: "12px" }}
          >
            Manage Subscriptions
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="text-[#6D6D6D] py-1">Package Name</p>
              <input
                onChange={(e) => {
                  setsubName(e.target.value);
                }}
                className="w-[50%] border outline-none px-3 py-[10px]"
                type="text"
                value={subName}
              />
            </div>
            <div className="mt-2">
              <p className="text-[#6D6D6D] py-1">Package Price</p>
              <input
                onChange={(e) => {
                  setsubPrice(e.target.value);
                }}
                className="w-[50%] border outline-none px-3 py-[10px]"
                type="number"
                value={subPrice}
              />
            </div>
            <p className="text-[#6D6D6D] py-1">Description </p>
            <div className="w-full  py-3 pb-10 px-3  border">
              <div className="w-full  flex flex-col justify-start items-start gap-2">
                {descriptionFeatures?.map((item) => (
                  <span key={item?.id} className="relative w-full">
                    <input
                      onInput={(e) => {
                        const newArray = descriptionFeatures.map(items => {
                          if (items?.id == item.id) {
                            return { ...items, title: e.target.value }
                          } else {
                            return items
                          }
                        })
                        setDescriptionFeatures(newArray)
                      }}
                      className="w-[90%] bg-[#FEFEFE] border py-3 px-2"
                      type="text"
                      name=""
                      id=""
                      defaultValue={item?.title || ""}
                      placeholder="please insert a feature"
                    />
                    <CiCircleMinus
                      onClick={() => {
                        const newfeatures = descriptionFeatures.filter(
                          (filterItem) => filterItem?.id !== item?.id
                        );
                        setDescriptionFeatures(newfeatures);
                      }}
                      className="absolute right-3 top-[50%] translate-y-[-50%] text-2xl cursor-pointer text-[#E2BCC1]"
                    />
                    {
                      error.includes(item.id) && <p className="text-red-500">feature can not be empty</p>
                    }
                  </span>
                ))}

                <div className="w-full relative py-3">
                  <button type="button"
                    onClick={() => {
                      setDescriptionFeatures([
                        ...descriptionFeatures,
                        { title: '', id: generateRandomNumber() },
                      ]);
                    }}
                    className="p-1 bg-[#B47000] rounded-full absolute right-[8.5px]"
                  >
                    <FaPlus className="text-xl text-white" />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <button type="submit" className="bg-[#B47000] px-6 py-3 text-[#FEFEFE]">
                Save & Change
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
export default AddSubscription;

import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllNotification } from "../../ReduxSlices/Notification/GetAllNotificationSlice";
import moment from "moment";

const data = [
  {
    key: "1",
    title: "A new order has arrived",
    date: "8:00am today",
    item: "Dumbbell 5kg",
    price: "price 80CND",
    status: "read",
  },
  {
    key: "1",
    title: "A new order has arrived",
    date: "8:00am today",
    item: "Dumbbell 5kg",
    price: "price 80CND",
    status: "unread",
  },
];
const Notification = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllNotification());
  }, [dispatch]);
  const notifications = useSelector(
    (state) => state.AllNotification.allNotification
  );
  console.log(notifications);

  const data = notifications?.map((notification, index) => ({
    key: index + 1,
    title: notification.title,
    date: moment(notification.createdAt).format("h:mm a , dddd"),
    item: notification.message,
    // price: "price 80CND",
    // status: "unread",
  }));

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-[#242424] text-2xl font-bold">Notifications</h3>
        <button className="text-[#B47000] font-semibold border-2 border-[#B47000] px-6 py-2">
          Read all
        </button>
      </div>
      <div className="flex justify-start items-start flex-col gap-2 py-8 px-3">
        {data.map((item) => (
          <div
            className={`flex justify-between items-center w-full ${
              item?.status === "read" ? "bg-[#F8F1E6]" : "bg-[#FBFBFB]"
            } p-3 py-5 rounded-lg`}
            key={item?.key}
          >
            <div>
              <div className="flex justify-start items-center gap-8 mb-1 text-[#919191]">
                <h3 className="text-[#555555] font-bold">{item?.title}</h3>
                <p>{item?.date}</p>
              </div>
              <div className="flex justify-start items-center gap-2 text-[#919191]">
                <h3>{item?.item}</h3>
                <p>{item?.price}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setOpenAddModel(true);
              }}
              className="text-[#B47000] font-medium text-lg"
            >
              View
            </button>
          </div>
        ))}
      </div>
      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={600}
        footer={false}
      >
        <div className="p-5 min-h-96 relative">
          <h3 className="text-[#555555] font-bold">A new order has arrived</h3>
          <p className="text-[#919191] mt-4">
            Md.Asad, address 76/4 cantonment. ordered dumbbell 5kg, price 80CND.
            pleas confirm this order
          </p>
          <button className="bg-[#B47000] p-3 px-6 text-[#FEFEFE] absolute bottom-6 right-6">
            Visit page
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Notification;

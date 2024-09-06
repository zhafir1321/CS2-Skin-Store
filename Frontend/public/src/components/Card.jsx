import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Card({ items, url }) {
  const navigate = useNavigate();
  const handleBuy = async () => {
    try {
      const { data } = await axios.get(`${url}/items/buy-item`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      // Trigger snap popup
      window.snap.pay(data.transactionToken, {
        onSuccess: async function () {
          Swal.fire({
            icon: "success",
            title: "Payment Success",
          });
          const { data } = await axios.delete(`${url}/items/${items.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          });
          navigate(0);
        },
        onPending: function () {
          Swal.fire({
            icon: "warning",
            title: "Waiting your payment!",
          });
        },
        onError: function () {
          Swal.fire({
            icon: "error",
            title: "Payment failed!",
          });
        },
        onClose: function () {
          Swal.fire({
            icon: "question",
            title: "Cancel payment?",
          });
        },
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: error,
      });
    }
  };

  return (
    <div className="w-80 h-[400px] bg-gray-200 p-4 flex flex-col rounded-br-3xl shadow-lg">
      <div className="h-48 bg-gradient-to-bl from-gray-300 via-gray-400 to-gray-500 overflow-hidden">
        <img
          src={items.imgUrl}
          alt={items.ItemName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow justify-between mt-2">
        <div className="flex flex-col flex-grow">
          <div className="flex justify-end mb-1">
            <span
              className="text-gray-600 font-medium"
              style={{ fontSize: "clamp(0.75rem, 1.5vw, 1rem)" }}
            >
              {items.price}
            </span>
          </div>
          <span
            className="text-gray-800 font-bold"
            style={{
              fontSize: "clamp(0.75rem, 1.2vw, 1.125rem)",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
              textOverflow: "ellipsis",
              lineHeight: "1.2",
            }}
          >
            {items.ItemName}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{items.weapon}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleBuy}
            className="text-white font-medium rounded-lg text-sm w-full px-4 py-2 bg-green-500 hover:bg-green-600"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

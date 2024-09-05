import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Card({ items, url }) {
  const navigate = useNavigate();
  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`${url}/items/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate(0);
    } catch (error) {}
  }
  return (
    <>
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
                style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)' }}
              >
                {items.price}
              </span>
            </div>
            <span
              className="text-gray-800 font-bold"
              style={{
                fontSize: 'clamp(0.75rem, 1.2vw, 1.125rem)',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 2,
                textOverflow: 'ellipsis',
                lineHeight: '1.2',
              }}
            >
              {items.ItemName}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{items.weapon}</p>
          <div className="flex gap-2 mt-2">
            <button className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-4 py-2">
              <Link to={`/edit-item/${items.id}`}>Edit</Link>
            </button>
            <button
              onClick={(e) => handleDelete(e, items.id)}
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-4 py-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

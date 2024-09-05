import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import pistol from '../../data/pistol.json';
import smg from '../../data/smg.json';
import shotgun from '../../data/shotgun.json';
import machinegun from '../../data/machinegun.json';
import rifle from '../../data/rifle.json';
import knife from '../../data/knife.json';

export default function EditItem({ url }) {
  const [item, setItem] = useState({});
  const [skin, setSkin] = useState('');
  const [weapon, setWeapon] = useState('');
  const [exterior, setExterior] = useState('');
  const [price, setPrice] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const getItem = async () => {
    try {
      const { data } = await axios.get(`${url}/items/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setItem(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (item) {
      setSkin(item.skin);
      setWeapon(item.weapon);
      setExterior(item.exterior);
      setPrice(item.price);
    }
  }, [item]);

  useEffect(() => {
    getItem();
  }, []);
  return (
    <>
      <form className="max-w-sm mx-auto m-10">
        <div className="mb-5">
          <label
            htmlFor="skin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Skin
          </label>
          <input
            value={skin}
            type="text"
            id="skin"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="weapon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Weapon
          </label>
          <select
            value={weapon}
            id="weapon"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled>---Knives</option>
            {knife.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
            <option disabled>---Pistols---</option>
            {pistol.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
            <option disabled>---SMGs---</option>
            {smg.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
            <option disabled>---Shotguns---</option>
            {shotgun.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
            <option disabled>---Machineguns---</option>
            {machinegun.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
            <option disabled>---Rifles---</option>
            {rifle.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="exterior"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Exterior
          </label>
          <input
            value={exterior}
            type="text"
            id="exterior"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            value={price}
            type="text"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div className="mb-5 max-w-lg mx-auto">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}

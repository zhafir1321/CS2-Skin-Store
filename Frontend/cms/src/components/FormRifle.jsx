import rifle from '../data/rifle.json';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FormRifle({ url }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (d) => {
    const formData = new FormData();

    formData.append('skin', d.skin);
    formData.append('exterior', d.exterior);
    formData.append('price', d.price);
    formData.append('weapon', d.weapon);
    formData.append('imgUrl', d.imgUrl[0]);

    try {
      const { data } = await axios.post(`${url}/items`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="max-w-sm mx-auto m-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="skin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Skin
          </label>
          <input
            {...register('skin')}
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
            {...register('weapon')}
            id="weapon"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {rifle.map((el, index) => (
              <option key={index} value={el}>
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
            {...register('exterior')}
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
            {...register('price')}
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
            {...register('imgUrl')}
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

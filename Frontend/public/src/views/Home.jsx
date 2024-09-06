import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAsync } from "../features/getItems";

export default function Home({ url }) {
  const dispatch = useDispatch();
  // const [items, setItems] = useState([]);

  const { items, loading, error } = useSelector((state) => state.getItems);

  useEffect(() => {
    dispatch(getAsync());
  }, []);

  // async function getItems() {
  //   try {
  //     const { data } = await axios.get(`${url}/items`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.access_token}`,
  //       },
  //     });
  //     setItems(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getItems();
  // }, []);
  return (
    <>
      <div className="m-5 flex gap-8 flex-wrap">
        {items.length > 0 &&
          !error &&
          items.map((el) => {
            return <Card key={el.id} items={el} url={url} />;
          })}
      </div>
    </>
  );
}

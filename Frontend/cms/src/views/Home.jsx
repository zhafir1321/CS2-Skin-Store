import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Home({ url }) {
  const [items, setItems] = useState([]);

  async function getItems() {
    try {
      const { data } = await axios.get(`${url}/items`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setItems(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <div className="m-5 flex gap-8 flex-wrap">
        {items.map((el) => (
          <Card key={el.id} items={el} url={url} />
        ))}
      </div>
    </>
  );
}

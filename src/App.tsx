import { useEffect, useState } from "react";
import "./App.css";
import getLocalDate from "./utils/getLocalDate.ts";
import { md5 } from "js-md5";
import useFetch from "./hooks/useFetch.ts";
import Loader from "./components/Loader/index.tsx";

type Item = {
  brand: string | null;
  id: string;
  price: number | null;
  product: string;
};

function App() {
  const currentDate = getLocalDate();
  const xAuth = md5(import.meta.env.VITE_VALANTIS_API_KEY + "_" + currentDate);
  const { post, loading } = useFetch();
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    post(import.meta.env.VITE_VALANTIS_API_URL, xAuth, {
      action: "get_ids",
      params: { offset: 10, limit: 5 },
    })
      .then((data: unknown) => {
        const itemsData = data as string[];
        return post(import.meta.env.VITE_VALANTIS_API_URL, xAuth, {
          action: "get_items",
          params: { ids: itemsData },
        });
      })
      .then((data: unknown) => {
        const itemsData = data as Item[];
        setItems(itemsData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {items && !loading ? (
        items.map((item) => {
          return <p key={item.id}>{item.product}</p>;
        })
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;

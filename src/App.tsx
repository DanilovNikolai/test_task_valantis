import { useEffect, useState } from "react";
import "./App.scss";
import getLocalDate from "./utils/getLocalDate.ts";
import { md5 } from "js-md5";
import useFetch from "./hooks/useFetch.ts";

import filterUniqueItems from "./utils/filterUniqueItems.ts";
import Header from "./components/Header/index.tsx";
import ItemsList from "./components/ItemsList/index.tsx";
import FilterBlock from "./components/FilterBlock/index.tsx";

export interface ItemProps {
  brand: string | null;
  id: string;
  price: number | null;
  product: string;
}

function App() {
  const currentDate = getLocalDate();
  const xAuth = md5(import.meta.env.VITE_VALANTIS_API_KEY + "_" + currentDate);
  const url = import.meta.env.VITE_VALANTIS_API_URL;
  const { post, loading } = useFetch();
  const [items, setItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    post(url, xAuth, "get_ids", { offset: 10, limit: 50 })
      .then((data: unknown) => {
        const itemsData = data as string[];
        return post(url, xAuth, "get_items", { ids: itemsData });
      })
      .then((data: unknown) => {
        const itemsData = data as ItemProps[];

        // Фильтруем повторяющиеся id из массива
        const uniqueItems = filterUniqueItems(itemsData);
        setItems(uniqueItems);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    post(url, xAuth, "get_fields").then((data: unknown) => {
      const itemsData = data as string[];
      console.log(itemsData);
    });
  }, []);

  return (
    <>
      <Header />
      <FilterBlock url={url} xAuth={xAuth} post={post} loading={loading} />
      <div className="wrapper">
        <ItemsList items={items} loading={loading} />
      </div>
    </>
  );
}

export default App;

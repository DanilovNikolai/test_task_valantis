import { useEffect, useState } from "react";
import "./App.scss";
import getLocalDate from "./utils/getLocalDate.ts";
import { md5 } from "js-md5";
import useFetch from "./hooks/useFetch.ts";

import filterUniqueItems from "./utils/filterUniqueItems.ts";
import Header from "./components/Header";
import ItemsList from "./components/ItemsList";
import FilterBlock from "./components/FilterBlock";
import Pagination from "./components/Pagination";

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
  const [items, setItems] = useState<ItemProps[] | null>(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : null;
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchItems = async (page: number) => {
    const data = await post(url, xAuth, "get_ids", {
      offset: (page - 1) * 50,
      limit: 50,
    });
    const itemsData = data as string[];
    const itemsDetails = await post(url, xAuth, "get_items", {
      ids: itemsData,
    });
    return itemsDetails as ItemProps[];
  };

  const loadPage = async (page: number) => {
    try {
      const itemsData = await fetchItems(page);
      const uniqueItems = filterUniqueItems(itemsData);
      setItems(uniqueItems);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await post(url, xAuth, "get_ids", {
          offset: 0,
          limit: 50,
        });
        const itemsData = data as string[];
        console.log(itemsData);

        await loadPage(currentPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const loadNextPage = () => {
    const nextPage = currentPage + 1;
    loadPage(nextPage);
  };

  const loadPrevPage = () => {
    const prevPage = currentPage - 1;
    loadPage(prevPage);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <Header />
      <FilterBlock
        url={url}
        xAuth={xAuth}
        post={post}
        loading={loading}
        setItems={setItems}
      />
      <Pagination
        currentPage={currentPage}
        onPageChange={loadPage}
        onLoadNextItems={loadNextPage}
        onLoadPrevItems={loadPrevPage}
      />
      <div className="wrapper">
        <ItemsList items={items} loading={loading} />
      </div>
    </>
  );
}

export default App;

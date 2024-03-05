import { useEffect, useState } from "react";
// styles
import "./App.scss";
// utils
import getLocalDate from "./utils/getLocalDate.ts";
import filterUniqueItems from "./utils/filterUniqueItems.ts";
// md5 library
import { md5 } from "js-md5";
// custom hook
import useFetch from "./hooks/useFetch.ts";
// components
import Header from "./components/Header";
import ItemsList from "./components/ItemsList";
import FilterBlock from "./components/FilterBlock";
import Pagination from "./components/Pagination";
// icons
import not_found from "./assets/not_found.png";
// react-router-dom
import { Link } from "react-router-dom";

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
  const storedPage = localStorage.getItem("currentPage");
  const initialPage = storedPage ? parseInt(storedPage, 10) : 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [error, setError] = useState<string>("");

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
      const uniqueItems = filterUniqueItems(itemsData); // убираем дубли
      setItems(uniqueItems);
      setCurrentPage(page);
      localStorage.setItem("currentPage", String(page));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //@ts-ignore
        const data = await post(url, xAuth, "get_ids", {
          offset: 0,
          limit: 50,
        });

        loadPage(currentPage);
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

  return (
    <>
      <Header />
      <FilterBlock
        url={url}
        xAuth={xAuth}
        post={post}
        loading={loading}
        setItems={setItems}
        setError={setError}
      />
      <Pagination
        currentPage={currentPage}
        onPageChange={loadPage}
        onLoadNextItems={loadNextPage}
        onLoadPrevItems={loadPrevPage}
        error={error}
      />
      <div className="wrapper">
        {error ? (
          <div className="error-message">
            <div className="error-title">{error}</div>
            <div>
              <img src={not_found} alt="" />
            </div>
            <div>
              <Link to="/">Вернуться назад</Link>
            </div>
          </div>
        ) : (
          <ItemsList items={items} loading={loading} />
        )}
      </div>
    </>
  );
}

export default App;

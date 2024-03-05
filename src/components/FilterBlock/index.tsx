import React, { useState } from "react";
// styles
import styles from "./FilterBlock.module.scss";
// types
import { Action } from "../../hooks/useFetch";
import { BodyParams } from "../../hooks/useFetch";

interface FilterBlockProps {
  url: string;
  xAuth: string;
  post: (
    arg0: string,
    arg1: string,
    arg2: Action,
    arg3: BodyParams
  ) => Promise<any>;
  loading: boolean;
  setItems: (arg0: any) => void;
  setError: (arg0: string) => void;
}

const FilterBlock: React.FC<FilterBlockProps> = ({
  url,
  xAuth,
  post,
  setItems,
  setError,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("product");

  function handleFilterButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    const params: BodyParams = {};

    if (selectValue === "price") {
      params[selectValue] = parseInt(inputValue.trim(), 10);
    } else {
      params[selectValue] = inputValue.trim();
    }

    if (!inputValue) {
      return;
    }

    post(url, xAuth, "filter", params)
      .then(async (data) => {
        if (data.length === 0) {
          setError("По вашему запросу ничего не найдено!");
        } else {
          setError("");
          const items = await post(url, xAuth, "get_items", { ids: data });
          setItems(items);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("При выполнении запроса произошла ошибка.");
      });

    setInputValue("");
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <form action="" className={styles.filter_form}>
          <select
            name="filter"
            id="filter"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            className={styles.filter_select}
          >
            <option value="product">По названию</option>
            <option value="price">По цене</option>
            <option value="brand">По бренду</option>
          </select>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.filter_input}
          />
          <button
            onClick={handleFilterButton}
            type="submit"
            className={styles.filter_button}
          >
            <span>Поиск</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterBlock;

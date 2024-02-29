import styles from "./Filter.module.scss";
import { useEffect, useState } from "react";
import { ItemProps } from "../../App";
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
  ) => string[] | ItemProps[];
  loading: boolean;
}

const FilterBlock: React.FC<FilterBlockProps> = (
  {
    // url,
    // xAuth,
    // post,
    // loading,
  }
) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");

  useEffect(() => {
    console.log(inputValue);
    console.log(selectValue);
  }, [inputValue, selectValue]);

  function handleFilterButton(event: { preventDefault: () => void }) {
    event.preventDefault();
    // post(url, xAuth, "filter", { selectValue: inputValue }).then((data) =>
    //   console.log(data)
    // );
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <form action="">
          <select
            name="filter"
            id="filter"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="product">По названию</option>
            <option value="price">По цене</option>
            <option value="brand">По бренду</option>
          </select>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleFilterButton} type="submit">
            Поиск
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterBlock;

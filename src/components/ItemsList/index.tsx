// styles
import styles from "./ItemsList.module.scss";
// components
import Item from "../Item";
import Loader from "../Loader";
// types
import { ItemProps } from "../../App";

export interface ItemsListProps {
  items: ItemProps[] | null;
  loading: boolean;
}

const ItemsList: React.FC<ItemsListProps> = ({ items, loading }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <h2>Каталог товаров</h2>
        {items && (
          <p>
            Показано товаров: <b>{items?.length}</b>
          </p>
        )}
      </div>
      {loading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={styles.container}>
          {items?.length ? (
            items.map((item: ItemProps, index) => (
              <Item
                key={index}
                brand={item.brand}
                id={item.id}
                price={item.price}
                product={item.product}
              />
            ))
          ) : (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemsList;

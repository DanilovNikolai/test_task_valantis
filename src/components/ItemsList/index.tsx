import styles from "./ItemsList.module.scss";
import Item from "../Item";
import { ItemProps } from "../../App";
import Loader from "../Loader";

export interface ItemsListProps {
  items: ItemProps[];
  loading: boolean;
}

const ItemsList: React.FC<ItemsListProps> = ({ items, loading }) => {
  return (
    <div className={styles.root}>
      <h2>Каталог товаров</h2>
      {loading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={styles.container}>
          {items.length ? (
            items.map((item: ItemProps) => (
              <Item
                key={item.id}
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

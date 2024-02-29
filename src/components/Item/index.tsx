import styles from "./Item.module.scss";
import { ItemProps } from "../../App";

const Item: React.FC<ItemProps> = ({ brand, id, price, product }) => {
  return (
    <div className={styles.root}>
      <div className={styles.item_container}>
        <img
          className={styles.item_image}
          src="https://freepngclipart.com/download/ring/83059-vector-ring-engagement-diamond-free-download-png-hd.png"
        />
        <h3 className={styles.item_title}>{product}</h3>
        <div className={styles.item_id}>
          <b>id:</b> {id}
        </div>
        {brand ? (
          <div className={styles.item_brand}>{brand}</div>
        ) : (
          <div className={styles.item_brand}>Без бренда</div>
        )}
        <div className={styles.item_price}>{price} ₽</div>
      </div>
    </div>
  );
};

export default Item;

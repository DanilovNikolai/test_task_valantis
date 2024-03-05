// styles
import styles from "./Item.module.scss";
// types
import { ItemProps } from "../../App";
// icons
import images from "./images";

const Item: React.FC<ItemProps> = ({ brand, id, price, product }) => {
  const itemImage =
    images.find((image) => image.condition(product))?.src || images[0].src;

  return (
    <div className={styles.root}>
      <div className={styles.item_container}>
        <img className={styles.item_image} src={itemImage} alt="item" />
        <h3 className={styles.item_title}>{product}</h3>
        <div className={styles.item_brand}>
          {brand ? `Бренд: ${brand}` : "Без бренда"}
        </div>
        <div className={styles.item_price}>{price} ₽</div>
      </div>
      <div className={styles.item_id}>
        <b>id:</b> {id}
      </div>
    </div>
  );
};

export default Item;

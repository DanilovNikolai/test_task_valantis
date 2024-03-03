import styles from "./Item.module.scss";
import { ItemProps } from "../../App";
import ring from "../../assets/ring.png";
import necklace from "../../assets/necklace.png";
import earrings from "../../assets/earrings.png";
import pendant from "../../assets/pendant.png";
import bracelet from "../../assets/bracelet.webp";
import gemstone from "../../assets/gemstone.png";

const Item: React.FC<ItemProps> = ({ brand, id, price, product }) => {
  const images = [
    { condition: product.includes("кольцо"), src: ring },
    { condition: product.includes("серьги"), src: earrings },
    {
      condition: product.includes("ожерелье") || product.includes("колье"),
      src: necklace,
    },
    { condition: product.includes("кулон"), src: pendant },
    { condition: product.includes("браслет"), src: bracelet },
  ];

  const itemImage = images.find((image) => image.condition)?.src || gemstone;

  return (
    <div className={styles.root}>
      <div className={styles.item_container}>
        <img className={styles.item_image} src={itemImage} alt="item" />
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

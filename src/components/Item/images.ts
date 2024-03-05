import ring from "../../assets/ring.png";
import necklace from "../../assets/necklace.png";
import earrings from "../../assets/earrings.png";
import earrings_2 from "../../assets/earrings_2.png";
import pendant from "../../assets/pendant.png";
import bracelet from "../../assets/bracelet.png";
import brooch from "../../assets/brooch.png";
import chain from "../../assets/chain.png";
import set from "../../assets/set.png";
import spoon from "../../assets/spoon.png";

interface Image {
  condition: (product: string) => boolean;
  src: string;
}

const images: Image[] = [
  {
    condition: (product) => product.toLowerCase().includes("комплект"),
    src: set,
  },
  {
    condition: (product) => product.toLowerCase().includes("кольцо"),
    src: ring,
  },
  {
    condition: (product) => product.toLowerCase().includes("серьги"),
    src: earrings,
  },
  {
    condition: (product) => product.toLowerCase().includes("пусеты"),
    src: earrings_2,
  },
  {
    condition: (product) =>
      product.toLowerCase().includes("ожерелье") || product.includes("колье"),
    src: necklace,
  },
  {
    condition: (product) => product.toLowerCase().includes("кулон"),
    src: pendant,
  },
  {
    condition: (product) => product.toLowerCase().includes("браслет"),
    src: bracelet,
  },
  {
    condition: (product) => product.toLowerCase().includes("брошь"),
    src: brooch,
  },
  {
    condition: (product) => product.toLowerCase().includes("ложка"),
    src: spoon,
  },
  {
    condition: (product) =>
      product.toLowerCase().includes("цепочка") ||
      product.toLowerCase().includes("цепь"),
    src: chain,
  },
];

export default images;

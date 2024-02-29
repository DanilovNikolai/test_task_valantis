import { ItemProps } from "../App";

export default function filterUniqueItems(items: ItemProps[]) {
  const uniqueItems: ItemProps[] = [];

  // Перебираем элементы массива
  items.forEach((item) => {
    const isUnique = !uniqueItems.some(
      (uniqueItem) => uniqueItem.id === item.id
    );

    // Если id уникальный, добавляем элемент в массив уникальных элементов
    if (isUnique) {
      uniqueItems.push(item);
    }
  });

  return uniqueItems;
}

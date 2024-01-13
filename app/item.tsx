import React, { useState, useEffect } from "react";
import {
  ClothingItem,
  DisplayedItem,
  displayItem,
  findSimilarItem,
} from "./openai";
import { Product } from "./products";
import Image from "next/image";

interface ItemProps {
  item: ClothingItem;
  placeholder?: boolean;
}

const Item: React.FC<ItemProps> = ({ item, placeholder }) => {
  const [loading, setLoading] = useState(false);
  const [displayedItem, setDisplayedItem] = useState<DisplayedItem | null>(
    null,
  );

  useEffect(() => {
    const fetchItemImage = async () => {
      try {
        const response = await displayItem(item);
        setDisplayedItem(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item image:", error);
      }
    };

    if (placeholder) return;

    setLoading(true);
    fetchItemImage();
  }, [placeholder, item]);

  return (
    <>
      <p>Item: {JSON.stringify(item)}</p>
      {placeholder ? (
        <p>Disabled</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : displayedItem ? (
        <>
          <p>Displayed item: {JSON.stringify(displayedItem)}</p>
          <p>{displayedItem.name}</p>
          <p>{displayedItem.description}</p>
          <Image
            src={displayedItem.imageUrl}
            alt="Displayed item"
            width={256}
            height={256}
          />
          {displayedItem.sponsored && (
            <a href={displayedItem.sponsored.url}>Buy</a>
          )}
        </>
      ) : (
        <p>No similar product found</p>
      )}
    </>
  );
};

export default Item;

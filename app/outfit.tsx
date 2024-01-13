import { useCallback, useEffect, useState } from "react";
import { ClothingItem, Outfit, generateOutfitImage } from "./openai";
import Image from "next/image";

interface OutfitProps {
  mainItem: ClothingItem;
  outfit: Outfit;
  placeholder: boolean;
  onClick?: () => void;
}

function Outfit({ mainItem, outfit, placeholder, onClick }: OutfitProps) {
  const [outfitImageUrl, setOutfitImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getOutfitImage = useCallback(async () => {
    setIsLoading(true);

    try {
      // Call your generateOutfitImage function here
      const image = await generateOutfitImage(mainItem, outfit);
      setOutfitImageUrl(image.url);
    } catch (error) {
      console.error("Error generating outfit image:", error);
    } finally {
      setIsLoading(false);
    }
  }, [mainItem, outfit]);

  useEffect(() => {
    if (!placeholder) getOutfitImage();
  }, [placeholder, getOutfitImage]);

  return (
    <button onClick={onClick} className="border-2 border-black p-2 m-2">
      <p>{outfit.styleName}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : outfitImageUrl ? (
        <Image src={outfitImageUrl} alt="Outfit" width={256} height={256} />
      ) : (
        <p>No outfit image available</p>
      )}
    </button>
  );
}

export default Outfit;

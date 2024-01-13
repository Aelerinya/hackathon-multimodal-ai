/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/tgP5H4gEIoE
 */
import {
  ClothingItem,
  Outfit,
  OutfitResult,
  generateOutfitImage,
} from "@/app/stylist/openai";
import { CardContent, Card } from "@/components/ui/card";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface OutfitProps {
  mainItem: ClothingItem;
  outfit: Outfit;
  placeholder?: boolean;
  onClick: (url: string) => void;
}

function OutfitCard({ outfit, mainItem, placeholder, onClick }: OutfitProps) {
  const [outfitImageUrl, setOutfitImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getOutfitImage = useCallback(async () => {
    setIsLoading(true);

    try {
      console.log("Calling generateOutfitImage");

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
    <Card
      className="cursor-pointer"
      onClick={() => outfitImageUrl && onClick(outfitImageUrl)}
    >
      <CardContent className="p-6 overflow-auto">
        <div className="flex flex-col items-center max-w-52 space-y-4">
          {outfitImageUrl ? (
            <Image
              alt="Outfit"
              className="object-cover w-full aspect-square"
              height={200}
              src={outfitImageUrl}
              width={200}
            />
          ) : (
            <Image
              alt="Placeholder"
              className="object-cover w-full aspect-square"
              height={200}
              src="/placeholder.svg"
              width={200}
            />
          )}
          <h3 className="font-semibold">{outfit.styleName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {outfit.outfitDescription}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface OutfitGridProps {
  outfits: OutfitResult;
  onlyShowOne?: boolean;
  setSelectedOutfit: (index: number, url: string) => void;
}

export function OutfitGrid({
  outfits,
  onlyShowOne,
  setSelectedOutfit,
}: OutfitGridProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-4">Choose Your Style</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4   overflow-auto">
        {outfits.outfits.map((outfit, i) => (
          <OutfitCard
            key={i}
            mainItem={outfits.mainItem}
            outfit={outfit}
            placeholder={onlyShowOne && i !== 0}
            onClick={(url) => setSelectedOutfit(i, url)}
          />
        ))}
      </div>
    </div>
  );
}

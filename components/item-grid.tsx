/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/RoFFqtVkhVf
 */

import { ClothingItem, DisplayedItem, Outfit, displayItem } from "@/app/openai";
import Image from "next/image";
import { JSX, SVGProps, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface ItemCardProps {
  item: ClothingItem;
  placeholder?: boolean;
}

function ItemCard({ item, placeholder }: ItemCardProps) {
  const [loading, setLoading] = useState(false);
  const [displayedItem, setDisplayedItem] = useState<DisplayedItem | null>(
    null,
  );

  useEffect(() => {
    const fetchItemImage = async () => {
      try {
        const response = await displayItem(item);
        setDisplayedItem(response);
        console.log("displayedItem", response);

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
    <div className="relative group grid [grid-template-areas:stack] overflow-hidden rounded-lg">
      {displayedItem ? (
        <Image
          alt="Item Image"
          className="[grid-area:stack] object-cover w-full aspect-[1/1]"
          height={330}
          src={displayedItem.imageUrl}
          width={330}
        />
      ) : (
        <Image
          alt="Placeholder"
          className="[grid-area:stack] object-cover w-full aspect-[1/1]"
          height={330}
          src="/placeholder.svg"
          width={330}
        />
      )}
      <div className="flex-1 [grid-area:stack] bg-black/30 group-hover:opacity-90 transition-opacity text-white p-4 lg:p-8 justify-end flex flex-col gap-2">
        <h3 className="font-semibold tracking-tight">{item.name}</h3>
        {displayedItem?.sponsored && (
          <>
            <p className="font-semibold tracking-tight">$49.99</p>
            <Link
              className="flex items-center gap-2 hover:underline"
              href={displayedItem.sponsored.url}
            >
              <StoreIcon className="h-6 w-6" />
              <span>{displayedItem.sponsored.storeName}</span>
            </Link>
          </>
        )}
        {displayedItem?.mine && (
          <div className="flex items-center gap-2 hover:underline">
            <HomeIcon className="h-6 w-6" />
            <p className="font-semibold tracking-tight">In you wardrobe</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface ItemGridProps {
  outfit: Outfit;
  url: string;
}

export function ItemGrid({ outfit, url }: ItemGridProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-10">
      <div
        key="1"
        className="grid lg:grid-cols-2 gap-6 items-start max-w-6xl px-4 mx-auto py-6"
      >
        <div className="relative group grid [grid-template-areas:stack] overflow-hidden rounded-lg">
          <Image
            alt="Outfit Image"
            className="[grid-area:stack] object-cover w-full aspect-[1/1]"
            height={660}
            src={url}
            width={660}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6 xl:gap-8 items-start">
          {outfit.outfitItems.map((item, i) => (
            <ItemCard key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StoreIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* <path d="m2 7 4.41-4.41A2 2 0 1 7.83 2h8.34a2 1.42.59L22" />
      <path d="M4 12v8a2 2 0 2h12a2 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0-2-2h-2a2 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 1-2 2v0a2.7 2.7 1-1.59-.63.7.7 0-.82 0A2.7 1 16 12a2.7 12 8 4 12v0a2 1-2-2V7" /> */}

      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  );
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

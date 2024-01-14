"use client";

import { useState } from "react";
import { OutfitResult, listOutfits } from "./openai";
import Outfit from "./outfit";
import Item from "./item";
import { SelectPhoto } from "@/components/select-photo";
import { OutfitGrid } from "@/components/outfit-grid";
import { ItemGrid } from "@/components/item-grid";
import Compressor from "compressorjs";

export default function Stylist() {
  const [initialItemImage, setInitialItemImage] = useState<File | null>(null); // TODO: remove
  const [outfits, setOutfits] = useState<OutfitResult | null>(null);
  const onlyShowOne = false;
  const [selectedOutfit, setSelectedOutfit] = useState<{
    index: number;
    url: string;
  } | null>(null);

  async function sendPhoto(file: File /*form: FormData*/) {
    console.log("sendPhoto", file);
    setInitialItemImage(file);
    const compressor = new Compressor(file, {
      quality: 0.5,
      width: 256,
      height: 256,
      async success(result) {
        console.log("compressed", result);
        const formData = new FormData();
        formData.append("photo", result);

        const msg = await listOutfits(formData);
        setOutfits(msg);
        console.log("outfits", msg);
      },
      error(err) {
        console.error(err.message);
      },
    });
  }

  console.log(selectedOutfit);

  return (
    <>
      {/* <h1>My Page</h1>
      <form action={sendPhoto}>
        <input type="file" name="photo" id="photo-id" />
        <br />
        <input
          className="border-2 rounded"
          type="submit"
          name="send"
          value="Send"
        />
      </form> */}

      {!outfits && (
        <SelectPhoto onFileChange={sendPhoto} itemImage={initialItemImage} />
      )}
      {outfits && selectedOutfit === null && (
        <OutfitGrid
          outfits={outfits}
          onlyShowOne={onlyShowOne}
          setSelectedOutfit={(index, url) => setSelectedOutfit({ index, url })}
        />
      )}
      {outfits && selectedOutfit !== null && (
        <ItemGrid
          url={selectedOutfit.url}
          outfit={outfits.outfits[selectedOutfit.index]}
        />
      )}

      {/* {false && outfits && (
        <>
          <h2>Outfits</h2>
          <ul>
            {outfits.outfits.map((outfit, i) => (
              <li key={i}>
                <Outfit
                  mainItem={outfits.mainItem}
                  outfit={outfit}
                  placeholder={onlyShowOne && i !== 0}
                  onClick={() => setSelectedOutfit(i)}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      {false && outfits && selectedOutfit !== null && (
        <>
          <p>Selected outfit: {outfits.outfits[selectedOutfit].styleName}</p>

          {outfits.outfits[selectedOutfit].outfitItems.map((item, i) => (
            <Item key={i} item={item} placeholder={onlyShowOne && i !== 0} />
          ))}
        </>
      )} */}
    </>
  );
}

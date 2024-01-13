"use client";

import { useState } from "react";
import { OutfitResult, listOutfits } from "./openai";
import Outfit from "./outfit";
import Item from "./item";
import { SelectPhoto } from "@/components/select-photo";

export default function Stylist() {
  const [outfits, setOutfits] = useState<OutfitResult | null>(null);
  const onlyShowOne = true;
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null);

  async function sendPhoto(file: File /*form: FormData*/) {
    console.log("sendPhoto", file);
    const formData = new FormData();
    formData.append("photo", file);

    const msg = await listOutfits(formData);
    setOutfits(msg);
    console.log("outfits", msg);
  }

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

      <SelectPhoto onFileChange={sendPhoto} />

      {outfits && (
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

      {outfits && selectedOutfit !== null && (
        <>
          <p>Selected outfit: {outfits.outfits[selectedOutfit].styleName}</p>

          {outfits.outfits[selectedOutfit].outfitItems.map((item, i) => (
            <Item key={i} item={item} placeholder={onlyShowOne && i !== 0} />
          ))}
        </>
      )}
    </>
  );
}

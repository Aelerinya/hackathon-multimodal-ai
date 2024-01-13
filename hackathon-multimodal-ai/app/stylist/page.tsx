"use client";

import { useState } from "react";
import { OutfitResult, listOutfits } from "./openai";
import Outfit from "./outfit";

export default function Stylist() {
  const [outfits, setOutfits] = useState<OutfitResult | null>(null);
  const onlyShowOneOutfit = true;
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null);

  async function sendPhoto(form: FormData) {
    const msg = await listOutfits(form);
    setOutfits(msg);
  }

  return (
    <>
      <h1>My Page</h1>
      <form action={sendPhoto}>
        <input type="file" name="photo" id="photo-id" />
        <br />
        <input
          className="border-2 rounded"
          type="submit"
          name="send"
          value="Send"
        />
      </form>

      {outfits && (
        <>
          <h2>Outfits</h2>
          <ul>
            {outfits.outfits.map((outfit, i) => (
              <li key={i}>
                <Outfit
                  mainItem={outfits.mainItem}
                  outfit={outfit}
                  placeholder={onlyShowOneOutfit && i !== 0}
                  onClick={() => setSelectedOutfit(i)}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      {selectedOutfit !== null && (
        <p>Selected outfit: {outfits?.outfits[selectedOutfit].styleName}</p>
      )}
    </>
  );
}

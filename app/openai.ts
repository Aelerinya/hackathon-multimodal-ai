"use server";

import OpenAI from "openai";
import { products } from "./products";
import {
  fake,
  fakeDescription,
  fakeItem,
  fakeOutfit,
  fakeOutfitUrl,
} from "./fake";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export interface ClothingItem {
  name: string;
  description: string;
}
export interface Outfit {
  styleName: string;
  outfitDescription: string;
  outfitItems: ClothingItem[];
}
export interface OutfitResult {
  mainItem: ClothingItem;
  outfits: Outfit[];
}
const format: OutfitResult = {
  mainItem: { name: "", description: "" },
  outfits: [
    {
      styleName: "",
      outfitDescription: "",
      outfitItems: [{ name: "", description: "" }],
    },
  ],
};

export async function listOutfits(
  form: FormData,
): Promise<OutfitResult | null> {
  console.log(form);

  const photo = form.get("photo");
  if (photo === null || typeof photo === "string") {
    return null;
  }
  const description = fake ? fakeDescription : await describeClothing(photo);
  if (description === null) {
    return null;
  }
  const outfits = fake ? fakeOutfit : await generateOutfits(description);
  return outfits;
}

async function describeClothing(image: File) {
  const b64 = Buffer.from(await image.arrayBuffer()).toString("base64");

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Describe the type of clothing. List properties concisely, not focusing on small details",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${b64}`,
              detail: "low",
            },
          },
        ],
      },
    ],
    model: "gpt-4-vision-preview",
    max_tokens: 200,
  });

  console.log(chatCompletion.choices);

  return chatCompletion.choices[0].message.content;
}

async function generateOutfits(clothingItemDescription: string) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              "Generate exactly four outfits using the following item. Suggest varied styles, like casual, smart casual, professional, if appropriate for the item. List four additional items in the outfit, with detailed properties" +
              JSON.stringify(format),
          },
          {
            type: "text",
            text: clothingItemDescription,
          },
          {
            type: "text",
            text:
              "Format the 4 outfits in JSON array: " + JSON.stringify(format),
          },
        ],
      },
    ],
    // model: "gpt-4-1106-preview",
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
    max_tokens: 1000,
  });

  console.log(chatCompletion.choices);

  if (chatCompletion.choices[0].message.content === null) {
    return null;
  }

  // TODO: parse JSON
  return JSON.parse(chatCompletion.choices[0].message.content);
}

export async function generateOutfitImage(
  mainItem: ClothingItem,
  outfit: Outfit,
) {
  if (fake) {
    return { url: fakeOutfitUrl(outfit.styleName) };
  }

  console.log(mainItem, outfit);

  const itemList = [mainItem, ...outfit.outfitItems];
  const itemsPrompt = itemList
    .map((item) => `${item.name}: ${item.description}`)
    .join("\n");

  const anwser = await openai.images.generate({
    model: "dall-e-3",
    prompt: `photorealistic, model wearing this outfit, white background and only show one person:
    style name: ${outfit.styleName}
    description: ${outfit.outfitDescription}
    items: ${itemsPrompt}`,
    n: 1,
    // size: "512x512",
    size: "1024x1024",
  });
  console.log(anwser);
  return { url: anwser.data[0].url ?? null };
}

export interface DisplayedItem {
  name: string;
  description: string;
  imageUrl: string;
  sponsored: {
    url: string;
    storeName: string;
  } | null;
  mine?: boolean;
}

export async function generateItemImage(item: ClothingItem) {
  const prompt = `photo, clothing item on white background, full view, ${item.name}, ${item.description}`;
  const anwser = await openai.images.generate({
    model: "dall-e-2",
    prompt,
    n: 1,
    size: "512x512",
  });
  console.log(anwser);
  return { url: anwser.data[0].url ?? null };
}

export async function findSimilarItem(item: ClothingItem) {
  const prompt = `Find the product most similar to this item in the provided list.
If an item matches, return json {mostSimilar: number} with the index of the item.
If no item matches, return json {mostSimilar: null}.

name: ${item.name}
description: ${item.description}

list:
${products.map((p, i) => `${i}. ${p.name}: ${p.description}`).join("\n")}
end of list
`;

  console.log(prompt);

  const result = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
    max_tokens: 200,
  });

  console.log(result.choices);
  const choice = result.choices[0].message.content;
  if (choice === null) {
    throw new Error("No choice");
  }
  const { mostSimilar } = JSON.parse(choice);
  if (mostSimilar === null) {
    return null;
  }
  const index = parseInt(mostSimilar);
  const product = products[index];
  return product;
}

export async function displayItem(
  item: ClothingItem,
): Promise<DisplayedItem | null> {
  if (fake) {
    return fakeItem(item.name);
  }

  const similarItem = await findSimilarItem(item);
  if (similarItem !== null) {
    return {
      description: similarItem.description,
      name: similarItem.name,
      imageUrl: similarItem.image,
      sponsored: {
        url: similarItem.url,
        storeName: similarItem.storeName,
      },
    };
  }

  const image = await generateItemImage(item);
  if (image.url !== null) {
    return {
      description: item.description,
      name: item.name,
      imageUrl: image.url,
      sponsored: null,
    };
  }

  return null;
}

"use server";

import OpenAI from "openai";

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

const tmpDescription = `
The clothing item in the image is a denim jacket with the following properties:

- Material: Denim
- Color: Dark blue
- Closure: Button-up front
- Collar: Classic turn-down, sherpa-lined
- Sleeves: Long sleeves with buttoned cuffs
- Pockets: Flap pockets on the chest with button closures
- Fit: Standard, non-stretch
- Additional: It includes badges or pins on one of the pockets.
`;

export async function listOutfits(
  form: FormData,
): Promise<OutfitResult | null> {
  console.log(form);

  const photo = form.get("photo");
  if (photo === null || typeof photo === "string") {
    return null;
  }
  //   const description = await describeClothing(photo);
  const description = tmpDescription;
  console.log(description);
  //   const outfits = await generateOutfits(description);
  const outfits = tmpOutfit;
  return outfits;
}

// async function displayOutfit(mainItem: ClothingItem, outfit: Outfit) {
//   const outfitImage = await generateOutfitImage(mainItem, outfit);
//   return outfitImage;
// }

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
    max_tokens: 500,
  });

  console.log(chatCompletion.choices);

  return chatCompletion.choices[0].message.content;
}

const tmpOutfit = {
  mainItem: {
    name: "Denim jacket",
    description:
      "Dark blue button-up denim jacket with sherpa-lined collar and chest pockets with badges or pins.",
  },
  outfits: [
    {
      styleName: "Casual",
      outfitDescription:
        "Perfect for a weekend outing or a casual day at work.",
      outfitItems: [
        {
          name: "White graphic t-shirt",
          description: "Cotton t-shirt with a fun print or slogan.",
        },
        {
          name: "Black skinny jeans",
          description: "Stretchy, high-rise jeans in a classic black color.",
        },
        {
          name: "White sneakers",
          description: "Canvas sneakers with rubber sole and lace-up closure.",
        },
        {
          name: "Beanie hat",
          description: "Warm, knitted beanie hat in a neutral color.",
        },
      ],
    },
    {
      styleName: "Smart casual",
      outfitDescription:
        "Suitable for a casual office setting or a dressy day out.",
      outfitItems: [
        {
          name: "Striped button-up shirt",
          description:
            "Cotton long sleeve shirt with vertical stripes in light blue and white.",
        },
        {
          name: "Khaki chinos",
          description: "Slim-fit, cotton trousers in a versatile khaki color.",
        },
        {
          name: "Brown leather loafers",
          description:
            "Genuine leather slip-on shoes with a low heel and decorative tassel detail.",
        },
        {
          name: "Aviator sunglasses",
          description:
            "Classic aviator sunglasses with tinted lenses and metal frame.",
        },
      ],
    },
    {
      styleName: "Edgy",
      outfitDescription: "For a bold and fashionable statement.",
      outfitItems: [
        {
          name: "Band t-shirt",
          description: "Cotton t-shirt with a vintage band design or logo.",
        },
        {
          name: "Ripped black skinny jeans",
          description:
            "Distressed, black denim pants with frayed edges and multiple rips.",
        },
        {
          name: "Motorcycle boots",
          description:
            "Black leather boots with buckle straps and chunky sole.",
        },
        {
          name: "Studded belt",
          description: "Leather belt with metal studs and buckle closure.",
        },
      ],
    },
    {
      styleName: "Layered professional",
      outfitDescription: "Great for a creative or casual work environment.",
      outfitItems: [
        {
          name: "Black turtleneck sweater",
          description: "Ribbed knit turtleneck in a soft and stretchy fabric.",
        },
        {
          name: "Tailored trousers",
          description:
            "Straight-leg, ankle-length pants in a neutral color like gray or navy.",
        },
        {
          name: "Suede Chelsea boots",
          description:
            "Suede ankle boots with elastic side panels and low stacked heel.",
        },
        {
          name: "Crossbody messenger bag",
          description:
            "Leather messenger bag with multiple compartments and adjustable shoulder strap.",
        },
      ],
    },
  ],
};

export async function generateOutfitImage(
  mainItem: ClothingItem,
  outfit: Outfit,
) {
  return {
    url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-rT3nzH1locg9KICHE1ddIkJ3/user-zAZQ74r07VDfWalPKTFuH1hI/img-YkARtoacjGKY49YT2Ni84itb.png?st=2024-01-13T13%3A45%3A32Z&se=2024-01-13T15%3A45%3A32Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-13T02%3A21%3A39Z&ske=2024-01-14T02%3A21%3A39Z&sks=b&skv=2021-08-06&sig=UrzAYVVgDdGZRXrC7FKBf0xelBFMVCxCxX2UowY8zv8%3D",
  };

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

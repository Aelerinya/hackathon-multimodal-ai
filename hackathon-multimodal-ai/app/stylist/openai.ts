"use server";

import OpenAI, { toFile } from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function receivePhoto(form: FormData) {
  console.log(form);

  const photo = form.get("photo");
  if (photo === null || typeof photo === "string") {
    return "null";
  }
  const b64 = Buffer.from(await photo.arrayBuffer()).toString("base64");
  //   console.log(b64.slice(0, 50));

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Describe the image",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${b64}`,
              detail: "low"
            },
          },
        ],
      },
    ],
    model: "gpt-4-vision-preview",
    max_tokens: 200
  });

  console.log(chatCompletion.choices);

  return chatCompletion.choices[0].message.content;
}

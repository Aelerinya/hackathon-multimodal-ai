"use client";

import { useState } from "react";
import {  receivePhoto } from "./openai";

export default function Stylist({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [reply, setReply] = useState<string | null>(null);

  async function sendPhoto(form: FormData) {
    const msg = await receivePhoto(form);
    setReply(msg);
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
      <p>Reply: {reply}</p>
    </>
  );
}

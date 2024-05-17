'use client';

import { MouseEvent } from "react";

export default function Grammar() {
  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    try {
      const data = await fetch('http://localhost:3000/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      })
        .then(response => response.json());
      console.log(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <input
      type="text"
      className="border px-2 py-1"
      placeholder="sentence" />
      <button
        type="button"
        onClick={(event) => handleSubmit(event)}
        className="border px-2 py-1"
      >Grammar Correction</button>
    </>
  );
}

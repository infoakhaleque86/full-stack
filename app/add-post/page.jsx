"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/add-post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setTitle("");
    setContent("");
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-4 bg-black font-bold">
      <Link href={"/"}>View Feed</Link>
      <h1>Add Post</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border rounded shadow"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

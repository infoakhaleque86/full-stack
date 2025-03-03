"use client";
import { useRouter } from "next/navigation";

export default function DeletePostButton({ postId }) {
  const router = useRouter();

  async function handleClick() {
    try {
      await fetch(`/api/post/${postId}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button
      className="bg-red-600 px-3 py-1 mt-2 rounded-sm"
      onClick={handleClick}
    >
      Delete Post
    </button>
  );
}

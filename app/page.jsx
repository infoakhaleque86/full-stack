import Link from "next/link";
import prisma from "../lib/prisma";
import Post from "./components/Post";

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-4 bg-black">
      <Link href={"./add-post"}>Add Post</Link>
      <p className="text-2xl">Feed from Server</p>
      <div className="flex justify-center items-center gap-4 w-full">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            authorName={post.author.name}
          />
        ))}
      </div>
    </main>
  );
}

import PostCard from "../../components/social/PostCard";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { getPosts } from "../../services/postService";

const Home = () => {
  const [posts, setPosts] = useState([]);

const loadPosts = async () => {
  try {
    const data = await getPosts();
    setPosts(data);
  } catch (err) {
    console.error("Failed to load posts", err);
  }
};

useEffect(() => {
  loadPosts();
}, []);



  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="p-6 border-b-2">
          <div className="flex items-end gap-3">
            <h1 className="vintage-font text-5xl tracking-[0.2em] uppercase text-black [text-shadow:1px_1px_0_#ffffff,2px_2px_0_rgba(0,0,0,0.25)]">
              Bookies
            </h1>

            <span className="mb-2 px-2 py-1 text-[10px] font-bold border-2 border-black rounded-full bg-white">
              BETA
            </span>
          </div>

          <p className="ml-2 mt-2 text-xs tracking-[0.25em] uppercase opacity-70 font-semibold">
            Read • Share • Exchange
          </p>
        </div>

        <div className="p-6 flex-1 flex flex-col gap-6 items-center overflow-y-auto">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;

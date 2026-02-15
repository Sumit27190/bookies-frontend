import { useEffect, useState } from "react";
import TopSearchBar from "../../components/navigation/TopSearchBar";
import DashboardLayout from "../../layouts/DashboardLayout";
import BookGrid from "../../components/books/BookGrid";
import { getPosts } from "../../services/postService";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Fiction",
    "Self-Help",
    "Fantasy",
    "Academic",
    "Programming",
    "Manga",
  ];

  // load posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data || []);
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    };

    loadPosts();
  }, []);

  // filtering logic
  const filteredPosts = posts.filter((post) => {
    const caption = post.caption?.toLowerCase() || "";
    const category = post.category || "All";

    const matchesSearch = caption.includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        {/* Search Bar */}
        <TopSearchBar search={search} setSearch={setSearch} />

        {/* Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          
          {/* Category Filters */}
          <div className="p-4 border-b-2 border-black/70 bg-[#F5EAD7]">
            <div className="flex gap-3 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-semibold border-2 border-black rounded-full transition
                    ${
                      activeCategory === cat
                        ? "bg-[#FFD9A0]"
                        : "bg-[#FFF7E6] hover:bg-[#FFD9A0]/60"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Book Grid */}
          <div className="p-6">
            <BookGrid books={filteredPosts} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Explore;

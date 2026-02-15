import { useState } from "react";
import { createPost } from "../../services/postService";

const CreatePost = ({ onPostCreated }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [exchangeAvailable, setExchangeAvailable] = useState(false);
  const [category, setCategory] = useState("All");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPost({
        caption,
        image,
        exchangeAvailable,
        category,
      });

      // clear form
      setCaption("");
      setImage("");
      setExchangeAvailable(false);
      setCategory("Fiction");

      // refresh feed
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#FFF7E6] border-2 border-black rounded-2xl p-4"
    >
      <h3 className="font-bold mb-3 text-black">Create Post</h3>

      {/* Image URL */}
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full border-2 border-black rounded-xl p-2 mb-3 bg-white"
      />

      {/* Caption */}
      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border-2 border-black rounded-xl p-2 mb-3 bg-white"
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border-2 border-black rounded-xl p-2 mb-3"
      >
        <option>Fiction</option>
        <option>Self-Help</option>
        <option>Fantasy</option>
        <option>Academic</option>
        <option>Programming</option>
        <option>Manga</option>
      </select>

      {/* Exchange toggle */}
      <label className="flex items-center gap-2 mb-3 text-sm text-black">
        <input
          type="checkbox"
          checked={exchangeAvailable}
          onChange={(e) => setExchangeAvailable(e.target.checked)}
        />
        Available for exchange
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-orange-400 border-2 border-black rounded-xl p-2 font-bold text-black hover:bg-orange-500 transition"
      >
        Post
      </button>
    </form>
  );
};

export default CreatePost;

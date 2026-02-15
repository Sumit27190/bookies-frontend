import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { useContext, useState } from "react";
import { toggleLike, deletePost } from "../../services/postService";
import { requestExchange } from "../../services/exchangeService";
import { AuthContext } from "../../context/AuthContext";
import CommentSection from "./CommentSection";

/* ---------- Time helper ---------- */
const timeAgo = (date) => {
  if (!date) return "Just now";

  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "min", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

/* ---------- Component ---------- */
const PostCard = ({ post, onDelete }) => {
  const { user } = useContext(AuthContext);

  // safety guard
  if (!post || !user) return null;

  const isOwner = post.user?._id === user.id || post.user?._id === user._id;

  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(
    post.likes?.includes(user.id) || post.likes?.includes(user._id) || false,
  );

  const [animate, setAnimate] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [requested, setRequested] = useState(
  post.requestedByUser || false
);


  /* ---------- Like ---------- */
  const handleLike = async () => {
    try {
      const res = await toggleLike(post._id);
      setLikes(res.likes);
      setLiked(res.liked);

      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  /* ---------- Exchange ---------- */
  const handleExchangeRequest = async () => {
    try {
      await requestExchange(post._id);
      setRequested(true);
    } catch (err) {
      console.error(
  err.response?.data?.message || "Exchange request failed"
);

    }
  };

  /* ---------- Delete ---------- */
  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await deletePost(post._id);
      if (onDelete) onDelete(post._id);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="w-full max-w-xl border-2 border-black bg-[#FFF7E6] rounded-2xl p-4">
      {/* ---------- Header ---------- */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl border-2 border-black overflow-hidden bg-[#FFD9A0] flex items-center justify-center font-bold">
          {post.user?.avatar ? (
            <img
              src={post.user.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            post.user?.name?.charAt(0) || "U"
          )}
        </div>

        <div className="flex-1">
          <p className="font-bold text-sm">{post.user?.name || "Unknown"}</p>
          <p className="text-xs opacity-70">{timeAgo(post.createdAt)}</p>
        </div>

        {isOwner && (
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-xs font-semibold text-white bg-red-500 border-2 border-black rounded-xl hover:bg-red-400 transition"
          >
            Delete
          </button>
        )}
      </div>

      {/* ---------- Image + Actions ---------- */}
      <div className="mt-4 flex gap-3">
        <div className="relative flex-1 border-2 border-black rounded-2xl overflow-hidden bg-[#F3DFC8]">
          {post.exchangeAvailable && (
            <span className="absolute top-3 left-3 px-3 py-1 text-[11px] rounded-full bg-[#FFF7E6]/80 border border-black/20">
              Exchange Available
            </span>
          )}

          {animate && (
            <Heart
              size={80}
              className="absolute inset-0 m-auto text-red-500 opacity-80 animate-ping pointer-events-none"
            />
          )}

          <img
            src={post.image}
            alt="Post"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* ---------- Side Actions ---------- */}
        <div className="w-14 flex flex-col items-center justify-center gap-8">
          {/* Like */}
          <button
            onClick={handleLike}
            className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition
              ${liked ? "bg-red-200" : "bg-[#FFF7E6] hover:bg-red-100"}`}
          >
            <Heart
              size={22}
              className={`${liked ? "fill-red-500 text-red-500" : "text-black"} 
                transition-transform ${animate ? "scale-125" : ""}`}
            />
            <span className="text-[10px] font-bold">{likes}</span>
          </button>

          {/* Comment */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="w-12 h-12 rounded-2xl bg-[#FFF7E6] hover:bg-orange-100 flex flex-col items-center justify-center"
          >
            <MessageCircle size={22} />
            <span className="text-[10px] font-bold">
              {post.comments?.length || 0}
            </span>
          </button>

          {/* Bookmark */}
          <button className="w-12 h-12 rounded-2xl bg-[#FFF7E6] hover:bg-orange-100 flex items-center justify-center">
            <Bookmark size={22} />
          </button>
        </div>
      </div>

      {/* ---------- Caption ---------- */}
      <p className="mt-4 text-sm leading-relaxed text-[#3A2E2A]">
        {post.caption}
      </p>

      {/* ---------- Exchange Button ---------- */}
      {post.exchangeAvailable && !isOwner && !requested && (

        <div className="mt-3">
          <button
            onClick={handleExchangeRequest}
            disabled={requested}
            className={`w-full border-2 border-black rounded-xl py-2 font-semibold transition
              ${
                requested
                  ? "bg-gray-300 text-black/60 cursor-not-allowed"
                  : "bg-orange-400 hover:bg-orange-300"
              }`}
          >
            {requested ? "Request Sent" : "Request Exchange"}
          </button>
        </div>
      )}

      {/* ---------- Comments ---------- */}
      {showComments && <CommentSection postId={post._id} />}
    </div>
  );
};

export default PostCard;

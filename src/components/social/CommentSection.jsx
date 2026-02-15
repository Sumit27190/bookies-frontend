import { useEffect, useState } from "react";
import { getComments, addComment } from "../../services/commentService";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const data = await getComments(postId);
    setComments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment = await addComment(postId, text);
    setComments([newComment, ...comments]);
    setText("");
  };

  return (
    <div className="mt-4 border-t pt-3">
      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border-2 border-black rounded-xl px-3 py-2 text-sm"
        />
        <button className="px-4 bg-orange-400 border-2 border-black rounded-xl font-bold">
          Send
        </button>
      </form>

      {/* Comments */}
      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
        {comments.map((c) => (
          <div
            key={c._id}
            className="bg-[#FFF7E6] border border-black/20 rounded-xl px-3 py-2 text-sm"
          >
            <span className="font-semibold">{c.user.name}:</span>{" "}
            {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;

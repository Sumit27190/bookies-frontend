import { useNavigate } from "react-router-dom";

const ProfileHeader = ({ user, posts = [] }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="border-b-2 border-black p-6 bg-[#F5EAD7]">
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-2xl border-2 border-black overflow-hidden bg-[#FFD9A0] flex items-center justify-center text-2xl font-bold">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            user.name?.charAt(0) || "U"
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-xl font-bold">{user.name || "Unknown"}</h2>

          <p className="text-sm text-black/60">
            {user.bio || "Book lover on Bookies"}
          </p>

          {/* Stats */}
          <div className="flex gap-6 mt-3 text-sm font-semibold">
            <span>{posts.length} Posts</span>
            
          </div>
        </div>

        {/* Edit button */}
        <button
          onClick={() => navigate("/profile/edit")}
          className="px-4 py-2 bg-orange-400 border-2 border-black rounded-xl font-semibold hover:bg-orange-300"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;

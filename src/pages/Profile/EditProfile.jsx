import { useContext, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = await updateProfile({
        name,
        bio,
        avatar,
      });

      // update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // update context
      setUser(updatedUser);

      navigate("/profile");
    } catch (err) {
      console.error("Profile update failed", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#FFF7E6] border-2 border-black rounded-2xl p-6 space-y-4"
        >
          {/* Avatar */}
          <input
            type="text"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full border-2 border-black rounded-xl p-2"
          />

          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-black rounded-xl p-2"
          />

          {/* Bio */}
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border-2 border-black rounded-xl p-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-400 border-2 border-black rounded-xl p-2 font-bold hover:bg-orange-300 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditProfile;

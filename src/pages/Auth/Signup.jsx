import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users/register", form);

      login(res.data);   // store token + user
      navigate("/");     // redirect to home
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EAD7]">
      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-black rounded-2xl p-8 w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border-2 border-black rounded-xl p-2 mb-4"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border-2 border-black rounded-xl p-2 mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border-2 border-black rounded-xl p-2 mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-400 border-2 border-black rounded-xl p-2 font-bold"
        >
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="font-bold underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

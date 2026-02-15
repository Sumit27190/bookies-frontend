import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

const Login = () => {
  const [form, setForm] = useState({
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
  console.log("Login clicked", form);

  try {
    const res = await api.post("/users/login", form);
    console.log("Response:", res.data);

    login(res.data);
    navigate("/");
  } catch (err) {
    console.error("Login error:", err);
    alert("Invalid email or password");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EAD7]">
      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-black rounded-2xl p-8 w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-bold underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

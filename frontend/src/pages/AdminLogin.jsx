import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await API.post("/api/admin/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin-dashboard");
    } catch (error) {
      setMsg("❌ Invalid login details");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white px-6">
      <form
        onSubmit={login}
        className="bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-purple-400">
          Admin Login
        </h1>

        <input
          className="w-full mt-5 p-3 rounded-lg bg-black/40 text-white outline-none"
          placeholder="Admin Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          className="w-full mt-4 p-3 rounded-lg bg-black/40 text-white outline-none"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button className="w-full mt-5 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-bold">
          Login
        </button>

        {msg && <p className="text-center mt-4 text-red-400">{msg}</p>}
      </form>
    </div>
  );
}

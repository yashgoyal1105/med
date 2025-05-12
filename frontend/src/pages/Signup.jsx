import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(formData);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-50 to-green-100">
      <motion.form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Signup</h2>
        <div className="space-y-4">
          <input
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Signup
        </button>
        <p className="mt-5 text-center">Registered? <a href="/">Login</a></p>
      </motion.form>
    </div>
  );
};

export default Signup;
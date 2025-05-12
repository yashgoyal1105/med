import { useState } from "react";
import { searchHospitals } from "../api/hospitalApi";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [specialization, setSpecialization] = useState("");
  const [radius, setRadius] = useState("");
  const [hospitals, setHospitals] = useState([]);

  const fetchHospitals = async () => {
    const token = localStorage.getItem("token");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const { data } = await searchHospitals(specialization, latitude, longitude, radius, token);
      setHospitals(data);
    });
  };

  return (
    <div className="bg-gradient-to-r from-lime-50 to-lime-100 min-h-screen">
      <div className="p-8">
        <div className="flex gap-10">
        <h1 className="text-6xl font-bold text-green-700 mb-6">Medical Care System</h1>
        <Link className="h-fit bg-red-200 rounded-md p-4 hover:bg-red-400 transitional-all duration-300" to="/" onClick={() => localStorage.clear()}>Logout</Link>
        </div>
        <div className="flex space-x-4 mb-8">
          <input
            className="w-1/3 p-3 border border-black-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Specialization"
            onChange={(e) => setSpecialization(e.target.value)}
          />
          <input
            className="w-1/3 p-3 border border-black-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Radius (in meters)"
            type="number"
            onChange={(e) => setRadius(e.target.value)}
          />
          <button
            className="w-1/3 bg-green-600 text-white py-3 rounded-lg hover:bg-green-800 hover:animate-bounce transition duration-300"
            onClick={fetchHospitals}
          >
            Search
          </button>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {hospitals.map((hospital, index) => (
            <div
              key={index}
              className="bg-green-400 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold text-green-800">{hospital.name}</h2>
              <p className="text-green-200 mt-2">{hospital.specialization}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
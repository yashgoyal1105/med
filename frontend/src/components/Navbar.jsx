import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-2xl font-bold">🏥 Hospital Finder</h1>
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/" onClick={() => localStorage.clear()}>Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;

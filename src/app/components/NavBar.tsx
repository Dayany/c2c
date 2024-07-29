const Navbar = ({ username }) => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg">{username}</div>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-white hover:underline">
          Home
        </a>
        <input
          type="text"
          className="px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          placeholder="Search..."
        />
      </div>
    </nav>
  );
};

export default Navbar;

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-800">LOGO</div>
      
      {/* Search */}
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Button 1</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Button 2</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Button 3</button>
      </div>
    </nav>
  );
}
import { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "Product Name",
    description: "Product Desc",
    price: "Rp. ?",
    image: "/products/placeholder.jpg",
    brand: "CLOVIO",
    type: "T-Shirt",
    size: ["S", "M", "L", "XL"]
  },
];

const Catalog = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeSubFilter, setActiveSubFilter] = useState(null);
  const [filters, setFilters] = useState({
    price: [],
    brand: [],
    type: []
  });

  const filterCategories = ['type', 'price', 'brand'];

  const filterOptions = {
    price: [
      { label: "Under Rp 200.000", value: "0-200000" },
      { label: "Rp 200.000 - Rp 500.000", value: "200000-500000" },
      { label: "Rp 500.000 - Rp 1.000.000", value: "500000-1000000" },
      { label: "Above Rp 1.000.000", value: "1000000-above" }
    ],
    brand: ["CLOVIO", "Essential Wear", "Street Culture", "Urban Style", "Comfort Plus", "Daily Basics"],
    type: ["T-Shirt", "Hoodie", "Jacket", "Vest"]
  };

  const handleFilterClick = (category) => {
    setActiveSubFilter(null);
    setActiveFilter(activeFilter === category ? null : category);
  };

  const handleSubFilterClick = (subFilter) => {
    setActiveSubFilter(activeSubFilter === subFilter ? null : subFilter);
  };

  return (
    <div className="container mx-auto px-24" style={{ minHeight: 'calc(100vh - 200px)' }}>
      <div className="flex items-start gap-8 py-8">
        {/* Filter Button */}
        <div className="w-64 relative">
          <button 
            onClick={() => setActiveFilter(activeFilter ? null : 'main')}
            className="w-full flex items-center justify-between text-[#FFF8E8] bg-[#151523] px-4 py-2 rounded-lg"
          >
            <span className="text-sm font-bold">Filter</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className={`w-4 h-4 transition-transform duration-200 ${
                activeFilter ? 'rotate-180' : ''
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* Main Filter Dropdown */}
          {activeFilter === 'main' && (
            <div className="absolute w-full mt-2 text-[#FFF8E8] bg-[#151523] rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="p-2">
                {filterCategories.map(category => (
                  <div key={category} className="relative">
                    <button
                      onClick={() => handleSubFilterClick(category)}
                      className="w-full flex items-center justify-between p-2 rounded text-sm"
                    >
                      <span className="capitalize">{category}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeSubFilter === category ? 'rotate-180' : ''
                        }`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    {/* Sub Filter Options */}
                    {activeSubFilter === category && (
                      <div className="pl-4 py-2 space-y-1">
                        {category === 'price' ? (
                          filterOptions[category].map((option) => (
                            <label 
                              key={option.value}
                              className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded group"
                            >
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={filters[category].includes(option.value)}
                                  onChange={() => handleFilterChange(category, option.value)}
                                  className="w-3 h-3 rounded border border-gray-300 bg-transparent appearance-none checked:bg-blue-600 checked:border-blue-600"
                                />
                                {filters[category].includes(option.value) && (
                                  <svg
                                    className="absolute w-2 h-2 pointer-events-none top-0.5 left-0.5 text-blue-600"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                  >
                                    <path
                                      d="M2.5 6l2.5 2.5L9.5 4"
                                      stroke="white"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span className="text-[#FFF8E8]">{option.label}</span>
                            </label>
                          ))
                        ) : (
                          filterOptions[category].map((option) => (
                            <label 
                              key={option}
                              className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded group"
                            >
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={filters[category].includes(option)}
                                  onChange={() => handleFilterChange(category, option)}
                                  className="w-3 h-3 rounded border border-gray-300 bg-transparent appearance-none checked:bg-blue-600 checked:border-blue-600"
                                />
                                {filters[category].includes(option) && (
                                  <svg
                                    className="absolute w-2 h-2 pointer-events-none top-0.5 left-0.5 text-blue-600"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                  >
                                    <path
                                      d="M2.5 6l2.5 2.5L9.5 4"
                                      stroke="white"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span className="text-[#FFF8E8]">{option}</span>
                            </label>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">CATALOG NAME!</h1>
          
          {/* Products Grid */}
          <div className="grid grid-cols-4 gap-8">
            {products.map(product => (
              <Link 
                to={`/Product/${product.id}`}  // Changed from "/Product" to dynamic route
                key={product.id}
                className="flex flex-col items-center"
                state={{ product }}  // Pass product data via state
              >
                <div className="w-full aspect-square bg-gray-200 rounded-lg mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="text-center space-y-0.5">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-xs text-gray-600">{product.description}</p>
                  <p className="text-sm font-medium">Rp. {product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;

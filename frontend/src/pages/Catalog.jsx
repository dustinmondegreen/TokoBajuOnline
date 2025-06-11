import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeSubFilter, setActiveSubFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({ type: [], price: [] });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeParam = queryParams.get('type');
  const searchParam = queryParams.get('search');

  const filterCategories = ['type', 'price'];

  const filterOptions = {
    price: [
      { label: "Under Rp 200.000", value: "0-200000" },
      { label: "Rp 200.000 - Rp 500.000", value: "200000-500000" },
      { label: "Rp 500.000 - Rp 1.000.000", value: "500000-1000000" },
      { label: "Above Rp 1.000.000", value: "1000000-above" }
    ],
    type: ["T-Shirt", "Hoodie", "Jacket", "Vest"]
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      const mappedProducts = response.data.data.map(product => ({
        id: product.product_id,
        image: `http://localhost:8000${product.image}`,
        name: product.product_name,
        color: product.color,
        material: product.material,
        quantity: product.quantity,
        category: product.category,
        price: Number(product.price).toLocaleString('id-ID', { minimumFractionDigits: 0 }),
        priceRaw: Number(product.price),
        rating: 4.8,
        reviews: 200,
      }));
      setProducts(mappedProducts);

      // Set default filter from URL param after products loaded
      if (typeParam && filterOptions.type.includes(typeParam)) {
        setSelectedFilters(prev => ({
          ...prev,
          type: [typeParam]
        }));
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleCheckboxChange = (category, option) => {
    const currentSelected = selectedFilters[category] || [];
    let updatedSelected = [];

    if (currentSelected.includes(option)) {
      updatedSelected = currentSelected.filter(item => item !== option);
    } else {
      updatedSelected = [...currentSelected, option];
    }

    setSelectedFilters({
      ...selectedFilters,
      [category]: updatedSelected
    });
  };

  const handleFilterClick = (category) => {
    setActiveSubFilter(null);
    setActiveFilter(activeFilter === category ? null : category);
  };

  const handleSubFilterClick = (subFilter) => {
    setActiveSubFilter(activeSubFilter === subFilter ? null : subFilter);
  };

  useEffect(() => {
    if (products.length > 0) {
      filterProducts();
    }
  }, [selectedFilters, products, searchParam]);

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchParam) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchParam.toLowerCase())
      );
    }

    if (selectedFilters.type.length > 0) {
      filtered = filtered.filter(product => selectedFilters.type.includes(product.category));
    }

    if (selectedFilters.price.length > 0) {
      filtered = filtered.filter(product => {
        return selectedFilters.price.some(range => {
          const price = product.priceRaw;
          if (!price) return false;
          if (range === "0-200000") return price < 200000;
          if (range === "200000-500000") return price >= 200000 && price <= 500000;
          if (range === "500000-1000000") return price > 500000 && price <= 1000000;
          if (range === "1000000-above") return price > 1000000;
          return false;
        });
      });
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto px-24" style={{ minHeight: 'calc(100vh - 200px)' }}>
      <div className="flex items-start gap-8 py-8">
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
              className={`w-4 h-4 transition-transform duration-200 ${activeFilter ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

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
                        className={`w-4 h-4 transition-transform duration-200 ${activeSubFilter === category ? 'rotate-180' : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    {activeSubFilter === category && (
                      <div className="pl-4 py-2 space-y-1">
                        {filterOptions[category].map((option) => (
                          <label 
                            key={option.value || option}
                            className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded group"
                          >
                            <input
                              type="checkbox"
                              className="w-3 h-3 rounded border border-gray-300 bg-transparent appearance-none checked:bg-blue-600 checked:border-blue-600"
                              checked={selectedFilters[category]?.includes(option.value || option)}
                              onChange={() => handleCheckboxChange(category, option.value || option)}
                            />
                            <span className="text-[#FFF8E8]">{option.label || option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Catalog</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to="/product"
                state={{ productData: product }}
                className="flex flex-col items-center"
              >
                <div className="w-full aspect-square bg-gray-200 rounded-lg mb-3 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-xs text-gray-600">{product.category}</p>
                  <p className="text-sm font-semibold text-gray-900">Rp {product.price}</p>
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

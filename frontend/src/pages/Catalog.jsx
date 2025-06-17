import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [activeSubFilter, setActiveSubFilter] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({ type: [], price: [], color: [] });

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
        type: ["Shirt", "Hoodie", "Jacket", "Shorts", "Hat"],
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

    const handleFilterClick = () => {
        setActiveFilter(activeFilter ? null : 'main');
        setActiveSubFilter(null);
    };

    const handleSubFilterClick = (category) => {
        setActiveSubFilter(activeSubFilter === category ? null : category);
    };

    useEffect(() => {
        if (products.length > 0) {
            filterProducts();
        }
    }, [selectedFilters, products, searchParam]);

    const filterProducts = () => {
        let filtered = [...products];

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

        if (selectedFilters.color.length > 0) {
            filtered = filtered.filter(product => selectedFilters.color.includes(product.color));
        }

        setFilteredProducts(filtered);
    };

    return (
        <section className="bg-white py-16 pb-32">
            <div className="container mx-auto px-4 mt-8">

                <div className="flex flex-col lg:flex-row items-start lg:gap-8 max-w-7xl mx-auto">
                    <div className="w-full lg:w-64 relative mb-8 lg:mb-0">
                        <button
                            onClick={handleFilterClick}
                            className="w-full flex items-center justify-between text-[#FFF8E8] bg-[#151523] px-4 py-3 rounded-lg text-lg font-bold"
                        >
                            <span>Filter Products</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className={`w-5 h-5 transition-transform duration-200 ${activeFilter === 'main' ? 'rotate-180' : ''}`}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        {activeFilter === 'main' && (
                            <div className="lg:absolute lg:w-full mt-2 text-[#FFF8E8] bg-[#151523] rounded-lg shadow-xl border border-gray-700 z-20">
                                <div className="p-4">
                                    {filterCategories.map(category => (
                                        <div key={category} className="relative mb-3 last:mb-0">
                                            <button
                                                onClick={() => handleSubFilterClick(category)}
                                                className="w-full flex items-center justify-between p-3 rounded hover:bg-gray-700 transition-colors duration-200 text-base"
                                            >
                                                <span className="capitalize font-semibold">{category}</span>
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
                                                <div className="pl-6 py-2 space-y-2 bg-gray-800 rounded-b-lg">
                                                    {filterOptions[category].map((option) => (
                                                        <label
                                                            key={option.value || option}
                                                            className="flex items-center gap-3 text-sm cursor-pointer p-1 rounded hover:bg-gray-700 group transition-colors duration-200"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                className="w-4 h-4 rounded border border-gray-500 bg-transparent appearance-none checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
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

                    <div className="flex-1 w-full">
                        {filteredProducts.length === 0 && (
                            <div className="text-center text-gray-600 text-lg mt-16">
                                No products found matching your filters.
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    to="/product"
                                    state={{ productData: product }}
                                    className="group relative overflow-hidden rounded-xl bg-gray-900 shadow-lg block transform transition-transform duration-300 hover:scale-[1.02]"
                                >
                                    <div className="relative overflow-hidden w-full h-80 lg:h-72">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-4 bg-white">
                                        <h3 className="text-black text-lg font-bold mb-1 line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                            {product.category}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-black text-lg font-bold">
                                                Rp {product.price}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Catalog;
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";    
import { useEffect, useState } from "react";
import axios from "axios";

const Hero = () => {

    
////
    const images = [
        "/Hero1.jpg",
        "/Hero2.jpg",   
        "/Hero4.jpg",
        "/Hero3.jpg",
    ];
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    
    const brand = [
        { image: "/icons8-t-shirt-50.png", link: "/Catalog" },
        { image: "/icons8-hoodie-50.png", link: "/Catalog" },
        { image: "/icons8-jacket-50.png", link: "/Catalog" },
        { image: "/icons8-vest-50.png", link: "/Catalog" },
    ];
    
    
    const brandImage = [
        { image: "/Frame 27.png", link: "/catalog/adidas" },
        { image: "/Frame 28.png", link: "/catalog/nike" },
    ];
    
    const [bestSeller, setBestSeller] = useState([]); // Awalnya kosong

    useEffect(() => {
        fetchBestSeller();
    }, []);

    const fetchBestSeller = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            const mappedProducts = response.data.data.map(product => ({
                id : product.product_id,
                image: `http://localhost:8000${product.image}`,
                link: "/product", // Link tetap sama
                name: product.product_name,
                color: product.color,
                material: product.material,
                quantity: product.quantity,
                category: product.category ,
                price:Number(product.price).toLocaleString('id-ID', { minimumFractionDigits: 0 }),
                rating: 4.8, // Dummy rating
                reviews: 200  // Dummy reviews
            }));
            setBestSeller(mappedProducts);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };
    
    const sportTrend = [
        {
            id: 1,
            name: "Running",
            description: "High-performance running gear",
            itemCount: "124 Items",
            image: "/running.jpg",
            link: "/category/running",
            color: "from-blue-200/20"
        },
        {
            id: 2,
            name: "Training",
            description: "Gym & workout essentials",
            itemCount: "96 Items",
            image: "training.jpg",
            link: "/category/training",
            color: "from-red-200/20"
        },
        {
            id: 3,
            name: "Basketball",
            description: "Court-ready apparel",
            itemCount: "78 Items",
            image: "/basketball.jpg",
            link: "/category/basketball",
            color: "from-orange-200/20"
        },
        {
            id: 4,
            name: "Lifestyle",
            description: "Casual sport fashion",
            itemCount: "156 Items",
            image: "/lifestyle.jpg",
            link: "/category/lifestyle",
            color: "from-blue-300/20"
        }
    ];

    const limitedEditions = [
        {
            id: 1,
            name: "Sport X Collection",
            price: "3.499.000",
            description: "Exclusive Sport Collection",
            image: "/kemeja-vintage.jpeg",
            timeLeft: "2 hari",
            color: "from-cyan-500/20"
        },
        {
            id: 2, 
            name: "Urban Athletics",
            price: "2.899.000",
            description: "City Sport Series",
            image: "/cewe-limit.jpeg",
            timeLeft: "4 hari",
            color: "from-purple-500/20"
        },
        {
            id: 3,
            name: "Heritage Edition",
            price: "3.999.000",
            description: "Classic Sport Collection", 
            image: "/baju-limit.jpeg",
            timeLeft: "1 hari",
            color: "from-orange-500/20"
        }
    ];

    const supportServices = [
        {
            title: 'Returns',
            description: '30-Day Easy Returns',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="cyan" className="w-12 h-12 mb-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>  
            ),
            features: ['Free Returns', 'No Questions Asked', 'Quick Refunds']
        },
        {
            title: 'Shipping',
            description: 'Fast & Reliable Delivery',
            icon: (
                <svg className="w-12 h-12 mb-4" fill="none" stroke="cyan" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
            ),
            features: ['2-Day Delivery', 'Order Tracking', 'Worldwide Shipping']
        },
        {
            title: 'Size Help',
            description: 'Find Your Perfect Fit',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="cyan" class="w-12 h-12 mb-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>

            ),
            features: ['Size Guide', 'Virtual Fitting', 'Expert Advice']
        }
    ];

    return (
        <>
            <section className="h-[100vh] flex items-center justify-center bg-[#FFF8E8] bg-cover bg-center overflow-hidden">
                <div className="text-center w-full">
                    <h1 className="text-4xl font-bold relative top-[-20px] text-black font-blinky mt-[-100px]">Find Your Style</h1>
                    <Slider {...settings}>
                        {images.map((image, index) => (
                            <div key={index}>
                                <img 
                                    src={image} 
                                    alt={`Slide ${index}`} 
                                    className="w-full h-[73vh] object-contain" 
                                    style={{ outline: 'none' }} 
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
            <section>
                <div className="h-[90vh] bg-[#FFF8E8] flex flex-col mt-[-50px] justify-start items-center">
                    <h1 className="font-blinky text-4xl align-middle text-black mb-5">Shop By Category</h1>
                    <div className="flex space-x-10 mt-5">
                        {brand.map((brand, index) => (
                            <Link 
                                key={index} 
                                to={brand.link} 
                                className="w-[165px] h-[165px] border-4 border-black rounded-full flex items-center justify-center hover:scale-125 transition-transform duration-300"
                                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                            >
                                <img
                                    src={brand.image}
                                    alt={`Brand ${index}`}
                                    className="w-[120px] h-[120px] object-contain bg-transparent"
                                />
                            </Link>
                        ))}
                    </div>
                    <div className="w-full">
                        <img 
                            src={brandImage[0].image}
                            alt={`Brand Image`}
                            className="w-full h-[43vh] object-contain mt-20"
                            style={{ outline: 'none' }}
                        />
                    </div>
                </div>
            </section>
            <section className="relative bg-[#151523] py-16 ">
                <div className="absolute top-0 left-0 w-full h-[30%] bg-[#FFF8E8] z-0"></div>

                    <div className="container mx-auto relative z-10 px-4 max-w-6xl">
                        <div className="flex items-center justify-between mb-12">
                            <h1 className="text-5xl font-blinky text-black text-center text-mid">Best Sellers</h1>
                            <Link to="/catalog" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                                View All Products →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {bestSeller.map((item, index) => (
                                <Link
                                    key={index}
                                    to="/product"
                                    state={{ productData: item }}
                                    className="group relative block"
                                >
                                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg mb-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                                        
                                        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-medium py-2 px-4 rounded-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            Quick Add
                                        </button>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-1">
                                            <span className="text-yellow-400">★</span>
                                            <span className="text-sm text-gray-600">{item.rating}</span>
                                            <span className="text-sm text-gray-400">({item.reviews})</span>
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                        <p className="text-sm font-semibold text-gray-900">Rp {item.price}</p>
                                    </div>

                                    <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
            </section>
            <section className="bg-[#151523] py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-blinky text-white mb-4">Sport Trend</h2>
                        <p className="text-gray-400 text-lg">Discover your perfect sportswear collection</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {sportTrend.map((category) => (
                            <Link
                                key={category.id}
                                to="/Catalog" 
                                state={{ productData: category }} // Pass category data
                                className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-900"
                            >   
                                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-b ${category.color} to-gray-900/90`}></div>
                                </div>

                                <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-6 transition-transform duration-500 group-hover:translate-y-0">
                                    <div className="transform translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                                        <h3 className="text-white text-2xl font-bold mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-gray-300 mb-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                            {category.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">
                                                {category.itemCount}
                                            </span>
                                            <span className="text-white opacity-0 transform translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                                                Explore →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <section className="bg-[#151523] py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-blinky text-white mb-2">Limited Edition</h2>
                        <p className="text-gray-400">Koleksi Eksklusif Terbatas</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                        {limitedEditions.map((item) => (
                        <div 
                            key={item.id} 
                            className="group relative overflow-hidden rounded-xl bg-gray-900"
                        >
                            <div className="aspect-[3/3] relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-b ${item.color} to-gray-900/90`}></div>
                                    <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded-full">
                                        <span className="text-white text-xs">
                                            Sisa {item.timeLeft}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="text-white text-base font-bold mb-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-400 text-xs mb-2">
                                        {item.description}
                                    </p>
                        
                                    <div className="flex items-center justify-between">
                                        <span className="text-white text-sm font-bold">
                                            Rp {item.price}
                                        </span>
                                        <Link 
                                            to="/product" // Changed from "/catalog" to "/product"
                                            state={{ productData: item }} // Pass item data
                                        >
                                            <button className="bg-white text-black px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-100 transition-colors">
                                                Beli Sekarang
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))} 
                    </div>

                    <div className="text-center mt-6">
                        <Link 
                            to="/catalog" 
                            className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center text-sm"
                        >
                            Lihat Semua Koleksi
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="bg-[#FFF8E8] py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-5xl font-blinky text-black mb-4">Join Our Community</h2>
                        <p className="text-gray-600 mb-8">Get exclusive offers and updates from our collection</p>

                        <div className="relative max-w-xl mx-auto mb-8">
                            <input 
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:border-black"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                                Subscribe
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>

                                </div>
                                <h3 className="font-bold text-black mb-2">Early Access</h3>
                                <p className="text-gray-600 text-sm">Be first to shop new releases</p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                </div>
                                <h3 className="font-bold text-black mb-2">Special Offers</h3>
                                <p className="text-gray-600 text-sm">Exclusive member discounts</p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                                    </svg>

                                </div>
                                <h3 className="font-bold text-black mb-2">Updates</h3>
                                <p className="text-gray-600 text-sm">Latest releases and news</p>
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm mt-8">
                            By subscribing, you agree to our Terms & Privacy Policy
                        </p>
                    </div>
                </div>
            </section>
            <section className="bg-[#FFF8E8] py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-blinky text-black mb-4 ">Customer Support</h2>
                            <p className="text-gray-600 text-lg">We're here to help you 24/7</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {supportServices.map((service, index) => (
                            <div 
                                key={service.title}
                                className="bg-[#151523] rounded-2xl p-8 text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-3xl"
                            >
                                <div className="flex justify-center text-black">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
                                <p className="text-gray-600 mb-6">{service.description}</p>
                                
                                <div className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center justify-center text-gray-300">
                                            <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full mr-2"></span>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <button className="mt-8 px-6 py-2 bg-[#151523] text-white rounded-lg hover:bg-cyan-300 transition-colors duration-300">
                                    Learn More
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <p className="text-gray-500">Need more help? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a></p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;
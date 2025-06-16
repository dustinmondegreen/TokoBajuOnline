import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Typewriter = ({ text, delay, infinite }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);
            return () => clearTimeout(timeout);
        } else if (infinite) {
            const resetTimeout = setTimeout(() => {
                setCurrentIndex(0);
                setCurrentText('');
            }, 2000);
            return () => clearTimeout(resetTimeout);
        }
    }, [currentIndex, delay, infinite, text]);

    return <span>{currentText}</span>;
};

const Hero = () => {
    const images = [
        "/zara (1).png",
        "/zara (2).png",
        "/zara (3).png",
        "/zara (4).png",
        "/zara (5).png"
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: 'linear',
    };

    const brand = [
        { image: "/shirt.svg", link: "/Catalog?type=T-Shirt" },
        { image: "/hoodie.svg", link: "/Catalog?type=Hoodie" },
        { image: "/jacket.svg", link: "/Catalog?type=Jacket" },
        { image: "/shorts.svg", link: "/Catalog?type=Shorts" },
        { image: "/hat.svg", link: "/Catalog?type=Hat" },
    ];

    const brandImage = [
        { image: "/Frame 27.png", link: "/catalog/adidas" },
        { image: "/Frame 28.png", link: "/catalog/nike" },
    ];

    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        fetchBestSeller();
    }, []);

    const fetchBestSeller = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            const mappedProducts = response.data.data.map(product => ({
                id: product.product_id,
                image: `http://localhost:8000${product.image}`,
                link: "/product",
                name: product.product_name,
                color: product.color,
                material: product.material,
                quantity: product.quantity,
                category: product.category,
                price: Number(product.price).toLocaleString('id-ID', { minimumFractionDigits: 0 }),
                rating: 4.8,
                reviews: 200
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
            description: "Performance running gear",
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
            name: "Nako Edition",
            price: "499.000",
            description: "Exclusive Sport Collection",
            image: "/character 1 (1).jpg",
            timeLeft: "2 hari",
            color: "from-cyan-500/20"
        },
        {
            id: 2,
            name: "Urban Edition",
            price: "499.000",
            description: "City Sport Series",
            image: "/character 1 (2).jpg",
            timeLeft: "4 hari",
            color: "from-purple-500/20"
        },
        {
            id: 3,
            name: "Heritage Edition",
            price: "499.000",
            description: "Classic Sport Collection",
            image: "/character 1 (3).jpg",
            timeLeft: "1 hari",
            color: "from-orange-500/20"
        }
    ];

    const supportServices = [
        {
            title: 'Returns',
            description: '30-Day Easy Returns',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mb-4 text-cyan-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001m-4.992.001v-4.992m0 4.992L2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            ),
            features: ['Free Returns', 'No Questions Asked', 'Quick Refunds']
        },
        {
            title: 'Shipping',
            description: 'Fast & Reliable Delivery',
            icon: (
                <svg className="w-12 h-12 mb-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
            ),
            features: ['2-Day Delivery', 'Order Tracking', 'Worldwide Shipping']
        },
        {
            title: 'Size Help',
            description: 'Find Your Perfect Fit',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mb-4 text-cyan-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
            ),
            features: ['Size Guide', 'Virtual Fitting', 'Expert Advice']
        }
    ];

    return (
        <>
            <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
                <div className="w-full h-full">
                    <Slider {...settings}>
                        {images.map((image, index) => (
                            <div key={index} className="h-[100vh] flex items-center justify-center">
                                <img
                                    src={image}
                                    alt={`Slide ${index}`}
                                    className="w-full h-full object-cover"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white text-center p-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                        CLOVIO
                    </h1>
                    <p className="text-xl md:text-3xl font-light tracking-wide drop-shadow-lg">
                        <Typewriter
                            text="Your ultimate destination for modern fashion."
                            delay={100}
                            infinite={false}
                        />
                    </p>
                </div>
            </section>

            <section className="bg-white py-16 my-32">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="font-jakarta text-5xl text-bold mb-4">Shop By Category</h1>
                        <p className="text-gray-600 text-lg">Find what you're looking for</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 mt-10 max-w-6xl mx-auto">
                        {brand.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                className="flex flex-col items-center p-4 group"
                            >
                                <div
                                    className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gray-100 flex items-center justify-center mb-4
                                   transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-contain"
                                    />
                                </div>
                                <p className="text-sm md:text-base font-medium text-gray-800 group-hover:text-black transition-colors">
                                    {item.name}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative bg-[#FFFFFF] py-16 ">
                <div className="absolute top-0 left-0 w-full h-[30%] bg-white z-0"></div>

                <div className="container mx-auto relative z-10 px-4 max-w-6xl">
                    <div className="flex items-center justify-between mb-12">
                        <h1 className="text-5xl font-jakarta text-black text-center text-mid">Best Sellers</h1>
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

            <section className="py-24 sm:py-32">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 lg:mb-20">
                        <h2 className="font-jakarta text-5xl text-bold mb-4">
                            Sport Trends
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Dive into our curated collection of high-performance and stylish sportswear.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 max-w-7xl mx-auto">
                        {sportTrend.map((category) => (
                            <Link
                                key={category.id}
                                to="/Catalog"
                                state={{ productData: category }}
                                className="group relative overflow-hidden rounded-xl aspect-[3/4] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="absolute inset-0">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Elegant gradient overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-b ${category.color} to-gray-900/80`}></div>
                                </div>

                                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                    <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <h3 className="text-xl sm:text-2xl font-bold mb-1 drop-shadow-md">
                                            {category.name}
                                        </h3>
                                        <p className="text-gray-200 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                                            {category.description}
                                        </p>
                                        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
                                            <span className="text-gray-400 text-xs sm:text-sm">
                                                {category.itemCount}
                                            </span>
                                            <span className="text-white text-sm font-semibold flex items-center">
                                                Explore
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#FFFFFF] py-16 pb-64">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="font-jakarta text-5xl text-bold mb-4">Limited Edition</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                        {limitedEditions.map((item) => (
                            <div
                                key={item.id}
                                className="group relative overflow-hidden rounded-xl bg-gray-900"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <div className={`${item.color}`}></div>
                                    <div className="absolute top-3 right-3 bg-black/40 rounded-full px-3 h-6 flex items-center justify-center">
                                        <span className="text-white text-xs">
                                            Sisa {item.timeLeft}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 bg-white/5">
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
                                            to="/product"
                                            state={{ productData: item }}
                                        >
                                            <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-medium border border-white transition-all duration-300 ease-in-out hover:bg-white-800 hover:scale-105 hover:shadow-md">
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
                            className="inline-flex items-center text-[#1D2432] bg-transparent border border-[#1D2432] rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ease-in-out hover:bg-[#1D2432] hover:text-white hover:border-[#1D2432] hover:scale-105"
                        >
                            Lihat Semua Koleksi
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-5xl font-jakarta text-black mb-4">Join Our Community</h2>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-black mb-2">Early Access</h3>
                                <p className="text-gray-600 text-sm">Be first to shop new releases</p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-black mb-2">Special Offers</h3>
                                <p className="text-gray-600 text-sm">Exclusive member discounts</p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
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

            <section className="bg-white py-24 my-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-jakarta text-black mb-4 ">Customer Support</h2>
                        <p className="text-gray-600 text-lg">We're here to help you 24/7</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {supportServices.map((service, index) => (
                            <div
                                key={service.title}
                                className="bg-white rounded-2xl p-8 text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-3xl"
                            >
                                <div className="flex justify-center text-black">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-black">{service.title}</h3>
                                <p className="text-gray-600 mb-6">{service.description}</p>

                                <div className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center justify-center text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></span>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="mt-8 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300">
                                    Learn More
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;
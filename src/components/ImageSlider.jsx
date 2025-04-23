import { useState } from "react";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";

const images = [
    '/tshirt-basic-black.jpg',
    '/baju_hitam.png',
    '/baju-limit.jpeg'
];

export default function ImageSlider() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full max-w-xl mx-auto">
            <div className="overflow-hidden rounded-xl">
                <div className="relative w-full h-60 transition-transform duration-500 ease-in-out">
                    {images.map((img, index) => (
                        <>
                            {index}
                            <img
                                key={index}
                                src={img}
                                alt={`product-${index}`}
                                className={`w-full h-auto object-cover rounded-xl absolute top-0 left-0 transition-opacity duration-500 ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            />
                        </>

                    ))}
                </div>
                {/* <img src={images[current]} alt="product preview" className="w-full h-auto object-cover rounded-xl" /> */}
            </div>
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 z-50 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                <BiSolidChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 z-50 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                <BiSolidChevronRight size={20} />
            </button>
        </div>
    );
}
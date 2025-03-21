import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {

    const images = [
        "/Hero1.png",
        "/Hero2.png",
        "/Hero4.png",
        "/Hero3.png",
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            <section className="h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden">
                <div className="text-center text-white w-full">
                    <h1 className="text-4xl font-bold relative top-[-10px] text-black font-blinky">Find Your Style</h1>
                    <Slider {...settings}>
                        {images.map((image, index) => (
                            <div key={index}>
                                <img 
                                    src={image} 
                                    alt={`Slide ${index}`} 
                                    className="w-full h-[70vh] object-contain" 
                                    style={{ outline: 'none' }} 
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
            <section>
                <div className="h-[90vh] bg-[#FFF8E8] flex items-center justify-center">
                    <h2 className="text-3xl text-black">Product best seller</h2>
                </div>
            </section>
            <section>
                <div className="h-[90vh] bg-[#FFF8E8] flex items-center justify-center">
                    <h1 className="text-3xl text-black">for you</h1>
                </div>
            </section>
        </>
    );
}

export default Hero;
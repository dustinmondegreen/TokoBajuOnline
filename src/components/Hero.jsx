import React from 'react';

const Hero = () => {

    const images = [
        "/Hero1.png",
        "/Hero2.png",
        "/Hero4.png",
        "/Hero3.png",
    ];

    return (
        <section className="hero bg-[#FFF8E8] h-[90vh] flex flex-col items-center justify-center overflow-hidden">
            <div className="text-center text-black"> 
                <div className=""><h1 className="text-5xl font-bold mb-8">FIND YOUR STYLE</h1>
                    <div className="animated-slide">
                        {images.concat(images).map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`slide ${index}`}
                                className="w-[800px] h-auto"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
import React from 'react';

const Hero = () => {
    return (
        <selection className="hero">
            <div className="bg-[#FFF8E8] h-[90vh] flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold">Welcome to TokoBaju</h1>
                    <div>
                        <p className="mt-3">The best place to find your favorite clothes</p>
                        <img src="/hero-image.png" alt="Hero Image" className="w-[50%] mx-auto" />
                    </div>
                </div>
            </div>
        </selection>
    );
}

export default Hero;
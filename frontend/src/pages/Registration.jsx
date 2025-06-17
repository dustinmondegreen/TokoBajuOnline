import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const registerImages = [
    "/zara (1).png",
    "/zara (2).png",
    "/zara (3).png",
    "/zara (4).png",
    "/zara (5).png"
];

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

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customer_name: "",
        customer_email: "",
        customer_phone_number: "",
        password: "",
        confirmPassword: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % registerImages.length
            );
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                customer_name: formData.customer_name,
                customer_email: formData.customer_email,
                customer_phone_number: formData.customer_phone_number,
                password: formData.password,
            }, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.data.success) {
                alert("Registration successful! Please login.");
                navigate("/login");
            } else {
                setErrorMessage("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = error.response.data.errors;
                const firstError = Object.values(errors)[0][0];
                setErrorMessage(firstError);
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="flex h-screen font-sans">
            <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center relative overflow-hidden">
                {registerImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Fashion ${index + 1}`}
                        className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-12 z-10">
                    <div className="text-center text-white">
                        <h3 className="text-4xl font-bold mb-3 drop-shadow-md">
                            Join CLOVIO Community
                        </h3>
                        <p className="text-xl max-w-md mx-auto drop-shadow-sm">
                            <Typewriter
                                text="Create your account and unlock exclusive fashion experiences."
                                delay={50}
                                infinite={false}
                            />
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 lg:p-12 shadow-2xl z-10">
                <div className="w-full max-w-md">
                    <div className="text-left mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                        <p className="text-gray-600 text-lg">Sign up to get started with CLOVIO.</p>
                    </div>

                    {errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-6" role="alert">
                            <span className="block sm:inline">{errorMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                id="customer_name"
                                name="customer_name"
                                type="text"
                                placeholder="Enter your full name"
                                onChange={handleChange}
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200 text-base"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="customer_email"
                                name="customer_email"
                                type="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200 text-base"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="customer_phone_number" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                id="customer_phone_number"
                                name="customer_phone_number"
                                type="tel"
                                placeholder="Enter your phone number"
                                onChange={handleChange}
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200 text-base"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200 text-base"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                onChange={handleChange}
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200 text-base"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg tracking-wide hover:bg-gray-800 transition duration-300 transform hover:scale-100"
                        >
                            Sign Up
                        </button>
                        <div className="text-center mt-6">
                            <p className="text-gray-600 text-sm">
                                Already have an account?{" "}
                                <a href="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                                    Sign in here
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
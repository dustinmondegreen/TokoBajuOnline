import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone_number: "",
    password: "",
    confirmPassword: ""
  });

  const [errorMessage, setErrorMessage] = useState(""); // <- Tambahan untuk tampilkan error

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error sebelum submit

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
      if (error.response && error.response.data && error.response.data.errors) {
        // Kalau ada validation error dari Laravel
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0][0]; // Ambil error pertama
        setErrorMessage(firstError);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen w-full font-jakarta">
      <div className="w-1/2 bg-blue-500 flex items-center justify-center">
        <img src="/Logo CLOVIO.svg" alt="" className="w-full h-full object-cover"/>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-[#151523]">
        <div className="w-full max-w-lg">
          <img src="/Logo CLOVIO.svg" className="pb-10" alt="" />
          <h2 className="text-2xl font-bold text-white mb-6">Create your account</h2>

          {/* Show error message */}
          {errorMessage && (
            <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex gap-6">
              <input name="customer_name" type="text" placeholder="Full Name" onChange={handleChange}
                className="w-1/2 px-4 py-3 rounded-lg text-sm font-medium" required />
              <input name="customer_phone_number" type="tel" placeholder="Phone Number" onChange={handleChange}
                className="w-1/2 px-4 py-3 rounded-lg text-sm font-medium" required />
            </div>
            <div className="mb-4 flex gap-6">
              <input name="customer_email" type="email" placeholder="Email" onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-sm font-medium" required />
            </div>
            <div className="mb-4 flex gap-6">
              <input name="password" type="password" placeholder="Password" onChange={handleChange}
                className="w-1/2 px-4 py-3 rounded-lg text-sm font-medium" required />
              <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange}
                className="w-1/2 px-4 py-3 rounded-lg text-sm font-medium" required />
            </div>
            <button type="submit" className="w-full bg-[#4F39F6] text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

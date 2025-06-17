import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        customer_email: formData.customer_email,
        password: formData.password
      }, {
        headers: { 'Accept': 'application/json' }
      });

      if (response.data.success) {
        // ⬇️ Simpan user ke localStorage supaya Navbar tahu kalau sudah login
        localStorage.setItem("user", JSON.stringify(response.data.data));

        alert("Login successful!");
        navigate("/"); // Redirect ke Home
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-full font-jakarta">
      <div className="w-1/2 flex items-center justify-center bg-[#151523]">
        <div className="w-full max-w-lg">
          <img src="/Logo CLOVIO.svg" className="pb-10" alt="" />
          <h2 className="text-2xl font-bold text-white mb-6">Sign in to your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input name="customer_email" type="email" placeholder="Email address" onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-sm font-medium" required />
            </div>
            <div className="mb-4">
              <input name="password" type="password" placeholder="Password" onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-sm font-medium" required />
            </div>
            <button type="submit" className="w-full bg-[#4F39F6] text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
              Sign In
            </button>
            <div className="text-center mt-4">
              <span className="text-white text-sm">
                Don't have an account?{" "}
                <a href="/registration" className="text-blue-400 hover:underline">
                  Sign up here
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>

      <div className="w-1/2 bg-blue-500 flex items-center justify-center">
        <img src="/Logo CLOVIO.svg" alt="" className="w-full h-full object-cover"/>
      </div>
    </div>
  );
};

export default Login;

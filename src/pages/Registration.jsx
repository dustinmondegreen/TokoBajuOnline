import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Register = () => {
    return (
      <div className="flex h-screen w-full font-jakarta"> 
        <div className="w-1/2 bg-blue-500 flex items-center justify-center">
          <img src="/Dummy 1.jpg" alt="" className="w-full h-full object-cover"/>
        </div>
        
        <div className="w-1/2 flex items-center justify-center bg-[#151523]">
          <div className="w-full max-w-lg">
            <img src="/Logo CLOVIO.svg" className="pb-10" alt="" />
            <h2 className="text-2xl font-bold text-white mb-6">Create your account</h2>
            <form>
              <div className="mb-4 flex gap-6">
                <div className="w-1/2">
                  <label className="block text-white font-semibold mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full text-sm font-medium px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-white font-semibold mb-2">Username</label>
                  <input 
                    type="text" 
                    className="w-full text-sm font-medium px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              
              <div className="mb-4 flex gap-6">
                <div className="w-1/2">
                  <label className="block text-white font-semibold mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full text-sm font-medium px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter your email"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-white font-semibold mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full text-sm font-medium px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              
              <div className="mb-4 flex gap-6">
                <div className="w-1/2">
                  <label className="block text-white font-semibold mb-2">Password</label>
                  <input 
                    type="password" 
                    className="w-full text-sm font-medium px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter your password"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-white font-semibold mb-2">Confirm Password</label>
                  <input 
                    type="password" 
                    className="w-full text-sm font-medium px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
              <div className="mb-4 flex items-center justify-between py-3">
                <label className="flex text-xs text-white items-center text-sm text-white">
                Already have an account?
                <a href="/Login" className="text-xsa pl-1 text-white font-bold hover:underline">Sign In</a>
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#4F39F6] font-semibold text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                <span className="relative z-10">Sign Up</span>
              </button>
            </form>

            <div className="my-6 text-center text-white text-sm">Or continue with</div>
            <div className="flex gap-4 justify-center">
              <button className="flex text-sm font-semibold bg-white items-center gap-2 px-6 py-2 border rounded-lg hover:bg-gray-200 transition">
                <FcGoogle className="w-5 h-5" /> Google
              </button>
              <button className="flex text-sm font-semibold bg-white items-center gap-2 px-6 py-2 border rounded-lg hover:bg-gray-200 transition">
                <FaGithub className="w-5 h-5" /> GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};
  
export default Register;

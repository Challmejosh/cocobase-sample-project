import { useContext, useState } from "react";
import { AppContext } from "../Utilities/Context";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthComp = () => {
    const {signUp,signin,getUser} = useContext(AppContext)
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fetching, setFetching] = useState(false);

    const navigate = useNavigate()
  if(getUser){
    return <Navigate to="/" replace />
  }

  const handleSubmit =  async (e,email,password) => {
    e.preventDefault();
    // Handle sign up or sign in logic here
    // toast("processing")
    setFetching(true)
    if(isSignUp){
      const signup = await signUp(email,password)
      if(signup){
        toast(signup.message)
        navigate("/")
      }
    }else{
      const fetch = await signin(email,password)
      if(fetch){
        toast(fetch.message)
        navigate("/")
      }
    }
    setFetching(false)
  };
  
   const checkSign = isSignUp ? "Sign Up" : "Sign In"

    return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
        <form
        className="bg-[#f8fafc]/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl flex flex-col gap-5 w-full max-w-xs sm:max-w-sm border border-black/10"
        onSubmit={(e)=>handleSubmit(e,email,password)}
        >
        <h2 className="text-3xl font-extrabold text-black text-center mb-2 tracking-wide">
            {isSignUp ? "Create Account" : "Welcome Back!"}
        </h2>
        {isSignUp && (
            <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-[#f8fafc] border border-black/10 focus:outline-none focus:ring-2 focus:ring-black text-base transition text-black placeholder:text-black/40"
            />
        )}
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-[#f8fafc] border border-black/10 focus:outline-none focus:ring-2 focus:ring-black text-base transition text-black placeholder:text-black/40"
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-[#f8fafc] border border-black/10 focus:outline-none focus:ring-2 focus:ring-black text-base transition text-black placeholder:text-black/40"
        />
        <button
            type="submit"
            className="bg-gradient-to-r from-[#b148ff] to-[#f137a2] cursor-pointer text-[#f8fafc] font-bold rounded-xl py-3 text-lg shadow-md hover:bg-[#222] transition-all duration-200 hover:scale-105 border border-black/20"
        >
            {`${fetching ? "loading..." : checkSign }`}
        </button>
        <p className="text-center text-black/60 text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <span
            onClick={() => setIsSignUp((prev) => !prev)}
            className="ml-1 text-black font-semibold cursor-pointer hover:underline"
            >
            {isSignUp ? " Sign In" : " Sign Up" }
            </span>
        </p>
        </form>
    </div>
    );
};

export default AuthComp;

import React, { useState } from "react";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { googleSignIn, logIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await logIn(email, password);
      if (userCredential.user.emailVerified) {
        navigate("/");
      } else {
        setError("Please verify your email to log in. Check your inbox for the verification link.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await googleSignIn();
      if (userCredential.user.emailVerified) {
        navigate("/");
      } else {
        setError("Please verify your email to log in.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5">
      <div className="hidden md:flex items-center justify-center bg-blue-100 md:col-span-3">
        <img src={twitterimg} className="w-full h-full object-cover" alt="twitterimg" />
      </div>
      <div className="flex flex-col items-center justify-center bg-blue-50 p-4 sm:p-6 md:col-span-2">
        <div className="w-full max-w-md space-y-6">
          <div>
            <TwitterIcon className="text-blue-500 w-24 h-24 mb-4" />
            <h1 className="text-4xl lg:text-5xl font-bold">Happening now</h1>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mt-4">Log in to Twitter</h2>

          {error && <p className="bg-red-500 text-white p-3 rounded">{error}</p>}

          <button onClick={handleGoogleSignIn} disabled={loading} className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-[14px] text-blue-600 border-blue-400 hover:bg-blue-100 transition duration-150 disabled:opacity-50">
            <GoogleIcon />
            {loading ? <div className="w-5 h-5 border-t-2 border-r-2 border-blue-500 rounded-full animate-spin"></div> : <span className="font-medium">Sign in with Google</span>}
          </button>

          <div className="flex items-center justify-center w-full">
            <hr className="w-full border-gray-300" />
            <span className="px-4 font-bold text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-3 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50">
              {loading ? <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mx-auto"></div> : 'Log In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p>Don't have an account?
              <Link to="/signup" className="text-blue-500 hover:underline ml-1">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from '@mui/icons-material/Google';
import { useUserAuth } from "../../context/UserAuthContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { signUp, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp(email, password);
      setEmailSent(true);
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
      await googleSignIn();
      navigate("/");
    } catch (err) {
      console.log(err.message);
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
          {emailSent ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold">Verify Your Email</h1>
              <p className="mt-4">A verification link has been sent to your email address. Please check your inbox and click the link to complete your registration.</p>
              <p className="mt-2">Once verified, you can <Link to="/login" className="text-blue-500 hover:underline">log in</Link>.</p>
            </div>
          ) : (
            <>
              <div>
                <TwitterIcon className="text-blue-500 w-24 h-24 mb-4" />
                <h1 className="text-4xl lg:text-5xl font-bold">Happening now</h1>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mt-4">Join Twitter today</h2>

              {error && <p className="bg-red-500 text-white p-3 rounded">{error}</p>}

              <button onClick={handleGoogleSignIn} disabled={loading} className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-[14px] text-blue-600 border-blue-400 hover:bg-blue-100 transition duration-150 disabled:opacity-50">
                <GoogleIcon />
                {loading ? <div className="w-5 h-5 border-t-2 border-r-2 border-blue-500 rounded-full animate-spin"></div> : <span className="font-medium">Sign up with Google</span>}
              </button>

              <div className="flex items-center justify-center w-full">
                <hr className="w-full border-gray-300" />
                <span className="px-4 font-bold text-gray-500">or</span>
                <hr className="w-full border-gray-300" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-3 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50">
                  {loading ? <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mx-auto"></div> : 'Sign Up'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p>Already have an account?
                  <Link to="/login" className="text-blue-500 hover:underline ml-1">
                    Log In
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;

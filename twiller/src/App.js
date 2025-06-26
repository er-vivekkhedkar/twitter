import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { applyActionCode } from 'firebase/auth';
import { auth } from './context/firbase';
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
import Feed from "./Pages/Feed/Feed";
import Explore from "./Pages/Explore/Explore";
import Notification from "./Pages/Notification/Notification";
import Message from "./Pages/Messages/Message";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Lists from "./Pages/Lists/Lists";
import Profile from "./Pages/Profile/Profile";
import More from "./Pages/more/More";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Bookmark from "./Pages/Bookmark/Bookmark";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerification = async () => {
      const params = new URLSearchParams(location.search);
      const mode = params.get('mode');
      const oobCode = params.get('oobCode');

      if (mode === 'verifyEmail' && oobCode) {
        try {
          await applyActionCode(auth, oobCode);
          // User is now verified. The onAuthStateChanged listener will update the auth state.
          // Navigate to home page for a seamless login experience.
          navigate('/');
        } catch (error) {
          console.error("Error verifying email:", error);
          // Optionally, show an error message to the user.
          navigate('/login');
        }
      }
    };

    handleVerification();
  }, [location, navigate]);
  return (
    <div className="app">
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {" "}
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<Feed />} />
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {" "}
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />}>
            <Route path="feed" element={<Feed />} />
            <Route path="explore" element={<Explore />} />
            <Route path="notification" element={<Notification />} />
            <Route path="messages" element={<Message />} />
            <Route path="lists" element={<Lists />} />
            <Route path="bookmarks" element={<Bookmark />} />
            <Route path="profile" element={<Profile />} />
            <Route path="more" element={<More />} />
          </Route>
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;

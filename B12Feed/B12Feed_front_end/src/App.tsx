import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromLocalStorage } from './store/slices/authSlice';
import type { RootState } from './store/index.ts';

// Imports
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import Discover from './pages/Discover';
import ResourceDetails from './pages/ResourceDetails';
import CheckEmail from './pages/CheckEmail';
import RegisterCreate from './pages/RegisterCreate';
import RegisterJoin from './pages/RegisterJoin';
import RegisterChoice from './pages/RegisterChoice';
import Success from './pages/Success';
import ShareFood from './pages/Sharefood'; 
import PrivateRoute from './components/PrivateRoute';

function AppContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const initApp = async () => {
      dispatch(loadUserFromLocalStorage());
      // Small delay to prevent flicker
      setTimeout(() => setLoading(false), 500);
    };
    initApp();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      const path = window.location.pathname;
      if (path === "/" || path === "/login") {
        navigate("/discover"); // Changed from /dashboard to match your routes
      }
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) return null; // Or a global loader

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<RegisterChoice />} />
      <Route path="/signup/create" element={<RegisterCreate />} />
      <Route path="/signup/join" element={<RegisterJoin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/check-email" element={<CheckEmail />} />

      <Route path="/discover" element={<PrivateRoute><Discover /></PrivateRoute>} />
      <Route path="/resource/:id" element={<PrivateRoute><ResourceDetails /></PrivateRoute>} />
      <Route path="/share-food" element={<PrivateRoute><ShareFood /></PrivateRoute>} />
      <Route path="/signup/success" element={<PrivateRoute><Success /></PrivateRoute>} />
    </Routes>
  );
}

// Wrap AppContent in BrowserRouter so useNavigate works
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
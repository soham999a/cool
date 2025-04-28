import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, status } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Redirect if already authenticated
  if (status === 'authenticated' && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-dark-900 z-0">
        {/* Gradient orbs */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-3xl"
          style={{
            top: mousePosition.y * 0.1 - 250,
            left: mousePosition.x * 0.1 - 250,
            transform: 'translate3d(0, 0, 0)',
            transition: 'top 0.5s cubic-bezier(0.22, 1, 0.36, 1), left 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-600/20 to-purple-600/20 blur-3xl"
          style={{
            bottom: mousePosition.y * 0.05,
            right: mousePosition.x * 0.05,
            transform: 'translate3d(0, 0, 0)',
            transition: 'bottom 0.5s cubic-bezier(0.22, 1, 0.36, 1), right 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6TTM0IDI4aDR2MWgtNHYtMXptMCAyaDR2MWgtNHYtMXptLTIgMGg0djFoLTR2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 mb-12 md:mb-0 text-center md:text-left"
        >
          <div className="inline-block h-20 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mb-6 mx-auto md:mx-0">
            <span className="text-white font-bold text-3xl">CM</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Cool</span>
            <span className="text-gradient">Member</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-lg mb-8">
            Manage your organization with our modern, intuitive platform. Streamlined member management for the digital age.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center bg-dark-lighter rounded-full px-4 py-2">
              <span className="material-icons text-indigo-400 mr-2">check_circle</span>
              <span className="text-gray-300">Modern Dashboard</span>
            </div>
            <div className="flex items-center bg-dark-lighter rounded-full px-4 py-2">
              <span className="material-icons text-pink-400 mr-2">check_circle</span>
              <span className="text-gray-300">Member Management</span>
            </div>
            <div className="flex items-center bg-dark-lighter rounded-full px-4 py-2">
              <span className="material-icons text-purple-400 mr-2">check_circle</span>
              <span className="text-gray-300">Secure Access</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full md:w-5/12"
        >
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-xl"></div>

            {/* Card with glow effect */}
            <div className="relative glass-card p-8 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

              {/* Animated glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000 animate-pulse"></div>

              <div className="relative">
                <h2 className="text-3xl font-bold text-center mb-6 text-gradient">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                <AnimatePresence mode="wait">
                  {isLogin ? (
                    <LoginForm key="login" />
                  ) : (
                    <SignupForm key="signup" />
                  )}
                </AnimatePresence>

                <div className="mt-6 text-center">
                  <p className="text-gray-400">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="ml-2 text-indigo-400 font-medium hover:text-indigo-300 focus:outline-none transition-colors"
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;

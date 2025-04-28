import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button3D from './Button3D';

const Header3D: React.FC = () => {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/members', label: 'Members', icon: 'people' },
    { path: '/payments', label: 'Payments', icon: 'payments' },
    { path: '/support', label: 'Support', icon: 'support' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Animation for header
  const headerSpring = useSpring({
    backgroundColor: scrolled ? 'rgba(17, 24, 39, 0.9)' : 'rgba(17, 24, 39, 0.7)',
    boxShadow: scrolled
      ? '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)'
      : '0 0 0 transparent',
    backdropFilter: 'blur(10px)',
    height: scrolled ? 70 : 80,
    config: {
      tension: 300,
      friction: 30,
    },
  });

  // Animation for logo
  const logoSpring = useSpring({
    transform: scrolled ? 'scale(0.9)' : 'scale(1)',
    config: {
      tension: 300,
      friction: 20,
    },
  });

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      console.log('User logged out successfully');
      // The AuthContext will handle redirecting to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <animated.header
      style={headerSpring}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 flex items-center justify-between"
    >
      <animated.div
        style={logoSpring}
        className="flex items-center"
      >
        <Link to="/" className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-70"></div>
          <div className="relative bg-gray-900 rounded-lg p-3 border border-gray-700">
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              CoolMember
            </h1>
          </div>
        </Link>
      </animated.div>

      {user ? (
        <animated.button
          onClick={handleLogout}
          className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 group"
          style={{
            transform: 'scale(1)',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
        >
          <span className="relative z-10 flex items-center">
            <span className="mr-2 font-medium">Logout</span>
            <span className="material-icons text-sm">logout</span>
          </span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </animated.button>
      ) : (
        <Link to="/login">
          <animated.button
            className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 group"
            style={{
              transform: 'scale(1)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
          >
            <span className="relative z-10 flex items-center">
              <span className="mr-2 font-medium">Login</span>
              <span className="material-icons text-sm">login</span>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </animated.button>
        </Link>
      )}
    </animated.header>
  );
};

export default Header3D;

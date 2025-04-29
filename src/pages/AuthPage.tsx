import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../context/AuthContext';

interface AuthPageProps {
  mode?: 'login' | 'signup';
}

const AuthPage = ({ mode }: AuthPageProps) => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(mode === 'signup' ? false : true);
  const { user, status } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Update form mode based on URL changes
  useEffect(() => {
    if (location.pathname === '/signup') {
      setIsLogin(false);
    } else if (location.pathname === '/login') {
      setIsLogin(true);
    }
  }, [location.pathname]);

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
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden">
      {/* Animated background */}
      <div className="position-absolute top-0 start-0 bottom-0 end-0" style={{ zIndex: 0, background: 'var(--bs-dark)' }}>
        {/* Gradient orbs */}
        <div
          className="position-absolute rounded-circle"
          style={{
            width: '500px',
            height: '500px',
            background: 'linear-gradient(to right, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))',
            filter: 'blur(80px)',
            top: mousePosition.y * 0.1 - 250,
            left: mousePosition.x * 0.1 - 250,
            transform: 'translate3d(0, 0, 0)',
            transition: 'top 0.5s cubic-bezier(0.22, 1, 0.36, 1), left 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: '400px',
            height: '400px',
            background: 'linear-gradient(to right, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2))',
            filter: 'blur(80px)',
            bottom: mousePosition.y * 0.05,
            right: mousePosition.x * 0.05,
            transform: 'translate3d(0, 0, 0)',
            transition: 'bottom 0.5s cubic-bezier(0.22, 1, 0.36, 1), right 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        />

        {/* Grid pattern overlay */}
        <div className="position-absolute top-0 start-0 bottom-0 end-0"
             style={{
               background: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6TTM0IDI4aDR2MWgtNHYtMXptMCAyaDR2MWgtNHYtMXptLTIgMGg0djFoLTR2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=")',
               opacity: 0.2
             }} />
      </div>

      <Container className="position-relative py-5" style={{ zIndex: 10 }}>
        <Row className="align-items-center justify-content-between g-5">
          <Col md={6} className="text-center text-md-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4 mx-auto mx-md-0"
                   style={{
                     width: '80px',
                     height: '80px',
                     background: 'linear-gradient(135deg, var(--bs-primary), var(--bs-accent), var(--bs-secondary))'
                   }}>
                <span className="text-white fw-bold fs-3">CM</span>
              </div>

              <h1 className="display-4 fw-bold mb-4">
                <span className="text-white">Cool</span>
                <span className="text-gradient">Member</span>
              </h1>

              <p className="fs-5 text-light opacity-75 mb-4" style={{ maxWidth: '500px' }}>
                Manage your organization with our modern, intuitive platform. Streamlined member management for the digital age.
              </p>

              <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                <Badge bg="dark" className="py-2 px-3 d-flex align-items-center" style={{ background: 'rgba(31, 41, 55, 0.8)' }}>
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Modern Dashboard</span>
                </Badge>
                <Badge bg="dark" className="py-2 px-3 d-flex align-items-center" style={{ background: 'rgba(31, 41, 55, 0.8)' }}>
                  <i className="bi bi-check-circle-fill text-secondary me-2"></i>
                  <span>Member Management</span>
                </Badge>
                <Badge bg="dark" className="py-2 px-3 d-flex align-items-center" style={{ background: 'rgba(31, 41, 55, 0.8)' }}>
                  <i className="bi bi-check-circle-fill" style={{ color: 'var(--bs-accent)' }}></i>
                  <span className="ms-2">Secure Access</span>
                </Badge>
              </div>
            </motion.div>
          </Col>

          <Col md={5}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="position-relative">
                {/* Decorative elements */}
                <div className="position-absolute"
                     style={{
                       top: '-40px',
                       right: '-40px',
                       width: '160px',
                       height: '160px',
                       background: 'rgba(99, 102, 241, 0.1)',
                       borderRadius: '50%',
                       filter: 'blur(40px)'
                     }}></div>
                <div className="position-absolute"
                     style={{
                       bottom: '-40px',
                       left: '-40px',
                       width: '160px',
                       height: '160px',
                       background: 'rgba(236, 72, 153, 0.1)',
                       borderRadius: '50%',
                       filter: 'blur(40px)'
                     }}></div>

                {/* Card with glow effect */}
                <Card className="card-glass border-secondary shadow-lg overflow-hidden">
                  {/* Top accent */}
                  <div className="position-absolute top-0 start-0 end-0"
                       style={{
                         height: '4px',
                         background: 'linear-gradient(to right, var(--bs-primary), var(--bs-accent), var(--bs-secondary))'
                       }}></div>

                  {/* Animated glow */}
                  <div className="position-absolute top-0 start-0 end-0 bottom-0 animate-pulse"
                       style={{
                         background: 'linear-gradient(to right, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
                         borderRadius: 'inherit',
                         filter: 'blur(15px)',
                         opacity: 0.2,
                         transform: 'translateY(-1px) scale(1.01)'
                       }}></div>

                  <Card.Body className="p-4 p-md-5 position-relative">
                    <h2 className="text-gradient fs-2 fw-bold text-center mb-4">
                      {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>

                    <AnimatePresence mode="wait">
                      {isLogin ? (
                        <LoginForm key="login" />
                      ) : (
                        <SignupForm key="signup" />
                      )}
                    </AnimatePresence>

                    <div className="mt-4 text-center">
                      <p className="text-muted">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                          onClick={() => setIsLogin(!isLogin)}
                          className="ms-2 btn btn-link text-primary p-0 text-decoration-none"
                        >
                          {isLogin ? "Sign up" : "Sign in"}
                        </button>
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthPage;

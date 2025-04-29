import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home', icon: 'house' },
    { path: '/dashboard', label: 'Dashboard', icon: 'speedometer2' },
    { path: '/members', label: 'Members', icon: 'people' },
    { path: '/payments', label: 'Payments', icon: 'credit-card' },
    { path: '/support', label: 'Support', icon: 'headset' }
  ];

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.displayName) return 'U';
    const names = user.displayName.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Background decorative elements */}
      <div className="position-fixed top-0 end-0 w-25 h-25 bg-opacity-5 rounded-circle"
           style={{ background: 'rgba(99, 102, 241, 0.05)', filter: 'blur(80px)', zIndex: -1 }}></div>
      <div className="position-fixed bottom-0 start-0 w-25 h-25 bg-opacity-5 rounded-circle"
           style={{ background: 'rgba(139, 92, 246, 0.05)', filter: 'blur(80px)', zIndex: -1 }}></div>
      <div className="position-fixed top-50 start-25 w-25 h-25 bg-opacity-5 rounded-circle"
           style={{ background: 'rgba(236, 72, 153, 0.05)', filter: 'blur(80px)', zIndex: -1 }}></div>

      {/* Navbar with glass effect */}
      <Navbar expand="lg" variant="dark" className="glass-effect fixed-top py-2">
        <Container>
          <Navbar.Brand as={Link} to="/" className="me-4">
            <div className="position-relative d-inline-block">
              <div className="position-absolute inset-0 bg-gradient-primary rounded opacity-70 blur-sm"></div>
              <div className="position-relative bg-dark rounded p-2 border border-secondary">
                <h1 className="fs-4 fw-bold text-gradient mb-0">CoolMember</h1>
              </div>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {navLinks.map((link) => (
                <Nav.Link
                  key={link.path}
                  as={Link}
                  to={link.path}
                  active={location.pathname === link.path}
                  className="mx-1 d-flex align-items-center"
                >
                  <i className={`bi bi-${link.icon} me-2`}></i>
                  {link.label}
                </Nav.Link>
              ))}
            </Nav>

            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle as="div" className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                         style={{ width: '36px', height: '36px', fontSize: '14px' }}>
                      {getUserInitials()}
                    </div>
                    <span className="d-none d-md-inline">{user.displayName}</span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-dark">
                  <Dropdown.Item as={Link} to="/profile">
                    <i className="bi bi-person me-2"></i>Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">
                    <i className="bi bi-gear me-2"></i>Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                variant="outline-light"
                className="btn-gradient-primary d-flex align-items-center"
              >
                <span className="me-2">Login</span>
                <i className="bi bi-box-arrow-in-right"></i>
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content with animation */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex-grow-1 pt-5 mt-5 pb-4 position-relative"
        style={{ zIndex: 1 }}
      >
        <Container className="py-4">
          {children}
        </Container>
      </motion.main>

      {/* Footer */}
      <footer className="py-4 mt-auto">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="text-muted small mb-md-0">&copy; {new Date().getFullYear()} CoolMember. All rights reserved.</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-muted small">Privacy Policy</a>
              <a href="#" className="text-muted small">Terms of Service</a>
              <a href="#" className="text-muted small">Support</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;

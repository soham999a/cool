import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'View analytics and insights about your organization',
      icon: 'speedometer2',
      path: '/dashboard',
      color: 'primary',
    },
    {
      id: 'members',
      title: 'Members',
      description: 'Manage your members, add new ones, or update existing records',
      icon: 'people',
      path: '/members',
      color: 'info',
    },
    {
      id: 'payments',
      title: 'Payments',
      description: 'Track payments, generate invoices, and manage financial records',
      icon: 'credit-card',
      path: '/payments',
      color: 'success',
    },
    {
      id: 'support',
      title: 'IT Support',
      description: 'Get technical assistance and support for your organization',
      icon: 'headset',
      path: '/support',
      color: 'secondary',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // If user is logged in, show the dashboard-style home page
  if (user) {
    return (
      <Layout>
        <Container>
          <div className="text-center mb-5">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="d-inline-block mb-4"
            >
              <h1 className="display-4 fw-bold text-white mb-3">
                Welcome <span className="text-gradient">{user?.displayName ? user.displayName : 'to CoolMember'}</span>!
              </h1>
              <div className="mx-auto" style={{
                height: '4px',
                width: '100px',
                background: 'linear-gradient(to right, var(--bs-primary), var(--bs-accent))',
                borderRadius: '9999px'
              }}></div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="fs-5 text-light opacity-75 mx-auto"
              style={{ maxWidth: '600px' }}
            >
              Manage your organization efficiently with our modern dashboard
            </motion.p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            <Row className="g-4">
              {menuItems.map((menuItem) => (
                <Col key={menuItem.id} xs={12} sm={6} lg={3}>
                  <MenuItem item={menuItem} />
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </Layout>
    );
  }

  // If user is not logged in, show the marketing home page
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="row justify-content-center"
        >
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold text-white mb-3">
              Welcome to <span className="text-gradient">CoolMember</span>!
            </h1>
            <div className="mx-auto" style={{ height: '4px', width: '100px', background: 'linear-gradient(to right, var(--bs-primary), var(--bs-accent))', borderRadius: '9999px' }}></div>
            <p className="lead text-light opacity-75 my-4">
              Manage your organization efficiently with our modern dashboard
            </p>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <Button as={Link} to="/login" className="btn-gradient-primary btn-lg px-4 me-md-2">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </Button>
              <Button as={Link} to="/signup" variant="outline-light" className="btn-lg px-4">
                <i className="bi bi-person-plus me-2"></i>
                Sign Up
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section
        className="py-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Row className="g-4">
          <Col md={6} lg={3}>
            <motion.div variants={item}>
              <Card className="card-glass h-100">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <h5 className="card-title">Member Management</h5>
                  <p className="card-text text-muted">Easily add, edit, and manage your organization's members.</p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={6} lg={3}>
            <motion.div variants={item}>
              <Card className="card-glass h-100">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon bg-secondary bg-gradient text-white rounded-circle mb-3">
                    <i className="bi bi-graph-up"></i>
                  </div>
                  <h5 className="card-title">Analytics Dashboard</h5>
                  <p className="card-text text-muted">Track important metrics and get insights about your organization.</p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={6} lg={3}>
            <motion.div variants={item}>
              <Card className="card-glass h-100">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon bg-info bg-gradient text-white rounded-circle mb-3">
                    <i className="bi bi-credit-card-fill"></i>
                  </div>
                  <h5 className="card-title">Payment Tracking</h5>
                  <p className="card-text text-muted">Manage dues, fees, and other financial transactions.</p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={6} lg={3}>
            <motion.div variants={item}>
              <Card className="card-glass h-100">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon bg-success bg-gradient text-white rounded-circle mb-3">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h5 className="card-title">Secure Access</h5>
                  <p className="card-text text-muted">Role-based permissions and secure authentication.</p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.section>

      {/* CTA Section */}
      <section className="py-5 text-center">
        <Card className="card-glass border-0">
          <Card.Body className="p-5">
            <h2 className="fw-bold mb-3">Ready to get started?</h2>
            <p className="text-muted mb-4">Join thousands of organizations that use CoolMember to manage their members efficiently.</p>
            <Button as={Link} to="/signup" className="btn-gradient-primary btn-lg px-5">
              <i className="bi bi-person-plus me-2"></i>
              Sign Up Now
            </Button>
          </Card.Body>
        </Card>
      </section>
    </Layout>
  );
};

interface MenuItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    icon: string;
    path: string;
    color: string;
  };
}

const MenuItem = ({ item }: MenuItemProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={item}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
      onClick={() => navigate(item.path)}
    >
      <Card className="card-glass h-100 text-center p-4 cursor-pointer position-relative overflow-hidden">
        {/* Hover effect overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-0 hover-overlay"
             style={{
               background: 'linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
               transition: 'opacity 0.3s ease',
               opacity: 0
             }}></div>

        {/* Icon */}
        <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
             style={{
               width: '70px',
               height: '70px',
               background: `var(--bs-${item.color})`,
               transition: 'transform 0.3s ease'
             }}>
          <i className={`bi bi-${item.icon} fs-3 text-white`}></i>
        </div>

        {/* Content */}
        <Card.Body className="p-0">
          <h4 className="fw-bold mb-2">{item.title}</h4>
          <p className="text-muted small mb-0">{item.description}</p>
        </Card.Body>

        {/* Bottom indicator */}
        <div className="position-absolute bottom-0 start-0 w-100"
             style={{
               height: '3px',
               background: 'linear-gradient(to right, var(--bs-primary), var(--bs-accent))',
               transform: 'scaleX(0)',
               transformOrigin: 'left',
               transition: 'transform 0.3s ease'
             }}></div>
      </Card>
    </motion.div>
  );
};

export default HomePage;

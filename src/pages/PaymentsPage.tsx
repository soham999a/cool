import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { Card, ProgressBar } from 'react-bootstrap';

const PaymentsPage = () => {
  return (
    <Layout>
      <div className="mb-4">
        <div className="d-flex align-items-center mb-4">
          <div className="me-3 rounded-circle bg-success d-flex align-items-center justify-content-center"
               style={{ width: '48px', height: '48px' }}>
            <i className="bi bi-credit-card text-white fs-4"></i>
          </div>
          <div>
            <h1 className="fw-bold mb-0">
              <span className="text-gradient">Payments</span>
            </h1>
            <p className="text-muted mb-0">Manage your organization's financial transactions</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="row justify-content-center"
        >
          <div className="col-md-10 col-lg-8">
            <Card className="card-glass text-center">
              <Card.Body className="p-5">
                <div className="rounded-circle bg-gradient-primary d-flex align-items-center justify-content-center mx-auto mb-4"
                     style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-credit-card-fill text-white fs-1"></i>
                </div>

                <h2 className="fw-bold mb-3">
                  Payments Feature Coming Soon
                </h2>

                <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '500px' }}>
                  We're working hard to bring you a comprehensive payment management system.
                  This feature will allow you to track payments, generate invoices, and manage financial records.
                </p>

                <div className="mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <ProgressBar
                      now={70}
                      variant="success"
                      style={{ height: '10px' }}
                      className="mb-2"
                    />
                  </motion.div>
                </div>
                <p className="text-muted small">Development progress: 70%</p>
              </Card.Body>
            </Card>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default PaymentsPage;

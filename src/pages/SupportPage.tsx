import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { Card, Button, Row, Col, Accordion } from 'react-bootstrap';

const SupportPage = () => {
  const supportOptions = [
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: 'chat-dots-fill',
      color: 'primary',
      action: 'Start Chat',
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us an email and we will respond within 24 hours',
      icon: 'envelope-fill',
      color: 'info',
      action: 'Send Email',
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Call our dedicated support line for immediate assistance',
      icon: 'telephone-fill',
      color: 'success',
      action: 'Call Now',
    },
  ];

  return (
    <Layout>
      <div className="mb-4">
        <div className="d-flex align-items-center mb-4">
          <div className="me-3 rounded-circle bg-secondary d-flex align-items-center justify-content-center"
               style={{ width: '48px', height: '48px' }}>
            <i className="bi bi-headset text-white fs-4"></i>
          </div>
          <div>
            <h1 className="fw-bold mb-0">
              <span className="text-gradient">Support</span>
            </h1>
            <p className="text-muted mb-0">Get help with your account and technical issues</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: '700px' }}>
            Need help? Our support team is ready to assist you with any technical issues.
          </p>
        </motion.div>

        <Row className="g-4 mb-5">
          {supportOptions.map((option, index) => (
            <Col key={option.id} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-glass h-100 text-center">
                  <Card.Body className="p-4 d-flex flex-column">
                    <div className={`rounded-circle bg-${option.color} d-flex align-items-center justify-content-center mx-auto mb-3`}
                         style={{ width: '70px', height: '70px' }}>
                      <i className={`bi bi-${option.icon} text-white fs-3`}></i>
                    </div>

                    <h3 className="fw-bold mb-2">
                      {option.title}
                    </h3>

                    <p className="text-muted mb-4">
                      {option.description}
                    </p>

                    <Button variant={option.color} className="mt-auto">
                      {option.action}
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="row justify-content-center"
        >
          <div className="col-lg-8">
            <Card className="card-glass">
              <Card.Body className="p-4">
                <h2 className="fw-bold mb-4 text-center">
                  Frequently Asked Questions
                </h2>

                <Accordion defaultActiveKey="0" className="accordion-dark">
                  <Accordion.Item eventKey="0" className="mb-3 bg-transparent border-secondary">
                    <Accordion.Header>
                      How do I add a new member?
                    </Accordion.Header>
                    <Accordion.Body className="text-light-emphasis">
                      Navigate to the Members page and click on the "Add Member" button. Fill in the required information and click "Save".
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1" className="mb-3 bg-transparent border-secondary">
                    <Accordion.Header>
                      Can I export member data?
                    </Accordion.Header>
                    <Accordion.Body className="text-light-emphasis">
                      Yes, you can export member data in CSV or PDF format. Go to the Members page and click on the "Export" button.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2" className="mb-3 bg-transparent border-secondary">
                    <Accordion.Header>
                      How do I reset my password?
                    </Accordion.Header>
                    <Accordion.Body className="text-light-emphasis">
                      Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default SupportPage;

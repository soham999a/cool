import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Form, Button, InputGroup, Alert, Spinner } from 'react-bootstrap';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { signUp, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    clearError();

    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsLoading(true);
      await signUp(email, password, name);
    } catch (err) {
      // Error is handled by the auth context
      console.log('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-100"
    >
      <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        {/* Name field */}
        <Form.Group>
          <InputGroup>
            <InputGroup.Text className="bg-transparent border-end-0">
              <i className="bi bi-person text-primary"></i>
            </InputGroup.Text>
            <Form.Control
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              autoComplete="name"
              className="form-control-dark border-start-0"
              required
            />
          </InputGroup>
        </Form.Group>

        {/* Email field */}
        <Form.Group>
          <InputGroup>
            <InputGroup.Text className="bg-transparent border-end-0">
              <i className="bi bi-envelope text-primary"></i>
            </InputGroup.Text>
            <Form.Control
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              autoComplete="email"
              className="form-control-dark border-start-0"
              required
            />
          </InputGroup>
        </Form.Group>

        {/* Password field */}
        <Form.Group>
          <InputGroup>
            <InputGroup.Text className="bg-transparent border-end-0">
              <i className="bi bi-lock text-primary"></i>
            </InputGroup.Text>
            <Form.Control
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min. 6 characters)"
              autoComplete="new-password"
              className="form-control-dark border-start-0 border-end-0"
              required
            />
            <Button
              variant="dark"
              className="border border-start-0"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              <i className={`bi bi-${showPassword ? 'eye-slash' : 'eye'}`}></i>
            </Button>
          </InputGroup>
        </Form.Group>

        {/* Confirm Password field */}
        <Form.Group>
          <InputGroup>
            <InputGroup.Text className="bg-transparent border-end-0">
              <i className="bi bi-lock-fill text-primary"></i>
            </InputGroup.Text>
            <Form.Control
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              autoComplete="new-password"
              className="form-control-dark border-start-0 border-end-0"
              required
            />
            <Button
              variant="dark"
              className="border border-start-0"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type="button"
            >
              <i className={`bi bi-${showConfirmPassword ? 'eye-slash' : 'eye'}`}></i>
            </Button>
          </InputGroup>
        </Form.Group>

        {/* Error message */}
        {(formError || error) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert variant="danger" className="d-flex align-items-center py-2">
              <i className="bi bi-exclamation-circle me-2"></i>
              <span>{formError || error}</span>
            </Alert>
          </motion.div>
        )}

        {/* Submit button */}
        <div className="mt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-100 btn-gradient-primary position-relative overflow-hidden"
            style={{ height: '48px' }}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" role="status" aria-hidden="true">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <span className="d-flex align-items-center justify-content-center">
                <i className="bi bi-person-plus me-2"></i>
                Create Account
              </span>
            )}

            {/* Button shine effect */}
            <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
              <div
                className="position-absolute shine-effect"
                style={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  transform: 'translateX(-100%)',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                }}
              ></div>
            </div>
          </Button>
        </div>
      </Form>
    </motion.div>
  );
};

export default SignupForm;

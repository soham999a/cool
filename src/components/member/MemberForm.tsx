import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Form, Button, InputGroup, Card, Row, Col } from 'react-bootstrap';
import { Member } from '../../types';

interface MemberFormProps {
  initialData?: Member;
  onSubmit: (data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const MemberForm = ({ initialData, onSubmit, onCancel }: MemberFormProps) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [memberId, setMemberId] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPhoneNumber(initialData.phoneNumber);
      setAddress(initialData.address);
      setMemberId(initialData.memberId);
      setBloodGroup(initialData.bloodGroup);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!memberId.trim()) newErrors.memberId = 'Member ID is required';
    if (!bloodGroup) newErrors.bloodGroup = 'Blood group is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        name,
        phoneNumber,
        address,
        memberId,
        bloodGroup
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="card-glass border-0 shadow">
        <Card.Header className="d-flex justify-content-between align-items-center border-bottom border-secondary">
          <div>
            <h4 className="fw-bold mb-0">
              {initialData ? 'Edit Member' : 'Add New Member'}
            </h4>
            <p className="text-muted small mb-0">
              {initialData ? 'Update member information' : 'Enter member details to add to the system'}
            </p>
          </div>
          <Button
            variant="close"
            onClick={onCancel}
            className="bg-transparent text-light"
            aria-label="Close"
          />
        </Card.Header>

        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Name field */}
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-person"></i>
                </InputGroup.Text>
                <Form.Control
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Phone Number field */}
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-telephone"></i>
                </InputGroup.Text>
                <Form.Control
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (123) 456-7890"
                  required
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Address field */}
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-house"></i>
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  id="address"
                  value={address}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddress(e.target.value)}
                  placeholder="123 Main St, City, Country"
                  required
                  isInvalid={!!errors.address}
                  style={{ minHeight: '80px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Row className="mb-3">
              {/* Member ID field */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Member ID</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-person-badge"></i>
                    </InputGroup.Text>
                    <Form.Control
                      id="memberId"
                      name="memberId"
                      value={memberId}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMemberId(e.target.value)}
                      placeholder="MEM-12345"
                      required
                      isInvalid={!!errors.memberId}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.memberId}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* Blood Group field */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Blood Group</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-droplet-fill text-danger"></i>
                    </InputGroup.Text>
                    <Form.Select
                      id="bloodGroup"
                      value={bloodGroup}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBloodGroup(e.target.value)}
                      required
                      isInvalid={!!errors.bloodGroup}
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.bloodGroup}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button
                variant="secondary"
                onClick={onCancel}
                type="button"
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                type="submit"
              >
                <i className="bi bi-save me-2"></i>
                {initialData ? 'Update' : 'Save'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default MemberForm;

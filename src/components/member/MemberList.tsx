import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Form, Card, InputGroup } from 'react-bootstrap';
import MemberForm from './MemberForm';
import { Member } from '../../types';

interface MemberListProps {
  members: Member[];
  onAddMember: (data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onUpdateMember: (id: string, data: Partial<Omit<Member, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  onDeleteMember: (id: string) => Promise<void>;
  isLoading: boolean;
}

const MemberList = ({
  members,
  onAddMember,
  onUpdateMember,
  onDeleteMember,
  isLoading
}: MemberListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = async (data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => {
    await onAddMember(data);
    setShowAddForm(false);
  };

  const handleUpdateMember = async (data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingMember) {
      await onUpdateMember(editingMember.id, data);
      setEditingMember(null);
    }
  };

  const handleDeleteMember = async (member: Member) => {
    await onDeleteMember(member.id);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between mb-4">
        <div className="d-flex align-items-center mb-3 mb-md-0">
          <div className="bg-gradient-primary p-3 rounded-3 me-3 shadow">
            <i className="bi bi-people-fill text-white fs-4"></i>
          </div>
          <div>
            <h2 className="fw-bold mb-0">
              <span className="text-gradient">Members</span>
            </h2>
            <p className="text-muted small mb-0">Manage your organization members</p>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row gap-3">
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              id="search"
              name="search"
              placeholder="Search members"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Button
            variant="primary"
            onClick={() => setShowAddForm(true)}
            className="align-self-end"
          >
            <i className="bi bi-plus-lg me-2"></i>
            Add Member
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <MemberForm
              onSubmit={handleAddMember}
              onCancel={() => setShowAddForm(false)}
            />
          </motion.div>
        )}

        {editingMember && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <MemberForm
              initialData={editingMember}
              onSubmit={handleUpdateMember}
              onCancel={() => setEditingMember(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredMembers.length > 0 ? (
        <div className="row g-4">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="col-12 col-sm-6 col-lg-4"
            >
              <Card className="card-glass h-100">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{
                           width: '40px',
                           height: '40px',
                           backgroundColor: 'var(--bs-primary)'
                         }}>
                      <i className="bi bi-person-fill text-white"></i>
                    </div>
                    <div>
                      <h5 className="mb-0 fw-bold">{member.name}</h5>
                      <p className="text-muted small mb-0">{member.memberId}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-telephone me-2 text-muted"></i>
                      <span>{member.phoneNumber}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-geo-alt me-2 text-muted"></i>
                      <span>{member.address}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-droplet-fill me-2 text-danger"></i>
                      <span>{member.bloodGroup}</span>
                    </div>
                  </div>

                  <div className="d-flex gap-2 mt-3">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setEditingMember(member)}
                    >
                      <i className="bi bi-pencil me-1"></i> Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteMember(member)}
                    >
                      <i className="bi bi-trash me-1"></i> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-glass p-5 text-center mx-auto"
          style={{ maxWidth: '600px' }}
        >
          <div className="d-flex justify-content-center mb-4">
            <div className="position-relative">
              <div className="rounded-circle bg-dark d-flex align-items-center justify-content-center"
                   style={{ width: '80px', height: '80px' }}>
                <i className="bi bi-people-fill text-primary fs-1"></i>
              </div>
              <div className="position-absolute bottom-0 end-0 rounded-circle bg-gradient-primary d-flex align-items-center justify-content-center shadow"
                   style={{ width: '30px', height: '30px' }}>
                {searchTerm ? (
                  <i className="bi bi-search text-white small"></i>
                ) : (
                  <i className="bi bi-plus text-white small"></i>
                )}
              </div>
            </div>
          </div>

          <h3 className="fw-bold mb-3">
            {searchTerm ? 'No members found' : 'No members yet'}
          </h3>

          <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '400px' }}>
            {searchTerm
              ? `We couldn't find any members matching "${searchTerm}". Try a different search term or clear the search.`
              : "Your organization doesn't have any members yet. Get started by adding your first member to the system."}
          </p>

          {!searchTerm ? (
            <Button
              variant="primary"
              onClick={() => setShowAddForm(true)}
              className="px-4"
            >
              <i className="bi bi-plus-lg me-2"></i>
              Add Your First Member
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => setSearchTerm('')}
              className="px-4"
            >
              <i className="bi bi-x-lg me-2"></i>
              Clear Search
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MemberList;

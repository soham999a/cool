import React from 'react';
import { Member } from '../../types';
import { ListGroup } from 'react-bootstrap';

interface RecentMembersListProps {
  members: Member[];
}

const RecentMembersList: React.FC<RecentMembersListProps> = ({ members }) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBloodGroupColor = (bloodGroup: string): string => {
    switch (bloodGroup) {
      case 'A+': return '#ef4444'; // red-500
      case 'A-': return '#f87171'; // red-400
      case 'B+': return '#3b82f6'; // blue-500
      case 'B-': return '#60a5fa'; // blue-400
      case 'AB+': return '#8b5cf6'; // purple-500
      case 'AB-': return '#a78bfa'; // purple-400
      case 'O+': return '#10b981'; // green-500
      case 'O-': return '#34d399'; // green-400
      default: return '#6b7280'; // gray-500
    }
  };

  if (members.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
        <i className="bi bi-people-fill fs-1 mb-2"></i>
        <p>No members added yet</p>
      </div>
    );
  }

  return (
    <ListGroup className="member-list">
      {members.map((member) => (
        <ListGroup.Item
          key={member.id}
          className="member-item bg-transparent border border-secondary mb-2 position-relative overflow-hidden"
          style={{
            backgroundColor: 'rgba(31, 41, 55, 0.5)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #1f2937, #111827)',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="bi bi-person text-primary"></i>
              </div>

              <div>
                <h6 className="mb-0 fw-medium">{member.name}</h6>
                <div className="d-flex align-items-center text-muted small">
                  <i className="bi bi-person-badge me-1" style={{ fontSize: '0.7rem' }}></i>
                  <span>{member.memberId}</span>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm text-white"
                style={{
                  width: '30px',
                  height: '30px',
                  background: getBloodGroupColor(member.bloodGroup),
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  transition: 'transform 0.3s ease'
                }}
              >
                {member.bloodGroup}
              </div>

              <div className="text-end">
                <div className="text-muted" style={{ fontSize: '0.7rem' }}>Added</div>
                <div className="text-light-emphasis" style={{ fontSize: '0.7rem' }}>{formatDate(member.createdAt)}</div>
              </div>
            </div>
          </div>

          {/* Subtle indicator on hover */}
          <div
            className="position-absolute top-0 start-0 bottom-0 opacity-0 hover-indicator"
            style={{
              width: '3px',
              background: 'var(--bs-primary)',
              borderTopLeftRadius: 'var(--bs-border-radius)',
              borderBottomLeftRadius: 'var(--bs-border-radius)',
              transition: 'opacity 0.3s ease'
            }}
          ></div>

          {/* Shine effect on hover */}
          <div
            className="position-absolute top-0 start-0 end-0 bottom-0 opacity-0 shine-effect"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
              transform: 'translateX(-100%)',
              transition: 'all 1s ease'
            }}
          ></div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default RecentMembersList;

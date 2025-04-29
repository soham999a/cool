import React from 'react';
import { Card } from 'react-bootstrap';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: 'indigo' | 'purple' | 'pink' | 'blue';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const getColor = () => {
    switch (color) {
      case 'indigo':
        return 'var(--bs-primary)';
      case 'purple':
        return 'var(--bs-accent)';
      case 'pink':
        return 'var(--bs-secondary)';
      case 'blue':
        return 'var(--bs-info)';
      default:
        return 'var(--bs-primary)';
    }
  };

  const getIconName = () => {
    switch (icon) {
      case 'people':
        return 'people';
      case 'person_add':
        return 'person-plus';
      case 'water_drop':
        return 'droplet';
      case 'update':
        return 'arrow-clockwise';
      default:
        return icon;
    }
  };

  return (
    <Card className="card-glass h-100 position-relative overflow-hidden">
      {/* Background glow effect */}
      <div
        className="position-absolute top-0 start-0 end-0 bottom-0 rounded opacity-0 hover-overlay"
        style={{
          background: `linear-gradient(to right, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))`,
          filter: 'blur(8px)',
          transition: 'opacity 0.5s ease'
        }}
      ></div>

      <Card.Body className="d-flex align-items-center justify-content-between p-4">
        <div>
          <h6 className="text-muted mb-1">{title}</h6>
          <p className="fs-4 fw-bold mb-0">{value}</p>
        </div>

        <div
          className="d-flex align-items-center justify-content-center rounded p-3 shadow-sm"
          style={{
            background: getColor(),
            width: '48px',
            height: '48px'
          }}
        >
          <i className={`bi bi-${getIconName()} text-white`}></i>
        </div>
      </Card.Body>

      {/* Hover indicator */}
      <div
        className="position-absolute bottom-0 start-0 w-0 hover-indicator"
        style={{
          height: '3px',
          background: 'linear-gradient(to right, var(--bs-primary), var(--bs-accent))',
          transition: 'width 0.3s ease'
        }}
      ></div>
    </Card>
  );
};

export default StatCard;

import React, { useRef } from 'react';
import { Badge, ProgressBar } from 'react-bootstrap';

interface BloodGroupChartProps {
  distribution: Record<string, number>;
}

const BloodGroupChart: React.FC<BloodGroupChartProps> = ({ distribution }) => {
  const chartRef = useRef<HTMLDivElement>(null);

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

  const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);

  if (total === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
        <i className="bi bi-bar-chart-fill fs-1 mb-2"></i>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3" ref={chartRef}>
      {Object.entries(distribution)
        .sort((a, b) => b[1] - a[1])
        .map(([bloodGroup, count], index) => {
          const percentage = Math.round((count / total) * 100);
          const isHighest = index === 0;
          const color = getBloodGroupColor(bloodGroup);

          return (
            <div key={bloodGroup} className="blood-group-item">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle me-2 shadow-sm"
                    style={{
                      width: '18px',
                      height: '18px',
                      background: color,
                      transition: 'transform 0.2s ease'
                    }}
                  ></div>
                  <span className="fw-medium">{bloodGroup}</span>
                </div>
                <div className="d-flex align-items-center">
                  <span className={`small ${isHighest ? 'fw-bold' : 'text-muted'}`}>
                    {count} ({percentage}%)
                  </span>
                  {isHighest && (
                    <Badge bg="secondary" className="ms-2 py-1 px-2" style={{ fontSize: '0.65rem' }}>
                      Highest
                    </Badge>
                  )}
                </div>
              </div>

              <ProgressBar
                now={percentage}
                style={{
                  height: '10px',
                  backgroundColor: 'rgba(31, 41, 55, 0.5)'
                }}
                variant="custom"
              >
                <div
                  className="progress-bar position-relative overflow-hidden"
                  role="progressbar"
                  style={{
                    width: `${percentage}%`,
                    background: color,
                    transition: 'opacity 0.2s ease'
                  }}
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {/* Shine effect */}
                  <div
                    className="position-absolute top-0 start-0 end-0 bottom-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      opacity: 0.2
                    }}
                  ></div>

                  {/* Percentage label for bars with enough space */}
                  {percentage >= 15 && (
                    <span
                      className="position-absolute top-50 start-0 translate-middle-y ms-2 text-white"
                      style={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                    >
                      {percentage}%
                    </span>
                  )}
                </div>
              </ProgressBar>
            </div>
          );
        })}
    </div>
  );
};

export default BloodGroupChart;

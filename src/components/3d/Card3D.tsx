import { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Member } from '../../types';

interface Card3DProps {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
}

const Card3D: React.FC<Card3DProps> = ({ member, onEdit, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate mouse position for 3D effect
  const [{ rotateX, rotateY, scale, shadow }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    shadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    config: { mass: 1, tension: 280, friction: 60 },
  }));

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotX = (y - 0.5) * 10; // -5 to 5 degrees
    const rotY = (x - 0.5) * -10; // -5 to 5 degrees

    api.start({
      rotateX: rotX,
      rotateY: rotY,
      scale: 1.05,
      shadow: '0px 20px 30px rgba(0, 0, 0, 0.2)',
    });
  };

  // Reset card position when mouse leaves
  const handleMouseLeave = () => {
    api.start({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      shadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    });
    setHovered(false);
  };

  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Get blood group color
  const getBloodGroupColor = (bloodGroup: string) => {
    switch (bloodGroup) {
      case 'A+': return 'bg-gradient-to-br from-red-500 to-red-600';
      case 'A-': return 'bg-gradient-to-br from-red-400 to-red-500';
      case 'B+': return 'bg-gradient-to-br from-blue-500 to-blue-600';
      case 'B-': return 'bg-gradient-to-br from-blue-400 to-blue-500';
      case 'AB+': return 'bg-gradient-to-br from-purple-500 to-purple-600';
      case 'AB-': return 'bg-gradient-to-br from-purple-400 to-purple-500';
      case 'O+': return 'bg-gradient-to-br from-green-500 to-green-600';
      case 'O-': return 'bg-gradient-to-br from-green-400 to-green-500';
      default: return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  return (
    <animated.div
      ref={cardRef}
      className="relative glass-effect overflow-hidden rounded-xl border border-gray-800 h-full"
      style={{
        transform: 'perspective(1000px)',
        rotateX,
        rotateY,
        scale,
        boxShadow: shadow,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card content with 3D depth */}
      <div className="p-6 relative h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white transform translate-z-10" style={{ transform: 'translateZ(20px)' }}>
              {member.name}
            </h3>
            <div className="flex items-center mt-1" style={{ transform: 'translateZ(15px)' }}>
              <span className="material-icons text-xs mr-1 text-gray-400">badge</span>
              <p className="text-sm text-gray-400">
                {member.memberId}
              </p>
            </div>
          </div>

          <div
            className={`${getBloodGroupColor(member.bloodGroup)} text-white font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg`}
            style={{ transform: 'translateZ(30px)' }}
          >
            {member.bloodGroup}
          </div>
        </div>

        <div className="space-y-3 mb-6 flex-grow" style={{ transform: 'translateZ(10px)' }}>
          <div className="flex items-center text-gray-300 bg-gray-800 bg-opacity-50 p-3 rounded-lg border border-gray-700">
            <span className="material-icons mr-2 text-indigo-400">phone</span>
            <span>{member.phoneNumber}</span>
          </div>
          <div className="flex items-center text-gray-300 bg-gray-800 bg-opacity-50 p-3 rounded-lg border border-gray-700">
            <span className="material-icons mr-2 text-indigo-400">home</span>
            <span className="line-clamp-1">{member.address}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm mt-2">
            <span className="material-icons mr-2 text-indigo-400 text-sm">calendar_today</span>
            <span>Added: {formatDate(member.createdAt)}</span>
          </div>
        </div>

        {/* Action buttons with hover effect */}
        <div className="flex justify-end space-x-2 mt-4" style={{ transform: 'translateZ(25px)' }}>
          <animated.button
            onClick={() => onEdit(member)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center shadow-md"
            style={{
              scale: hovered ? 1.05 : 1,
            }}
          >
            <span className="material-icons mr-1">edit</span>
            Edit
          </animated.button>

          <animated.button
            onClick={() => onDelete(member.id)}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center shadow-md"
            style={{
              scale: hovered ? 1.05 : 1,
            }}
          >
            <span className="material-icons mr-1">delete</span>
            Delete
          </animated.button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      {/* Glow effect */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-indigo-500 opacity-10 blur-xl"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-500 opacity-10 blur-xl"></div>

      {/* Shine effect on hover */}
      <animated.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 -translate-x-full"
        style={{
          opacity: hovered ? 0.05 : 0,
          transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.8s ease-in-out, opacity 0.2s ease-in-out',
        }}
      />
    </animated.div>
  );
};

export default Card3D;

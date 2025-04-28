import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPhone, FiMapPin, FiDroplet, FiCreditCard } from 'react-icons/fi';
import { Member } from '../../types';

interface MemberCardProps {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
}

const MemberCard = ({ member, onEdit, onDelete }: MemberCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
      onDelete(member);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="card relative overflow-hidden border border-gray-200 dark:border-dark-700"
    >
      {/* Colorful top accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 to-secondary-500" />
      
      <div className="pt-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
        
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <FiCreditCard className="mr-2 text-primary-500" />
            <span>ID: {member.memberId}</span>
          </div>
          
          <div className="flex items-center">
            <FiPhone className="mr-2 text-primary-500" />
            <span>{member.phoneNumber}</span>
          </div>
          
          <div className="flex items-center">
            <FiMapPin className="mr-2 text-primary-500" />
            <span className="truncate">{member.address}</span>
          </div>
          
          <div className="flex items-center">
            <FiDroplet className="mr-2 text-red-500" />
            <span>Blood Group: {member.bloodGroup}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(member)}
            className="p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800"
          >
            <FiEdit2 size={16} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
          >
            <FiTrash2 size={16} />
          </motion.button>
        </div>
      </div>
      
      {/* Animated background effect on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 pointer-events-none"
        />
      )}
    </motion.div>
  );
};

export default MemberCard;

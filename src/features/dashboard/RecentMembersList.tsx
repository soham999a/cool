import React from 'react';
import { Member } from '../../types';

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

  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-400">
        <span className="material-icons text-4xl mb-2">people</span>
        <p>No members added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {members.map((member, index) => (
        <div
          key={member.id}
          className="bg-gray-800 bg-opacity-50 rounded-lg p-4 flex items-center justify-between hover:bg-opacity-70 transition-all duration-300 border border-gray-800 hover:border-indigo-500/30 group relative overflow-hidden transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center mr-4 group-hover:from-indigo-600 group-hover:to-indigo-800 transition-all duration-300 shadow-md">
              <span className="material-icons text-indigo-400 group-hover:text-white transition-colors">person</span>
            </div>

            <div>
              <h3 className="text-white font-medium">{member.name}</h3>
              <div className="flex items-center text-gray-400 text-sm">
                <span className="material-icons text-xs mr-1">badge</span>
                <span>{member.memberId}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 ${getBloodGroupColor(member.bloodGroup)} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md transform group-hover:scale-110 transition-transform`}>
              {member.bloodGroup}
            </div>

            <div className="text-right">
              <div className="text-gray-400 text-xs">Added</div>
              <div className="text-gray-300 text-xs">{formatDate(member.createdAt)}</div>
            </div>
          </div>

          {/* Subtle indicator on hover */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>

          {/* Shine effect on hover */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-5 -translate-x-full group-hover:translate-x-full transition-all duration-1000 transform"></div>
        </div>
      ))}
    </div>
  );
};

export default RecentMembersList;

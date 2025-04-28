import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: 'indigo' | 'purple' | 'pink' | 'blue';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const getGradient = () => {
    switch (color) {
      case 'indigo':
        return 'from-indigo-500 to-indigo-600';
      case 'purple':
        return 'from-purple-500 to-purple-600';
      case 'pink':
        return 'from-pink-500 to-pink-600';
      case 'blue':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-indigo-500 to-indigo-600';
    }
  };

  return (
    <div className="glass-effect p-6 relative overflow-hidden group rounded-xl border border-gray-800 h-full">
      {/* Background glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative flex items-center justify-between">
        <div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
          <p className="text-white text-2xl font-bold">{value}</p>
        </div>

        <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${getGradient()} shadow-lg`}>
          <span className="material-icons text-white">{icon}</span>
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"></div>

      {/* Subtle shine effect */}
      <div className="absolute -inset-x-20 -inset-y-10 w-40 h-40 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-white via-white to-transparent rotate-12 transform-gpu transition-opacity duration-700"></div>
    </div>
  );
};

export default StatCard;

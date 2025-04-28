import React, { useEffect, useRef } from 'react';

interface BloodGroupChartProps {
  distribution: Record<string, number>;
}

const BloodGroupChart: React.FC<BloodGroupChartProps> = ({ distribution }) => {
  const chartRef = useRef<HTMLDivElement>(null);

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

  const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-400">
        <span className="material-icons text-4xl mb-2">bar_chart</span>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" ref={chartRef}>
      {Object.entries(distribution)
        .sort((a, b) => b[1] - a[1])
        .map(([bloodGroup, count], index) => {
          const percentage = Math.round((count / total) * 100);
          const isHighest = index === 0;

          return (
            <div key={bloodGroup} className="space-y-2 group">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full ${getBloodGroupColor(bloodGroup)} mr-2 shadow-md group-hover:scale-110 transition-transform`}></div>
                  <span className="text-white font-medium">{bloodGroup}</span>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm ${isHighest ? 'text-white font-bold' : 'text-gray-400'}`}>
                    {count} ({percentage}%)
                  </span>
                  {isHighest && (
                    <span className="ml-2 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">Highest</span>
                  )}
                </div>
              </div>

              <div className="h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner relative">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-stripes"></div>
                </div>

                {/* Progress bar */}
                <div
                  className={`h-full ${getBloodGroupColor(bloodGroup)} relative group-hover:opacity-90 transition-opacity`}
                  style={{ width: `${percentage}%` }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
                </div>

                {/* Percentage label for bars with enough space */}
                {percentage >= 15 && (
                  <div className="absolute inset-y-0 left-2 flex items-center">
                    <span className="text-white text-xs font-bold">{percentage}%</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BloodGroupChart;

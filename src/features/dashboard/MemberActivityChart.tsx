import React, { useEffect, useState } from 'react';
import { Member } from '../../types';

interface MemberActivityChartProps {
  members: Member[];
}

interface MonthData {
  month: string;
  count: number;
}

const MemberActivityChart: React.FC<MemberActivityChartProps> = ({ members }) => {
  const [monthlyData, setMonthlyData] = useState<MonthData[]>([]);
  const [maxCount, setMaxCount] = useState(0);

  useEffect(() => {
    if (members.length > 0) {
      // Get the last 6 months
      const months: string[] = [];
      const counts: Record<string, number> = {};

      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        // Use abbreviated month format to save space
        const monthStr = month.toLocaleDateString('en-US', { month: 'short' }).substring(0, 3);
        const yearStr = month.getFullYear().toString().substring(2);
        const monthLabel = `${monthStr} ${yearStr}`;

        months.push(monthLabel);
        counts[monthLabel] = 0;
      }

      // Count members per month
      members.forEach(member => {
        const date = new Date(member.createdAt);
        // Use abbreviated month format to save space
        const monthStr = date.toLocaleDateString('en-US', { month: 'short' }).substring(0, 3);
        const yearStr = date.getFullYear().toString().substring(2);
        const monthLabel = `${monthStr} ${yearStr}`;

        if (counts[monthLabel] !== undefined) {
          counts[monthLabel]++;
        }
      });

      // Convert to array for chart
      const data = months.map(month => ({
        month,
        count: counts[month]
      }));

      setMonthlyData(data);
      setMaxCount(Math.max(...Object.values(counts), 5)); // Ensure min height
    }
  }, [members]);

  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-400">
        <span className="material-icons text-4xl mb-2">timeline</span>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="h-64">
      {/* Chart with horizontal layout */}
      <div className="relative h-full flex flex-col">
        {/* Chart grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-t border-gray-700 w-full h-0"></div>
          ))}
        </div>

        {/* Chart content */}
        <div className="flex-1 flex items-end">
          {monthlyData.map((data) => {
            const height = (data.count / maxCount) * 100;
            const isHighest = data.count === maxCount && maxCount > 0;

            return (
              <div key={data.month} className="h-full flex-1 flex flex-col justify-end px-0.5">
                {/* Bar */}
                <div
                  className={`w-full relative group overflow-hidden rounded-t-md ${
                    isHighest ? 'bg-gradient-to-t from-pink-600 to-purple-500' : 'bg-gradient-to-t from-indigo-600 to-purple-500'
                  }`}
                  style={{ height: `${Math.max(height, 5)}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-gray-700 z-20">
                    {data.count} members
                  </div>

                  {/* Glow effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-white opacity-20 rounded-t-md"></div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 -translate-x-full group-hover:translate-x-full transition-all duration-1000 transform"></div>

                  {/* Value label for highest bar */}
                  {isHighest && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-pink-600 rounded-full px-2 py-0.5 shadow-lg">
                      {data.count}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Month labels in separate row */}
        <div className="h-6 flex mt-1">
          {monthlyData.map((data) => (
            <div key={`label-${data.month}`} className="flex-1 text-center">
              <div className="text-[9px] text-gray-400 px-0.5 truncate">
                {data.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberActivityChart;

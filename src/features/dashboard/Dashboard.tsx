import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Member } from '../../types';
import StatCard from './StatCard';
import BloodGroupChart from './BloodGroupChart';
import RecentMembersList from './RecentMembersList';

interface DashboardProps {
  members: Member[];
  isLoading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ members, isLoading }) => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    newMembersThisMonth: 0,
    bloodGroupDistribution: {} as Record<string, number>,
    recentMembers: [] as Member[]
  });

  useEffect(() => {
    if (members.length > 0) {
      // Calculate total members
      const totalMembers = members.length;

      // Calculate new members this month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
      const newMembersThisMonth = members.filter(member => member.createdAt >= startOfMonth).length;

      // Calculate blood group distribution
      const bloodGroupDistribution: Record<string, number> = {};
      members.forEach(member => {
        if (bloodGroupDistribution[member.bloodGroup]) {
          bloodGroupDistribution[member.bloodGroup]++;
        } else {
          bloodGroupDistribution[member.bloodGroup] = 1;
        }
      });

      // Get recent members (last 5)
      const recentMembers = [...members]
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5);

      setStats({
        totalMembers,
        newMembersThisMonth,
        bloodGroupDistribution,
        recentMembers
      });
    }
  }, [members]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <StatCard
            title="Total Members"
            value={stats.totalMembers.toString()}
            icon="people"
            color="indigo"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="h-full"
        >
          <StatCard
            title="New This Month"
            value={stats.newMembersThisMonth.toString()}
            icon="person_add"
            color="purple"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="h-full"
        >
          <StatCard
            title="Most Common Blood Group"
            value={Object.entries(stats.bloodGroupDistribution).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
            icon="water_drop"
            color="pink"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="h-full"
        >
          <StatCard
            title="Last Updated"
            value={members.length > 0 ? new Date(Math.max(...members.map(m => m.updatedAt))).toLocaleDateString() : 'N/A'}
            icon="update"
            color="blue"
          />
        </motion.div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blood Group Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="glass-effect p-6 rounded-xl h-full border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white hover:from-pink-400 hover:to-indigo-400 transition-all duration-300">Blood Groups</h2>
                <p className="text-gray-400 text-sm">Member distribution</p>
              </div>
              <div className="bg-gray-800 p-2 rounded-lg transform transition-transform hover:scale-110 hover:rotate-6 duration-300">
                <span className="material-icons text-pink-400">water_drop</span>
              </div>
            </div>
            <BloodGroupChart distribution={stats.bloodGroupDistribution} />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="glass-effect p-6 rounded-xl h-full border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white hover:from-indigo-400 hover:to-purple-400 transition-all duration-300">Quick Actions</h2>
                <p className="text-gray-400 text-sm">Manage your organization</p>
              </div>
              <div className="bg-gray-800 p-2 rounded-lg transform transition-transform hover:scale-110 hover:rotate-6 duration-300">
                <span className="material-icons text-indigo-400">bolt</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a href="/members" className="glass-effect p-4 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="material-icons text-indigo-400 text-2xl mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">people</span>
                <span className="text-white font-medium relative z-10">Manage Members</span>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300"></div>
              </a>

              <a href="/members" className="glass-effect p-4 rounded-xl border border-gray-700 hover:border-pink-500 transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="material-icons text-pink-400 text-2xl mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">person_add</span>
                <span className="text-white font-medium relative z-10">Add Member</span>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-pink-500 to-pink-600 transition-all duration-300"></div>
              </a>

              <a href="/payments" className="glass-effect p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="material-icons text-purple-400 text-2xl mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">payments</span>
                <span className="text-white font-medium relative z-10">Payments</span>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"></div>
              </a>

              <a href="/support" className="glass-effect p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden group transform hover:-translate-y-1 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="material-icons text-blue-400 text-2xl mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">support</span>
                <span className="text-white font-medium relative z-10">Get Support</span>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"></div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <div className="glass-effect p-6 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white hover:from-blue-400 hover:to-indigo-400 transition-all duration-300">Recent Members</h2>
              <p className="text-gray-400 text-sm">Latest additions to your organization</p>
            </div>
            <div className="bg-gray-800 p-2 rounded-lg transform transition-transform hover:scale-110 hover:rotate-6 duration-300">
              <span className="material-icons text-indigo-400">people</span>
            </div>
          </div>
          <RecentMembersList members={stats.recentMembers} />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

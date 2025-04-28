import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiCreditCard, FiHeadphones } from 'react-icons/fi';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'View analytics and insights about your organization',
      icon: <span className="material-icons text-4xl">dashboard</span>,
      path: '/dashboard',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      id: 'members',
      title: 'Members',
      description: 'Manage your members, add new ones, or update existing records',
      icon: <FiUsers className="text-4xl" />,
      path: '/members',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'payments',
      title: 'Payments',
      description: 'Track payments, generate invoices, and manage financial records',
      icon: <FiCreditCard className="text-4xl" />,
      path: '/payments',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'support',
      title: 'IT Support',
      description: 'Get technical assistance and support for your organization',
      icon: <FiHeadphones className="text-4xl" />,
      path: '/support',
      color: 'from-pink-500 to-purple-600',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome <span className="text-gradient">{user?.displayName ? user.displayName : 'to CoolMember'}</span>!
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Manage your organization efficiently with our modern dashboard
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </Layout>
  );
};

interface MenuItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string;
    color: string;
  };
}

const MenuItem = ({ item }: MenuItemProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={item}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="glass-effect flex flex-col items-center text-center p-6 cursor-pointer rounded-xl border border-gray-800 group relative overflow-hidden h-full"
      onClick={() => navigate(item.path)}
    >
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Icon */}
      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {item.icon}
      </div>

      {/* Content */}
      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-colors duration-300">{item.title}</h2>
      <p className="text-gray-400 text-sm">{item.description}</p>

      {/* Bottom indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </motion.div>
  );
};

export default HomePage;

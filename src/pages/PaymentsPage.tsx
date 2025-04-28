import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { FiCreditCard } from 'react-icons/fi';

const PaymentsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6">
            <FiCreditCard className="text-3xl text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Payments Feature Coming Soon
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
            We're working hard to bring you a comprehensive payment management system. 
            This feature will allow you to track payments, generate invoices, and manage financial records.
          </p>
          
          <div className="w-full h-4 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Development progress: 70%</p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default PaymentsPage;

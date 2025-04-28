import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { FiHeadphones, FiMessageCircle, FiMail, FiPhone } from 'react-icons/fi';

const SupportPage = () => {
  const supportOptions = [
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: <FiMessageCircle className="text-3xl text-white" />,
      color: 'from-purple-500 to-indigo-600',
      action: 'Start Chat',
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us an email and we will respond within 24 hours',
      icon: <FiMail className="text-3xl text-white" />,
      color: 'from-blue-500 to-cyan-600',
      action: 'Send Email',
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Call our dedicated support line for immediate assistance',
      icon: <FiPhone className="text-3xl text-white" />,
      color: 'from-green-500 to-teal-600',
      action: 'Call Now',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-6">
            <FiHeadphones className="text-3xl text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            IT Support
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Need help? Our support team is ready to assist you with any technical issues.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {supportOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card flex flex-col items-center text-center p-8"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center mb-4`}>
                {option.icon}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {option.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {option.description}
              </p>

              <button className="btn-primary mt-auto">
                {option.action}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                How do I add a new member?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Navigate to the Members page and click on the "Add Member" button. Fill in the required information and click "Save".
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Can I export member data?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can export member data in CSV or PDF format. Go to the Members page and click on the "Export" button.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                How do I reset my password?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default SupportPage;

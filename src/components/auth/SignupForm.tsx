import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiUserPlus } from 'react-icons/fi';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { signUp, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsLoading(true);
      await signUp(email, password, name);
    } catch (err) {
      // Error is handled by the auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiUser className="text-indigo-400 group-focus-within:text-indigo-300 transition-colors" />
          </div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-dark-lightest/50 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
            placeholder="Full Name"
            autoComplete="name"
          />
          <div className="absolute inset-0 rounded-lg border border-indigo-500/0 group-focus-within:border-indigo-500/50 pointer-events-none transition-colors"></div>
        </div>

        {/* Email field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="text-indigo-400 group-focus-within:text-indigo-300 transition-colors" />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-dark-lightest/50 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
            placeholder="Email Address"
            autoComplete="email"
          />
          <div className="absolute inset-0 rounded-lg border border-indigo-500/0 group-focus-within:border-indigo-500/50 pointer-events-none transition-colors"></div>
        </div>

        {/* Password field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="text-indigo-400 group-focus-within:text-indigo-300 transition-colors" />
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-dark-lightest/50 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
            placeholder="Password (min. 6 characters)"
            autoComplete="new-password"
          />
          <div className="absolute inset-0 rounded-lg border border-indigo-500/0 group-focus-within:border-indigo-500/50 pointer-events-none transition-colors"></div>
        </div>

        {/* Confirm Password field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="text-indigo-400 group-focus-within:text-indigo-300 transition-colors" />
          </div>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-dark-lightest/50 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
          <div className="absolute inset-0 rounded-lg border border-indigo-500/0 group-focus-within:border-indigo-500/50 pointer-events-none transition-colors"></div>
        </div>

        {/* Error message */}
        {(formError || error) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm font-medium"
          >
            <div className="flex items-start">
              <span className="material-icons text-red-400 mr-2 text-base">error_outline</span>
              <span>{formError || error}</span>
            </div>
          </motion.div>
        )}

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full overflow-hidden group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px] rounded-lg"
          >
            <div className="relative bg-dark-lighter rounded-lg group-hover:bg-transparent transition-colors duration-200 py-3 flex items-center justify-center">
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span className="flex items-center text-white font-medium">
                  <FiUserPlus className="mr-2" />
                  Create Account
                </span>
              )}

              {/* Button shine effect */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div className="absolute -inset-[100%] z-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:animate-[shine_1.5s_ease]"></div>
              </div>
            </div>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SignupForm;

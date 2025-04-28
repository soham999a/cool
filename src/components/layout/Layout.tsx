import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Background3D from '../3d/Background3D';
import Header3D from '../3d/Header3D';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 3D animated background */}
      <Background3D />

      {/* 3D header with glass effect */}
      <Header3D />

      {/* Main content with animation */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex-grow pt-24 pb-12 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>

      {/* Decorative elements */}
      <div className="fixed top-0 right-0 w-1/3 h-1/3 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="fixed top-1/3 left-1/4 w-1/4 h-1/4 bg-pink-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default Layout;

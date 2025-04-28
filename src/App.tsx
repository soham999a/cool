import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MembersPage from './pages/MembersPage';
import PaymentsPage from './pages/PaymentsPage';
import SupportPage from './pages/SupportPage';
import { useEffect } from 'react';

function App() {
  // Add Material Icons link to the document head
  useEffect(() => {
    // Add Material Icons
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    document.head.appendChild(link);

    // Add Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(fontLink);

    // Apply global styles
    document.body.style.fontFamily = "'Inter', sans-serif";
    document.body.style.background = '#111827';
    document.body.style.backgroundImage = `
      radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.1) 0px, transparent 50%),
      radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.1) 0px, transparent 50%),
      radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
      radial-gradient(at 0% 100%, rgba(99, 102, 241, 0.1) 0px, transparent 50%)
    `;
    document.body.style.color = '#f9fafb';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

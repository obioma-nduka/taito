// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import FreelancerDashboard from './pages/FreelancerDashboard';
// import CustomerDashboard from './pages/CustomerDashboard';
// import { AuthContext, AuthProvider } from './context/AuthContext';

// const App = () => {
//     return (
//         <AuthProvider>
//             <Router>
//                 <Navbar />
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
//                     <Route path="/dashboard" element={<DashboardRoute />} />
//                 </Routes>
//             </Router>
//         </AuthProvider>
//     );
// };

// const DashboardRoute = () => {
//     const { user } = useContext(AuthContext);
//     if (!user) return <div>Please log in to access the dashboard.</div>;
//     return user.role === 'freelancer' ? <FreelancerDashboard /> : <CustomerDashboard />;
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

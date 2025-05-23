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
import NavBar from './components/NavBar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<CustomerDashboard />} />
                    <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BankPersonnel from './components/BankPersonnel';
import LoanCustomer from './components/LoanCustomer';
import LoanProvider from './components/LoanProvider';
import './styles.css';

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setUser={setUser} />} />
                <Route path="/dashboard" element={<Dashboard user={user} />} />
                <Route path="/bank-personnel" element={<BankPersonnel />} />
                <Route path="/loan-customer" element={<LoanCustomer />} />
                <Route path="/loan-provider" element={<LoanProvider />} />
            </Routes>
        </Router>
    );
};

export default App;

import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
    return (
        <div>
            <h1>Welcome, {user}</h1>
            <nav>
                <Link to="/bank-personnel">Bank Personnel</Link>
                <Link to="/loan-customer">Loan Customer</Link>
                <Link to="/loan-provider">Loan Provider</Link>
            </nav>
        </div>
    );
};

export default Dashboard;

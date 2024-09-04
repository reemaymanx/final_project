import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';  // Import the CSS file
import '../LoanCustomer.css'; //separate CSS file 
const LoanCustomer = () => {
    const [loans, setLoans] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/customers/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLoans(response.data);
            } catch (error) {
                setError('Failed to fetch loan details.');
            }
        };

        fetchLoans();
    }, []);

    return (
        <div className="container">
            <h2>Welcome Loan Customer</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h3>Loan Details</h3>
            <ul>
                {loans.map((loan) => (
                    <li key={loan.id}>
                        Loan ID: {loan.id}, Amount: ${loan.loan_amount}, Term: {loan.loan_term_months} months, Status: {loan.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LoanCustomer;

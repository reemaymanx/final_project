import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';  //general styling file //
import '../LoanProvider.css'; // CSS file for LoanProvider//

const LoanProvider = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/applications/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setApplications(response.data);
            } catch (error) {
                setError('Failed to fetch applications.');
            }
        };

        fetchApplications();
    }, []);

    return (
        <div className="loan-provider"> 
            <h2>Welcome Loan Provider</h2>
            {error && <p>{error}</p>}
            <h3>Fund Requests</h3>
            <ul>
                {applications.map((app) => (
                    <li key={app.id}>
                        Application ID: {app.id}, Fund Amount: ${app.amount_requested}, Status: {app.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LoanProvider;

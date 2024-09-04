import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles.css';  
import '../BankPersonnel.css'

const BankPersonnel = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found');
                    return;
                }

                const response = await axios.get('http://localhost:8000/api/applications/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setApplications(response.data);
            } catch (error) {
                setError('Failed to fetch applications.');
                console.error(error);  // Log the error for debugging
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleUpdateStatus = async (applicationId, status) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                return;
            }

            await axios.patch(
                `http://localhost:8000/api/applications/${applicationId}/`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Update the local state to reflect the status change
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.id === applicationId ? { ...app, status } : app
                )
            );
        } catch (error) {
            setError('Failed to update application status.');
            console.error(error);  // Log the error for debugging
        }
    };

    return (
        <div className="container">
            <h2>Bank-Personnel</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h3>Applications</h3>
                    <ul>
                        {applications.map((app) => (
                            <li key={app.id}>
                                Application ID: {app.id}, Amount Requested: ${app.amount_requested}, Status: {app.status}, Request Type: {app.request_type}
                                <button
                                    onClick={() => handleUpdateStatus(app.id, 'Accepted')}
                                    style={{ marginLeft: '10px', backgroundColor: 'green', color: 'white' }}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleUpdateStatus(app.id, 'Rejected')}
                                    style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                                >
                                    Reject
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default BankPersonnel;

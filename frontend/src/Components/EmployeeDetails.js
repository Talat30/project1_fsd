
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetEmployeeDetailsById } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState({});

    const fetchEmployeeDetails = async () => {
        try {
            const data = await GetEmployeeDetailsById(id);
            setEmployee(data);
        } catch (err) {
            toast.error('Failed to fetch employee details. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };

    useEffect(() => {
        fetchEmployeeDetails();
    }, [id]);

    if (!employee) {
        return <div>Employee not found</div>;
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#e9ecef',
            fontFamily: '"Poppins", sans-serif',
            padding: '20px'
        }}>
            {/* Main Container */}
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                padding: '25px',
                width: '90%',
                maxWidth: '800px',
                animation: 'fadeIn 0.8s ease-in-out'
            }}>
                {/* Card Header */}
                <div style={{
                    backgroundColor: '#2575fc',
                    color: '#ffffff',
                    padding: '15px',
                    borderRadius: '10px 10px 0 0',
                    textAlign: 'center',
                    marginBottom: '20px'
                }}>
                    <h2 style={{ margin: 0 }}>Employee Details</h2>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                        {/* Employee Image */}
                        <div style={{ flex: 1 }}>
                            <img
                                src={employee.profileImage}
                                alt={employee.name}
                                style={{
                                    width: '100%',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                        </div>

                        {/* Employee Details */}
                        <div style={{ flex: 2 }}>
                            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>{employee.name}</h3>
                            <p style={{ marginBottom: '10px' }}>
                                <strong style={{ color: '#2575fc' }}>Email:</strong> {employee.email}
                            </p>
                            <p style={{ marginBottom: '10px' }}>
                                <strong style={{ color: '#2575fc' }}>Phone:</strong> {employee.phone}
                            </p>
                            <p style={{ marginBottom: '10px' }}>
                                <strong style={{ color: '#2575fc' }}>Department:</strong> {employee.department}
                            </p>
                            <p style={{ marginBottom: '10px' }}>
                                <strong style={{ color: '#2575fc' }}>Salary:</strong> {employee.salary}
                            </p>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button
                            style={{
                                backgroundColor: '#2575fc',
                                color: '#ffffff',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: '500',
                                transition: 'background-color 0.3s ease, transform 0.2s ease',
                                boxShadow: '0 4px 6px rgba(37, 117, 252, 0.2)'
                            }}
                            onClick={() => navigate('/employee')}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#6a11cb';
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#2575fc';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            Back to Employee List
                        </button>
                    </div>
                </div>
            </div>

            {/* Global Styles for Animations */}
            <style>
                {`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
        </div>
    );
};

export default EmployeeDetails;
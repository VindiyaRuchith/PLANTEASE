import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                const response = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token from localStorage
        localStorage.removeItem('user'); // Clear user info if stored
        window.location.href = '/'; // Redirect to home or login
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-xl font-semibold text-gray-700">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-xl font-semibold text-red-600">Error loading user details.</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-blue-100">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-tr from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md mb-6">
                        {user.username[0].toUpperCase()}
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Welcome, {user.username}!</h2>
                    <p className="text-sm text-gray-500 mb-8 text-center">
                        Below are your account details. Manage your profile and logout securely.
                    </p>
                </div>
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-600">Username</p>
                    <p className="text-lg font-semibold text-gray-800 bg-gray-50 p-3 rounded-md border border-gray-200">
                        {user.username}
                    </p>
                </div>
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-lg font-semibold text-gray-800 bg-gray-50 p-3 rounded-md border border-gray-200">
                        {user.email}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-4 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 shadow-md transition duration-150 ease-in-out"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Account;

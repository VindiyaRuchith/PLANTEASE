import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password, confirmPassword } = formData;

        let errors = {};
        if (!username) errors.username = "Username is required";
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";
        if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://localhost:5000/api/auth/signup", {
                    username,
                    email,
                    password,
                });

                if (response.status === 201) {
                    alert("Signup successful!");
                    navigate('/login'); // Redirect to login page
                }
            } catch (error) {
                console.error(error);
                alert("Signup failed. Please try again.");
            }
        }
    };

    const handleGuestLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/guest');

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                navigate('/home'); // Redirect to home page
            } else {
                alert('Guest login failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Error during guest login.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Create Your Account</h2>
                <form onSubmit={handleSubmit}>
                    {[
                        { label: "Username", name: "username", type: "text" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Password", name: "password", type: "password" },
                        { label: "Confirm Password", name: "confirmPassword", type: "password" },
                    ].map((field) => (
                        <div className="mb-4" key={field.name}>
                            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                            {errors[field.name] && (
                                <span className="text-red-500 text-sm">{errors[field.name]}</span>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                    >
                        Sign Up
                    </button>
                </form>
                <button
                    onClick={handleGuestLogin}
                    className="mt-4 w-full py-2 px-4 bg-gray-100 text-green-600 rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-green-500"
                >
                    Continue as Guest
                </button>
                <button
                    onClick={() => navigate('/login')}
                    className="mt-4 w-full py-2 px-4 bg-green-200 text-green-700 rounded-md hover:bg-green-300 focus:ring-2 focus:ring-green-500"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Signup;

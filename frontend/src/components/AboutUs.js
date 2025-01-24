import React from 'react';
import { FaSeedling, FaBrain, FaEnvelope, FaLeaf } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <div className="bg-gradient-to-b from-green-200 to-green-500 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-2xl p-10 max-w-5xl text-center">
                {/* Hero Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-green-700 mb-4">
                        Welcome to <span className="text-green-900">PLANT-EASE</span>
                    </h1>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Transforming cinnamon plantation health with the power of AI. 
                        We are dedicated to helping Sri Lanka’s farmers protect their crops and livelihoods.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mission Section */}
                    <div className="bg-green-100 rounded-lg p-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                        <h2 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-4">
                            <FaSeedling className="text-green-500 text-3xl" /> Our Mission
                        </h2>
                        <p className="text-gray-600">
                            Empower cinnamon plantation workers with easy-to-use tools for disease detection. 
                            PLANT-EASE ensures accurate, explainable results to improve decision-making.
                        </p>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="bg-green-100 rounded-lg p-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                        <h2 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-4">
                            <FaBrain className="text-green-500 text-3xl" /> Why Choose PLANT-EASE?
                        </h2>
                        <ul className="text-gray-600 list-disc list-inside">
                            <li>AI-powered disease detection.</li>
                            <li>Explainable visual results with XAI.</li>
                            <li>Tailored for Sri Lanka’s cinnamon plantations.</li>
                            <li>Easy-to-use, reliable, and accurate.</li>
                        </ul>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-green-200 rounded-lg p-6 mt-8 shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                    <h2 className="text-xl font-bold text-green-800 flex items-center gap-2 mb-4">
                        <FaEnvelope className="text-green-600 text-3xl" /> Get in Touch
                    </h2>
                    <p className="text-gray-700">
                        We are always looking to improve PLANT-EASE. 
                        If you have feedback, suggestions, or need help, feel free to reach out!
                    </p>
                    <p className="text-green-900 font-semibold mt-2">Email: support@plant-ease.com</p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-10 text-center">
                <FaLeaf className="text-green-700 text-5xl mx-auto mb-2" />
                <p className="text-white text-sm">© 2024 PLANT-EASE | Empowering Cinnamon Farmers</p>
            </div>
        </div>
    );
};

export default AboutUs;

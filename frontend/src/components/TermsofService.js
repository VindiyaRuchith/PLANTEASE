import React from 'react';
import { FaFileContract, FaShieldAlt, FaLock, FaGavel } from 'react-icons/fa';

const TermsOfService = () => {
    return (
        <div className="bg-gradient-to-b from-blue-200 to-blue-500 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-2xl p-10 max-w-5xl text-center">
                {/* Hero Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Thank you for choosing <span className="text-blue-900 font-bold">PLANT-EASE</span>.
                        By using our platform, you agree to comply with these terms to ensure a safe and effective service for all users.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Acceptance of Terms */}
                    <div className="bg-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                        <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2 mb-4">
                            <FaFileContract className="text-blue-500 text-3xl" /> Acceptance of Terms
                        </h2>
                        <p className="text-gray-600">
                            By accessing PLANT-EASE, you accept these terms and our Privacy Policy. If you do not agree, please discontinue using the platform.
                        </p>
                    </div>

                    {/* User Responsibilities */}
                    <div className="bg-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                        <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2 mb-4">
                            <FaShieldAlt className="text-blue-500 text-3xl" /> User Responsibilities
                        </h2>
                        <p className="text-gray-600">
                            Maintain confidentiality of your account and ensure the accuracy of all provided information. Misuse of the platform may result in suspension.
                        </p>
                    </div>

                    {/* Intellectual Property */}
                    <div className="bg-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                        <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2 mb-4">
                            <FaLock className="text-blue-500 text-3xl" /> Intellectual Property
                        </h2>
                        <p className="text-gray-600">
                            All content, including visuals and algorithms, is the intellectual property of PLANT-EASE. Unauthorized use is strictly prohibited.
                        </p>
                    </div>

                    {/* Limitation of Liability */}
                    <div className="bg-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                        <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2 mb-4">
                            <FaGavel className="text-blue-500 text-3xl" /> Limitation of Liability
                        </h2>
                        <p className="text-gray-600">
                            PLANT-EASE is not responsible for damages arising from platform usage. Consult professionals for critical decisions.
                        </p>
                    </div>
                </div>

                {/* Changes to Terms */}
                <div className="bg-blue-200 rounded-lg p-6 mt-8 shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                    <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-4">
                        <FaFileContract className="text-blue-600 text-3xl" /> Changes to Terms
                    </h2>
                    <p className="text-gray-700">
                        We may update these terms at any time. Continued use of the platform indicates your acceptance of any changes.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-10 text-center">
                <FaGavel className="text-blue-700 text-5xl mx-auto mb-2" />
                <p className="text-white text-sm">© 2024 PLANT-EASE | Safeguarding Your Plantation Success</p>
            </div>
        </div>
    );
};

export default TermsOfService;

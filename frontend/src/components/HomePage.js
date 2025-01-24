import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
    const backgroundStyle = {
        backgroundImage: "url('/images/R.jpg')", // Adjust to your actual image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        position: "relative",
        zIndex: 0,
    };

    const overlayStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4))",
        zIndex: 1,
    };

    const contentStyle = {
        position: "relative",
        zIndex: 2,
    };

    const slides = [
        { title: "Scan Leaf", link: "/scan", description: "Analyze leaves for diseases with AI assistance.", gradient: "from-green-400 to-green-600" },
        { title: "History", link: "/history", description: "View your previous scans and their results.", gradient: "from-blue-400 to-blue-600" },
        { title: "About Us", link: "/about", description: "Learn more about our mission and technology.", gradient: "from-purple-400 to-purple-600" },
        { title: "Terms of Service", link: "/terms", description: "Understand the terms of using this application.", gradient: "from-red-400 to-red-600" },
        { title: "Account", link: "/account", description: "Manage your account and preferences.", gradient: "from-yellow-400 to-yellow-600" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div style={backgroundStyle}>
            <div style={overlayStyle}></div>
            <div style={contentStyle} className="min-h-screen flex flex-col items-center justify-between py-10 px-4">
                {/* Navigation Bar */}
                <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-md z-10">
                    <div className="container mx-auto flex items-center justify-between py-4 px-6">
                        <h1 className="text-white text-3xl font-bold tracking-wide">
                            Plant<span className="text-green-400">Ease</span>
                        </h1>
                        <ul className="flex space-x-6">
                            <li>
                                <a href="/" className="text-white text-lg hover:text-green-400 transition">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/scan" className="text-white text-lg hover:text-green-400 transition">
                                    Scan Leaf
                                </a>
                            </li>
                            <li>
                                <a href="/history" className="text-white text-lg hover:text-green-400 transition">
                                    History
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-white text-lg hover:text-green-400 transition">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="text-white text-lg hover:text-green-400 transition">
                                    Terms
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Header Section */}
                <div className="text-center text-white mt-16 animate-fadeIn">
                    <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg">
                        Plant-Ease
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
                        Empowering farmers and gardeners with advanced AI technology to detect and manage plant diseases effectively.
                    </p>
                    <a 
                        href="/scan" 
                        className="px-6 py-3 bg-green-500 text-white font-bold rounded-md shadow-md hover:bg-green-600 transition"
                    >
                        Get Started
                    </a>
                </div>

                {/* Carousel Section */}
                <div className="w-4/5 max-w-3xl mt-10">
                    <Slider {...settings}>
                        {slides.map((slide, index) => (
                            <div key={index} className="p-6">
                                <div
                                    className={`bg-gradient-to-r ${slide.gradient} text-white rounded-lg shadow-lg p-8 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300`}
                                >
                                    <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                                    <p className="mb-6">{slide.description}</p>
                                    <a
                                        href={slide.link}
                                        className="inline-block px-6 py-3 bg-white text-gray-800 font-semibold text-lg rounded-md hover:bg-gray-100 transition"
                                    >
                                        Explore {slide.title}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Footer Section */}
                <footer className="text-center text-white text-sm mt-10">
                    <p>© 2024 Plant-Ease. All Rights Reserved.</p>
                    <div className="mt-2 flex justify-center space-x-4">
                        <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
                        <a href="/contact" className="hover:text-gray-300">Contact Us</a>
                        <a href="/terms" className="hover:text-gray-300">Terms of Service</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;

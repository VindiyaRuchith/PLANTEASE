import React, { useState } from 'react';

const ScanLeaf = () => {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please upload an image first!");
            return;
        }

        const formData = new FormData();
        formData.append('file', image);

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const filteredResult = Object.entries(data)
                .filter(([key]) => key !== "heatmap")
                .reduce((max, entry) => (entry[1] > max[1] ? entry : max), ["None", 0]);

            const highestClass = {
                classification: filteredResult[0],
                confidence: filteredResult[1],
                heatmap: data.heatmap || null,
            };

            setResult(highestClass);
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred while processing the image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-blue-50 p-6">
            <h1 className="text-5xl font-extrabold text-green-700 mb-6 text-center tracking-wide">
                🌿 Scan a Leaf
            </h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border-t-4 border-green-600">
                <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Upload an Image</h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full mb-4 text-sm text-gray-600 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition"
                />
                <button
                    type="submit"
                    className={`w-full py-3 px-6 text-lg text-white font-semibold rounded-lg shadow-md transition ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Upload and Analyze"}
                </button>
            </form>

            {error && (
                <div className="text-red-600 mt-6 text-center bg-red-50 p-4 rounded-lg shadow-sm border border-red-200">
                    {error}
                </div>
            )}

            {result && (
                <div className="mt-8 w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-green-600 text-white text-center py-4">
                        <h2 className="text-2xl font-extrabold">Analysis Result</h2>
                    </div>
                    <div className="p-6 text-center">
                        <p className="text-lg font-semibold text-gray-700">
                            Classification:{" "}
                            <span className="text-green-600 font-bold">{result.classification}</span>
                        </p>
                        <p className="text-lg font-semibold text-gray-700 mt-2">
                            Confidence:{" "}
                            <span className="text-green-600 font-bold">{(result.confidence * 100).toFixed(2)}%</span>
                        </p>

                        {result.heatmap && (
                            <div className="mt-6">
                                <h3 className="text-lg font-bold text-gray-600 mb-2">Heatmap</h3>
                                <img
                                    src={`data:image/png;base64,${result.heatmap}`}
                                    alt="Heatmap"
                                    className="mt-4 max-w-full rounded-lg shadow-sm"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScanLeaf;

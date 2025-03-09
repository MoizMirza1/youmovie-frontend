import React, { useEffect, useState } from "react";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import loadingAnimation from "../../Assets/animations/loading.json"; 

const StreamingProviders = ({ movieId }) => {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
              
    
                const response = await axios.get(`https://youmovie-production.up.railway.app/api/tmdb/movie/${movieId}/providers`);
    
                if (response.data?.results?.US) {
                    const usProviders = response.data.results.US;
                    const allProviders = [
                        ...(usProviders.flatrate || []),
                        ...(usProviders.rent || []),
                        ...(usProviders.buy || []),
                    ];
                    setProviders(allProviders.slice(0, 4)); // Show only 4 providers
                } else {
                    setProviders([]);
                }
            } catch (error) {
                console.error("Error fetching streaming providers:", error);
                setError("Failed to fetch streaming providers. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchProviders();
    }, [movieId]);
    
    return (
        <div className="p-6 bg-black shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Available On</h2>

            {/* Show Lottie Animation while fetching data */}
            {loading && (
                <div className="flex flex-col items-center">
                    <Player autoplay loop src={loadingAnimation} style={{ height: "150px", width: "150px" }} />
                </div>
            )}

            {/* Error Handling */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Show Skeleton Loaders while fetching provider icons & names */}
            {!loading && providers.length === 0 && <p className="text-gray-400">No streaming providers available for this movie.</p>}

            {!loading && providers.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {providers.map((provider, index) => (
                        <div key={provider.provider_id || index} className="flex flex-col items-center">
                            {loading ? (
                                <Skeleton width={64} height={64} circle={true} />
                            ) : (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                                    alt={provider.provider_name}
                                    className="w-16 h-16 rounded-lg object-cover shadow-md hover:scale-105 transition-transform duration-200"
                                />
                            )}
                            <p className="text-sm mt-2 text-gray-300">
                                {loading ? <Skeleton width={80} height={10} /> : provider.provider_name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StreamingProviders;

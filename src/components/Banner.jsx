import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ImageBanner = () => {
    const [imageData, setImageData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fake API data
        const fakeData = {
            imageUrl: "https://via.placeholder.com/1920x1080",
            altText: "Fake Banner Image",
            link: "/target-page",
        };

        // Simulate API call delay
        setTimeout(() => {
            setImageData(fakeData);
        }, 1000);
    }, []);

    if (!imageData) {
        return <div>Loading...</div>;
    }

    const handleBannerClick = () => {
        navigate(imageData.link);
    };

    return (
        <div>
            <div style={{
                fontFamily: "'Arial Black', Arial, sans-serif",
                fontWeight: "bold",
                fontStyle: "italic",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
            }}>
                <h5>Hot News</h5>
            </div>

            <img
                src={imageData.imageUrl}
                alt={imageData.altText}
                style={{ width: "100%", height: "auto", textAlign: "center", cursor: "pointer" }}
                onClick={handleBannerClick}
            />
        </div>
    );
};

export default ImageBanner;

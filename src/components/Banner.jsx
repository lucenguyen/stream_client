import React from "react";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";

const ImageBanner = () => {
    const newsData = useSelector((state) => state.channels).news || [];
    const bannerData = (newsData || [])
        .slice(0, 3)
        .map((item) => ({
            imageUrl: item.images && item.images[0] ? item.images[0].url : "",
            altText: item.headline,
            link: item.links?.web?.href || "#",
        }))
        .filter((item) => item.imageUrl);

    const handleBannerClick = (link) => {
        window.open(link, "_blank");
    };

    if (bannerData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-100">
            <div className="hot-news-title">
                <h1>Hot news</h1>
            </div>

            <Image
                src={bannerData[0].imageUrl}
                alt={bannerData[0].altText}
                className="banner-image"
                onClick={() => handleBannerClick(bannerData[0].link)}
            />
        </div>
    );
};

export default ImageBanner;

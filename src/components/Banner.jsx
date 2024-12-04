import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import ChannelListAPI from "../../src/api/ChannelListAPI";

const ImageBanner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await ChannelListAPI.getNews();
                if (response && response.data && Array.isArray(response.data)) {
                    const topImages = response.data.slice(0, 3).map(item => ({
                        imageUrl: item.images && item.images[0] ? item.images[0].url : "",
                        altText: item.headline,
                        link: item.links?.web?.href || "#",
                    }));
                    setBannerData(topImages);
                } else {
                    setBannerData([]);
                }
            } catch (error) {
                setBannerData([]);
            }
        };

        fetchNews();
    }, []);

    const handleBannerClick = (link) => {
        window.open(link, "_blank");
    };

    if (bannerData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="hot-news-title">
                <h5>Hot news</h5>
            </div>

            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                className="swiper-container"
            >
                {bannerData.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={item.imageUrl}
                            alt={item.altText}
                            className="swiper-image"
                            onClick={() => handleBannerClick(item.link)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImageBanner;

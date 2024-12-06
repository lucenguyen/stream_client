import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../store/actions/channelActions";

const ImageBanner = () => {
    const dispatch = useDispatch();

    const newsData = useSelector((state) => state.channels.news || []);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

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
        <div>
            <div className="hot-news-title">
                <h5>Hot News</h5>
            </div>

            <Swiper spaceBetween={10} slidesPerView={1} className="swiper-container">
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

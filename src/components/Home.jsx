import ChannelList from "./ChannelList";
// import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import News from "./News";
import FeaturedArticles from "./FeaturedArticles";
import ImageBanner from "./Banner";
import ScrollButtons from "./ScrollButtons";

function Home() {
    // const [isScrollable, setIsScrollable] = useState(true);
    // useEffect(() => {
    //     const handleResize = () => {
    //         const width = window.innerWidth;
    //         if (width < 768) {
    //             setIsScrollable(false);
    //         } else {
    //             setIsScrollable(true);
    //         }
    //     };
    //     handleResize();
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    return (
        <>
            <Col xs={12}>
                <div className="d-flex mx-5 home-page">
                    <div className="main-content ">
                        <div className="m-lg-4 d-flex">
                            <ImageBanner id="banner" />
                        </div>
                        <div className="ads-1">
                            ads
                        </div>
                        <div className="m-lg-4" id="channel-list-section">
                            <ChannelList scroll={false} />
                        </div>
                        <div className="ads-2">
                            ads
                        </div>
                    </div>

                    <div className="sidebar">
                        <div className="m-lg-4" id="news-section">
                            <News />
                        </div>
                        <div className="ads-3">
                            ads
                        </div>
                         <div className="m-lg-4" id="featured-articles-section">
                             <FeaturedArticles />
                         </div>
                    </div>
                </div>
                <div>
                    <ScrollButtons></ScrollButtons>
                </div>
            </Col>
        </>
    );
}

export default Home;

import ChannelList from "./ChannelList";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchChannels } from "../store/actions/channelActions";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Col, NavDropdown, Nav } from "react-bootstrap";
import News from "./News";
import FeaturedArticles from "./FeaturedArticles";
import ImageBanner from "./Banner";

function Home() {
    const dispatch = useDispatch();
    const [isScrollable, setIsScrollable] = useState(true);

    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setIsScrollable(false);
            } else {
                setIsScrollable(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Home Page</title>
                </Helmet>
            </HelmetProvider>

            <Col xs={12}>
                <div className="d-flex mx-5 home-page">
                    <div className="main-content">
                        <div className="m-lg-4">
                            <ImageBanner id="banner" />
                        </div>
                        <div className="m-lg-4" id="channel-list-section">
                            <ChannelList scroll={isScrollable} />
                        </div>
                    </div>

                    <div className="sidebar">
                        <div className="m-lg-4" id="news-section">
                            <News />
                        </div>
                        {/* <div className="m-lg-4" id="featured-articles-section"> */}
                        {/*     <FeaturedArticles /> */}
                        {/* </div> */}
                    </div>
                </div>
            </Col>
        </>
    );
}

export default Home;

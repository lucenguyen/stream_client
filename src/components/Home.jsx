import ChannelList from "./ChannelList";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchChannels } from "../store/actions/channelActions";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {Col, NavDropdown, Nav, Container, Row} from "react-bootstrap";
import News from "./News";
import FeaturedArticles from "./FeaturedArticles";
import ImageBanner from "./Banner";
import ScrollButtons from "./ScrollButtons";

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

            <Container fluid className="home-page px-5">
                <Row>
                    {/* Main Content */}
                    <Col xs={12} md={7} lg={8} className="main-content">
                        <div className="m-lg-4">
                            <ImageBanner id="banner" />
                        </div>
                        <div className="ads-1">
                            ads
                        </div>
                        <div className="m-lg-4" id="channel-list-section">
                            <ChannelList scroll={isScrollable} />
                        </div>
                        <div className="ads-2">
                            ads
                        </div>
                    </Col>

                    {/* Sidebar */}
                    <Col xs={12} md={5} lg={4} className="sidebar">
                        <div className="m-lg-4" id="news-section">
                            <News />
                        </div>
                        <div className="ads-3">
                            ads
                        </div>
                        <div className="m-lg-4" id="featured-articles-section">
                            <FeaturedArticles />
                        </div>
                    </Col>
                </Row>

                <div>
                    <ScrollButtons />
                </div>
            </Container>
        </>
    );
}

export default Home;

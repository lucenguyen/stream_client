import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import ChannelList from "./ChannelList";
import React, {useEffect, useState} from "react";
import News from "./News";
import {Col, Container, Row} from "react-bootstrap";
import {Helmet, HelmetProvider} from "react-helmet-async";

function StreamDetail() {
    const {group} = useParams();
    const listChannels = useSelector((state) => state.channels).channels;
    const [channels, setChannels] = useState([]);
    const [desktop, setDesktop] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 1024) {
                setDesktop(false);
            } else {
                setDesktop(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if (listChannels) {
            const channelsFilter = listChannels.filter((channel) => channel.group.replace(/\s+/g, "-").toLowerCase() === group);
            setChannels(channelsFilter);

        }
    }, [listChannels, group]);
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>WATCH {group.replace("-", " ").toUpperCase()}</title>
                    <meta name="description" content={`Watch ${group.replace("-", " ")} page`}/>
                    <link rel="canonical" href={`https://usasport.live/watch/${group}`}/>
                </Helmet>
            </HelmetProvider>
            <Container fluid className={`px-5 ${desktop ? 'w-75' : ''}`}>
                <Row>
                    {/* Main Content */}
                    <Col xs={12} md={7} lg={8} className="main-content">
                        {/*<div className="ads-1">*/}
                        {/*    ads*/}
                        {/*</div>*/}
                        <div className="m-lg-4" id="channel-list-section">
                            <ChannelList channels={channels} readMore={false}/>
                        </div>
                    </Col>

                    {/* Sidebar */}
                    <Col xs={12} md={5} lg={4} className="sidebar">
                        <div className="m-lg-4" id="news-section">
                            <News/>
                        </div>
                        {/*<div className="ads-3">*/}
                        {/*    ads*/}
                        {/*</div>*/}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default StreamDetail;
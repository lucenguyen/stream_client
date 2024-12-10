import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ChannelList from "./ChannelList";
import ClapprPlayer from "./ClapprPlayer";
import moment from 'moment-timezone';
import {useSelector} from "react-redux";
import {Button, Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import News from "./News";
import {FaAngleDoubleRight} from "react-icons/fa";
import {Helmet, HelmetProvider} from "react-helmet-async";

function StreamChannel() {
    const {name, group} = useParams();
    const navigate = useNavigate();
    const [selectedChannel, setSelectedChannel] = useState();
    const [sourceLive, setSourceLive] = useState();
    const [logo, setLogo] = useState();
    const [currentChannel, setCurrentChannel] = useState();
    const [listChannels, setListChannels] = useState([]);
    const [liveChannels, setLiveChannels] = useState([]);
    const {channels} = useSelector((state) => state.channels);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setTablet] = useState(false);

    useEffect(() => {
        if (channels.length === 0) {
            navigate("/");
        }
    }, [channels, navigate]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 850) {
                setIsMobile(true);
            } else if (width > 850 && width < 1030) {
                setIsMobile(false);
                setTablet(true);
            } else {
                setIsMobile(false);
                setTablet(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const channel = channels.find((channel) => channel.name.replace(/\s+/g, '-').toLowerCase() === name);
        if (channel) {
            setCurrentChannel(channel);
            setLogo(channel.logoUrl);
            const programmes = channel.programmes ? channel.programmes : [];
            let idProg = 0;
            for (const prog of programmes) {
                const utcStart = moment(prog.start, 'YYYYMMDDHHmmss Z')
                const utcStop = moment(prog.stop, 'YYYYMMDDHHmmss Z')
                const localTimeStart = utcStart.tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss');
                const localTimeStop = utcStop.tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss');
                prog.start = localTimeStart;
                prog.stop = localTimeStop;
                prog.timeZoneOffset = utcStart.tz(moment.tz.guess()).format("Z");
                prog.id = idProg++;
            }
            channel.programmes = programmes;
            setSelectedChannel(channel);
            const id = channel.id;
            setSourceLive(`https://usasport.live/api/m3u8/${id}/${id}.m3u8`)
        } else {
            navigate("/");
        }
    }, [channels, name, navigate]);

    useEffect(() => {
        if (channels) {
            const channelsFilter = channels.filter((channel) => channel.group.replace(/\s+/g, "-").toLowerCase() === group);
            const liveChannels = channels.filter((channel) => channel.isLive === true);
            setListChannels(channelsFilter);
            setLiveChannels(liveChannels);
        }
    }, [channels, group]);

    const selectedChannelEvent = (channel) => {
        if (channel && !channel.isLive) {
            toast.warn("Stream does not available");
        } else {
            navigate(`/watch/${channel.group.replace(/\s+/g, "-").toLowerCase()}/${channel.name.replace(/\s+/g, "-").toLowerCase()}`);
        }
    }
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta name="DC.publisher" content="USA Sport Live"/>
                    <meta name="DC.created" content="2024"/>
                    <meta name="DC.description"
                          content={`Watch ${currentChannel?.name}`}/>
                    <meta property="og:locale" content="en_US"/>
                    <meta property="og:title" content={currentChannel?.name}/>
                    <meta property="og:image" content={`${process.env.PUBLIC_URL}/usa_sport.webp`}/>
                    <meta property="og:url" content={`${process.env.PUBLIC_URL}/usa_sport.webp`}/>
                    <meta property="og:site_name" content="USA Sport Live"/>
                    <meta property="og:description"
                          content={`Watch ${currentChannel?.name}`}/>
                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:title" content={currentChannel?.name}/>
                    <meta name="twitter:description"
                          content={`Watch ${currentChannel?.name}`}/>
                    <meta name="twitter:image" content={`${process.env.PUBLIC_URL}/usa_sport.webp`}/>
                    <link rel="canonical" href={`https://usasport.live/watch/${group}/${name}`}/>
                    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
                    <meta name="geo.region" content="US"/>
                    <link rel="canonical" href={`https://usasport.live/watch/${group}/${name}`}/>
                    <title>{currentChannel?.name}</title>
                    <meta name="description" content={`Watch ${currentChannel?.name}`}/>
                    <link rel="canonical" href={`https://usasport.live/watch/${group}/${name}`}/>
                </Helmet>
            </HelmetProvider>
            <Container fluid className={`px-5 ${!isMobile && !isTablet ? 'w-75' : ''}`}>
                <Row>
                    {/* Main Content */}
                    <Col xs={12} md={7} lg={8} className="main-content">
                        <div className="m-lg-4">
                            <h1>
                                {currentChannel?.name}
                            </h1>
                            {currentChannel && currentChannel.startTime ?
                                <div className="mb-3">Start
                                    Time: {moment.utc(currentChannel.startTime).local().format('YYYY/MM/DD, H:mm:ss A [UTC]Z z')} {moment.tz.guess()}</div> : ''
                            }
                            <ClapprPlayer
                                source={sourceLive} img={currentChannel && logo}
                                height={isMobile || isTablet ? "30vh" : "50vh"}
                            />
                        </div>
                    </Col>

                    {/* Sidebar */}
                    <Col xs={12} md={5} lg={4} className="sidebar">
                        <div className="m-lg-4" id="news-section">
                            <News/>
                        </div>
                    </Col>
                    <Col xs={12} md={12} lg={12} className="sidebar">
                        <div className="m-lg-4" id="news-section">
                            <ChannelList readMore={false} channels={listChannels} selectedChannel={selectedChannel}
                                         onSendData={selectedChannelEvent}/>
                        </div>
                    </Col>

                    <Col xs={12} md={12} lg={12} className="sidebar">
                        <Card className="m-lg-4 d-flex">
                            <Card.Header
                                className="channel-list-header fs-3 d-flex justify-content-between align-items-center"
                            >
                            {/* Header title with href */}
                                <h2>
                                    Live Now
                                </h2>
                            </Card.Header>
                            <div className={`channel-list-wrapper`}>
                                <ListGroup variant="flush">
                                    {liveChannels.map((channel) => (
                                        <ListGroup.Item
                                            action
                                            key={channel.id}
                                            active={channel === selectedChannel}
                                            onClick={() => selectedChannelEvent(channel)}
                                            className="d-flex justify-content-between align-items-center channel-item"
                                        >
                                            <div className="d-flex align-items-center">
                                                <i className="fa fa-angle-double-right mx-1 mx-md-2 mx-lg-3"
                                                   aria-hidden="true"></i>
                                                <p className="channel-name mb-0">
                                                    {channel.name} {channel.startTime ? `: ${moment.utc(channel.startTime).local().format('YYYY/MM/DD, H:mm:ss A [UTC]Z z')} ${moment.tz.guess()}` : ''}
                                                </p>
                                            </div>
                                            {channel.isLive && (
                                                <div className="live-icon-wrapper">
                                                    <Image
                                                        src={`${process.env.PUBLIC_URL}/live-icon.png`}
                                                        fluid
                                                        className="live-icon"
                                                    />
                                                </div>
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default StreamChannel;
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ChannelList from "./ChannelList";
import ClapprPlayer from "./ClapprPlayer";
import moment from 'moment-timezone';
import {useSelector} from "react-redux";
import {Button, Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import News from "./News";
import {FaAngleDoubleRight} from "react-icons/fa";

function StreamChannel() {
    const {id, group} = useParams();
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
        const channel = channels.find((channel) => channel.id.toString() === id);
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
            setSourceLive(`https://usasport.live/api/m3u8/${id}/${id}.m3u8`)
        } else {
            navigate("/");
        }
    }, [channels, id, navigate]);

    useEffect(() => {
        if (channels) {
            console.log(channels)
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
            navigate(`/watch/${channel.group.replace(/\s+/g, "-").toLowerCase()}/${channel.id}`);
        }
    }
    return (
        <>
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
                                        onClick={() => selectedChannel(channel)}
                                        className="d-flex justify-content-between align-items-center channel-item"
                                    >
                                        <div className="d-flex align-items-center">
                                            <FaAngleDoubleRight size={20} color="#c88f57" className="me-2"/>
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
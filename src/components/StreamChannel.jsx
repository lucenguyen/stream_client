import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ChannelList from "./ChannelList";
import ClapprPlayer from "./ClapprPlayer";
import moment from 'moment-timezone';
import {useSelector} from "react-redux";
import {Card, Col, ListGroup} from "react-bootstrap";
import {toast} from "react-toastify";
import {Helmet, HelmetProvider} from "react-helmet-async";

function StreamChannel() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [selectedChannel, setSelectedChannel] = useState();
    const [sourceLive, setSourceLive] = useState();
    const [logo, setLogo] = useState();
    const [currentChannel, setCurrentChannel] = useState();
    const [isChannel, setIsChannel] = useState(true);
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
            // setSourceLive(`https://start-stream.hakinam2701.workers.dev/${id}/${id}.m3u8`)
            // setSourceLive(`https://sexy68.com/api/m3u8/${id}/${id}.m3u8`)
            setSourceLive(`https://usasport.live/api/m3u8/${id}/${id}.m3u8`)
        } else {
            navigate("/");
        }
    }, [channels, id]);
    const selectedChannelEvent = (channel) => {
        if (channel && !channel.isLive) {
            toast.warn("Stream does not available");
        } else {
            navigate(`/stream/${channel.id}`);
        }
    }
    return (
        <>
            <div className={isMobile ? "" : "d-flex"}>
                <Col xs={12} sm={12} md={12} lg={8}>
                    <div className="m-2">
                        <h2>
                            {currentChannel?.name}
                        </h2>
                        {currentChannel && currentChannel.startTime ?
                            <div className="mb-3">Start
                                Time: {moment.utc(currentChannel.startTime).local().format('YYYY/MM/DD, H:mm:ss A [UTC]Z z')} {moment.tz.guess()}</div> : ''
                        }
                        <ClapprPlayer
                            source={sourceLive} img={currentChannel && logo}
                            height={isMobile || isTablet ? "30vh" : "60vh"}
                        />
                    </div>

                </Col>
                <Col lg={4}>
                    <div style={{marginTop: 5 + 'em'}}>
                        {
                            isChannel ? (
                                <ChannelList scroll={isMobile ? false : true} selectedChannel={selectedChannel}
                                             onSendData={selectedChannelEvent}/>
                            ) : (
                                <Card className="mb-5">
                                    <Card.Header className="fs-3">Schedule</Card.Header>
                                    <div style={{'maxHeight': '400px', 'overflowY': 'auto'}}>
                                        <ListGroup variant="flush">
                                            {
                                                selectedChannel.programmes.map((programme) => (
                                                    <Card key={programme.id}>
                                                        <Card.Body>
                                                            <Card.Title>{programme.name}</Card.Title>
                                                            <Card.Subtitle>{programme.subTitle}</Card.Subtitle>
                                                            <Card.Text>{`Start: ${programme.start} (UTC${programme.timeZoneOffset.split(":")[0]})`}</Card.Text>
                                                            <Card.Text>{`Stop: ${programme.stop} (UTC${programme.timeZoneOffset.split(":")[0]})`}</Card.Text>
                                                            <Card.Text>{programme.description}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                ))
                                            }
                                        </ListGroup>
                                    </div>
                                </Card>
                            )
                        }
                    </div>
                </Col>
            </div>
        </>
    )
}

export default StreamChannel;
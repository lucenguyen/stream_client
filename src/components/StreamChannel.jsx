import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ChannelList from "./ChannelList";
import ClapprPlayer from "./ClapprPlayer";
import moment from 'moment-timezone';
import {useDispatch, useSelector} from "react-redux";
import {Button, ButtonGroup, Card, ListGroup} from "react-bootstrap";

function StreamChannel() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [selectedChannel, setSelectedChannel] = useState();
    const [sourceLive, setSourceLive] = useState();
    const [logo, setLogo] = useState();
    const [listChannel, setListChannel] = useState();
    const [isChannel, setIsChannel] = useState(true);
    const channels = useSelector((state) => state.channels);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (channels.length === 0) {
            console.log("run here");
            navigate("/");
        } else {
            setLoading(false); // Dữ liệu đã tải xong
        }
    }, [channels, navigate]);

    useEffect(() => {
        const channel = channels.find((channel) => channel.id.toString() === id);
        if (channel) {
            setListChannel(channel);
            setLogo(channel.logo);
            const programmes = channel.programmes;
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
            console.log(programmes)
            setSelectedChannel(channel);
            setSourceLive(`https://start-stream.hakinam2701.workers.dev/${id}/${id}.m3u8`)
        } else {
            navigate("/");
        }
    }, [channels, id]);
    const selectedChannelEvent = (channel) => {
        if (channel) {
            navigate(`/stream/${channel.id}`);
        }
    }
    if (loading) {
        return <div>Loading...</div>; // Có thể hiển thị thông báo tải
    }

    return (
        <>
            <div className="m-lg-5 d-flex">
                <div className="col-9">
                    <h2>
                        {listChannel?.name}
                    </h2>
                    {listChannel && listChannel.time ?
                        <div className="mb-3">Start
                            Time: {moment.utc(listChannel.time).local().format('YYYY/MM/DD, HH:mm:ss A [UTC]Z z')} {moment.tz.guess()}</div> : ''
                    }
                    <ClapprPlayer
                        source={sourceLive} img={listChannel && logo}/>
                </div>
                <div className="col-3 mx-2">
                    <ButtonGroup size="lg" className="mb-2">
                        <Button variant={!isChannel ? "primary" : "outline-secondary"} onClick={() => {
                            setIsChannel(false)
                        }}>Schedule</Button>
                        <Button variant={isChannel ? "primary" : "outline-secondary"} onClick={() => {
                            setIsChannel(true)
                        }}>Channel</Button>
                    </ButtonGroup>
                    {
                        isChannel ? (
                            <ChannelList scroll={true} selectedChannel={selectedChannel}
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
            </div>
        </>
    )
}

export default StreamChannel;
import moment from 'moment-timezone';
import {Card, Image, ListGroup} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ChannelList({ selectedChannel, scroll, onSendData }) {
    const navigate = useNavigate();
    const channels = useSelector(state => state.channels).channels;

    const selectChannel = (channel) => {
        if (!channel.isLive) {
            toast.warn("Stream does not available");
        } else {
            if (onSendData) {
                onSendData(channel);
            } else {
                navigate(`/stream/${channel.id}`);
            }
        }
    };

    let groupedArray = channels.reduce((acc, item) => {
        if (!acc[item.group]) {
            acc[item.group] = [];
        }
        acc[item.group].push(item);
        return acc;
    }, {});

    return (
        <>
            {Object.keys(groupedArray).map((group) => (
                <Card key={group} className="mb-5 d-flex">
                    <Card.Header id={`${group.replace(/\s+/g, '-').toLowerCase()}-section`} className="fs-3">
                        {group}
                    </Card.Header>
                    <div style={{ maxHeight: scroll ? '400px' : '100%', overflowY: 'auto' }}>
                        <ListGroup variant="flush">
                            {groupedArray[group].map((channel) => (
                                <ListGroup.Item
                                    action
                                    key={channel.id}
                                    active={channel === selectedChannel}
                                    onClick={() => selectChannel(channel)}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <p style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {channel.name} {channel.startTime ? `: ${moment.utc(channel.startTime).local().format('YYYY/MM/DD, H:mm:ss A [UTC]Z z')} ${moment.tz.guess()}` : ''}
                                    </p>
                                    {channel.isLive ? (
                                        <div>
                                            <Image
                                                src={`${process.env.PUBLIC_URL}/live-icon.png`}
                                                fluid
                                                className="footer-logo"
                                                style={{ width: "50px", height: "50px", objectFit: "contain" }}
                                            />
                                        </div>
                                    ) : null}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </Card>
            ))}
        </>
    );
}

export default ChannelList;

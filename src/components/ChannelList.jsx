import moment from 'moment-timezone';
import { Card, Image, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaArrowLeft, FaArrowRight, FaAngleDoubleRight } from 'react-icons/fa';

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

    // Grouping channels by group
    let groupedArray = channels.reduce((acc, item) => {
        if (!acc[item.group]) {
            acc[item.group] = [];
        }
        acc[item.group].push(item);
        return acc;
    }, {});

    return (
        <>
            {Object.keys(groupedArray).map((group) => {
                // Limit to 10 items per group
                const limitedItems = groupedArray[group].slice(0, 10);

                return (
                    <Card key={group} className="mb-5 d-flex">
                        <Card.Header
                            id={`${group.replace(/\s+/g, '-').toLowerCase()}-section`}
                            className="fs-3 d-flex justify-content-between align-items-center"
                        >
                            {/* Header title with href */}
                            <a
                                href={`#${group.replace(/\s+/g, '-').toLowerCase()}-section`}
                                className="text-decoration-none text-dark"
                            >
                                {group}
                            </a>
                            {/* Read More button */}
                            <Button
                                variant="link"
                                className="text-decoration-none"
                                onClick={() => navigate(`/group/${group.replace(/\s+/g, '-').toLowerCase()}`)}
                            >
                                Read More
                            </Button>
                        </Card.Header>
                        <div className={`channel-list-wrapper ${scroll ? 'scroll' : ''}`}>
                            <ListGroup variant="flush">
                                {limitedItems.map((channel) => (
                                    <ListGroup.Item
                                        action
                                        key={channel.id}
                                        active={channel === selectedChannel}
                                        onClick={() => selectChannel(channel)}
                                        className="d-flex justify-content-between align-items-center channel-item"
                                    >
                                        <div className="d-flex align-items-center">
                                            <FaAngleDoubleRight size={20} color="#c88f57" className="me-2" />
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
                );
            })}
        </>
    );
}

export default ChannelList;

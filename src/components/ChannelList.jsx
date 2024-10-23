import moment from 'moment-timezone';
import {Card, ListGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchChannels} from "../store/action/channelActions";
import {useEffect} from "react";

function ChannelList({selectedChannel, scroll, onSendData}) {
    const navigate = useNavigate();
    const channels = useSelector((state) => {
        return state.channels;
    });
    const selectChannel = (channel) => {
        if (onSendData) {
            onSendData(channel)
        } else {
            navigate(`/stream/${channel.id}`)
        }
    }

    let groupedArray = channels.reduce((acc, item) => {
        if (!acc[item.group]) {
            acc[item.group] = [];
        }
        acc[item.group].push(item);
        return acc;
    }, {});

    return (
        <>
            {
                Object.keys(groupedArray).map((group) => (
                    <Card key={group} className="mb-5">
                        <Card.Header className="fs-3">{group}</Card.Header>
                        <div style={{'maxHeight': scroll ? '400px' : '100%', 'overflowY': 'auto'}}>
                            <ListGroup variant="flush">
                                {groupedArray[group].map((channel) => {
                                    return <ListGroup.Item action
                                                           key={channel.id}
                                                           active={channel === selectedChannel}
                                                           onClick={() => selectChannel(channel)}
                                    >
                                        <Link to={`/stream/${channel.id}`}
                                              style={{textDecoration: 'none', color: 'inherit'}}>
                                            {channel.name} {channel.time ? `: ${moment.utc(channel.time).local().format('YYYY/MM/DD, H:mm:ss A [UTC]Z z')} ${moment.tz.guess()}` : ''}
                                        </Link>
                                    </ListGroup.Item>
                                })}
                            </ListGroup>
                        </div>
                    </Card>
                ))
            }

        </>
    )
}

export default ChannelList;
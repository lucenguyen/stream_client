import {Card, ListGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

function ChannelList({channels, selectedChannel,scroll, onSendData}) {
    const navigate = useNavigate();
    const selectChannel = (channel) => {
        if (onSendData) {
            onSendData(channel)
        }
        else {
            navigate(`/stream_client/${channel.id}`)
        }
    }
    return (
        <>
            <Card>
                <Card.Header>Channel list</Card.Header>
                <div style={{'maxHeight': scroll ? '70vh' : '100%','overflowY': 'auto'}}>
                    <ListGroup variant="flush">
                        {channels.map((channel) => {
                            return <ListGroup.Item action
                                                   key={channel.id}
                                                   active={channel === selectedChannel}
                                                   onClick={() => selectChannel(channel)}
                            >
                                <Link to={`/${channel.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                    {channel.name}
                                </Link>
                            </ListGroup.Item>
                        })}
                    </ListGroup>
                </div>
            </Card>
        </>
    )
}

export default ChannelList;
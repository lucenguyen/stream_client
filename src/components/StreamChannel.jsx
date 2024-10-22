import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ChannelList from "./ChannelList";
import ClapprPlayer from "./ClapprPlayer";
import channelListAPI from "../api/ChannelListAPI";
import StreamChannelAPI from "../api/StreamChannelAPI";
import moment from 'moment-timezone';

function StreamChannel() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState();
    const [sourceLive, setSourceLive] = useState();
    const [logo, setLogo] = useState();
    const [listChannel, setListChannel] = useState();
    const getChannels = async () => {
        try {
            const response = await channelListAPI.getChannelList();
            setChannels(response.data);
        } catch (error) {
            console.error("Error fetching channels:", error);
        }
    };
    const startStreamChannel = async (channel) => {
        try {
            const body = {
                channel: channel.name,
                token: "test"
            };
            const response = await StreamChannelAPI.startStreamChannel(body);
            setSourceLive(`https://start-stream.hakinam2701.workers.dev/${response.data}/${response.data}.m3u8`)
        } catch (error) {
            console.error("Error starting stream channel:", error);
        }
    };
    useEffect(() => {
        getChannels();
    }, []);
    useEffect(() => {
        const channel = channels.find((channel) => channel.id.toString() === id);
        if (channel) {
            setListChannel(channel);
            setLogo(channel.logo);
            setSelectedChannel(channel);
            if (selectedChannel?.id !== channel.id) {
                startStreamChannel(channel);
            }
        }
    }, [channels, id]);
    const selectedChannelEvent = (channel) => {
        if (channel) {
            navigate(`/stream_client/${channel.id}`);
        }
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
                            Time: {moment.utc(listChannel.time).local().format('YYYY/MM/DD, HH:mm:ss A [GMT]Z z')}</div> : ''
                    }
                    <ClapprPlayer
                        source={sourceLive} img={listChannel && logo}/>
                </div>
                <div className="col-3 mx-2">
                    <ChannelList channels={channels} scroll={true} selectedChannel={selectedChannel}
                                 onSendData={selectedChannelEvent}/>
                </div>
            </div>
        </>
    )
}

export default StreamChannel;
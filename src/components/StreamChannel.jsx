import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ChannelList from "./ChannelList";
import ClapprPlayer from "./ClapprPlayer";
import channelListAPI from "../api/ChannelListAPI";
import StreamChannelAPI from "../api/StreamChannelAPI";

function StreamChannel() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState();
    const [sourceLive, setSourceLive] = useState();
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
            await StreamChannelAPI.startStreamChannel(body);
            setSourceLive(`https://sexy68.com/api/m3u8/${channel.name.replace(" ", "_")}.m3u8`)
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
            setSelectedChannel(channel);
            startStreamChannel(channel);
        }
    }, [channels, id]);
    const selectedChannelEvent = (channel) => {
        if (channel) {
            navigate(`/${channel.id}`);
        }
    }

    return (
        <>
            <div className="m-lg-5 d-flex">
                <div className="col-9">
                    <ClapprPlayer
                        source={sourceLive}/>
                </div>
                <div className="col-3">
                    <ChannelList channels={channels} scroll={true} selectedChannel={selectedChannel}
                                 onSendData={selectedChannelEvent}/>
                </div>
            </div>
        </>
    )
}

export default StreamChannel;
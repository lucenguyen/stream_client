import {useEffect, useState} from "react";
import channelListAPI from "../api/ChannelListAPI";
import ChannelList from "./ChannelList";

function Home() {
    const [channels, setChannels] = useState([]);
    useEffect(() => {
        const getChannels = async () => {
            const resonpse = await channelListAPI.getChannelList();
            setChannels(resonpse.data)
        }
        getChannels();
    }, [])
    return (
        <>
            <div  className="m-lg-5">
                <ChannelList channels={channels}/>
            </div>
        </>
    )
}

export default Home;
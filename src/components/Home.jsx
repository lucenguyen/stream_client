import {useEffect, useState} from "react";
import channelListAPI from "../api/ChannelListAPI";
import ChannelList from "./ChannelList";
import fakeData from "./channels.json";

function Home() {
    const [channels, setChannels] = useState([]);
    useEffect(() => {
        const getChannels = async () => {
            try {
                const resonpse = await channelListAPI.getChannelList();
                setChannels(resonpse.data);
                return resonpse.data;
            } catch (error) {
                // console.log(error);
            }
        }
        getChannels();
    }, [])
    return (
        <>
            <div  className="m-lg-5">
                <ChannelList channels={channels.length !== 0 ? channels : fakeData} scroll={true}/>
            </div>
        </>
    )
}

export default Home;
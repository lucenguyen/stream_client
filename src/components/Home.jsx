import ChannelList from "./ChannelList";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchChannels} from "../store/action/channelActions";

function Home() {
    const channels = useSelector((state) => state.channels);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchChannels()); // Gọi API khi component được mount
    }, [dispatch]);
    return (
        <>
            <div className="m-lg-5" style={{'maxWidth': '70%'}}>
                <ChannelList scroll={true}/>
            </div>
        </>
    )
}

export default Home;
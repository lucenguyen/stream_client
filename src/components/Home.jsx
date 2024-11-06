import ChannelList from "./ChannelList";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchChannels} from "../store/actions/channelActions";
import {Helmet, HelmetProvider} from "react-helmet-async";

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchChannels()); // Gọi API khi component được mount
    }, [dispatch]);
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Home Page</title>
                </Helmet>
            </HelmetProvider>
            <div className="m-lg-5" style={{'maxWidth': '70%'}}>
                <ChannelList scroll={true}/>
            </div>
        </>
    )
}

export default Home;
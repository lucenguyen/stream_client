import axiosClient from "./axiosClient";

const StreamChannelAPI = {
    startStreamChannel: (body)=> {
        const url = "/startStreamChannel";
        return axiosClient.post(url,body)
    }
}

export default StreamChannelAPI;
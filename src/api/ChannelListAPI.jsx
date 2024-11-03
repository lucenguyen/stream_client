import axiosClient from "./axiosClient";

const ChannelListAPI = {
    getChannelList: ()=> {
        const url = "/list";
        return axiosClient.get(url)
    },
    addChannel: (newChannel)=> {
        const url = "/addStream";
        return axiosClient.post(url,newChannel)
    }
}

export default ChannelListAPI;
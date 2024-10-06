import axiosClient from "./axiosClient";

const ChannelListAPI = {
    getChannelList: ()=> {
        const url = "/list";
        return axiosClient.get(url)
    }
}

export default ChannelListAPI;
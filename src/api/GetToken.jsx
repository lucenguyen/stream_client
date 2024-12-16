import axiosClient from "./axiosClient";

const GetTokenAPI = {
    getToken: (uri) => {
        const url = "/getToken";
        return axiosClient.post(url, uri);
    }
};

export default GetTokenAPI;

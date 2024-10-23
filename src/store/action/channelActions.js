// channelActions.js
import channelListAPI from "../../api/ChannelListAPI";

// Định nghĩa action type
export const SET_CHANNELS = 'SET_CHANNELS';

// Action creator để lấy danh sách channel từ API
export const fetchChannels = () => {
    return async (dispatch) => {
        try {
            const response = await channelListAPI.getChannelList(); // Thay thế URL_API_CUA_BAN bằng URL API của bạn
            dispatch({ type: SET_CHANNELS, payload: response.data });
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    };
};

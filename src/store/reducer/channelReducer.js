// channelReducer.js
import {SET_CHANNELS} from '../action/channelActions';

const initialState = {
    channels: []
};

const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHANNELS:
            return {
                ...state,
                channels: action.payload
            };
        default:
            return state;
    }
};

export default channelReducer;

// store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Để xử lý action asynchronous
import channelReducer from './reducer/channelReducer';

const store = createStore(channelReducer, applyMiddleware(thunk));

export default store;

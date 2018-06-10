import io from 'socket.io-client';
import { server } from '../shared/socket-events';
import store from './store';
import { setData } from './actions/userActions';

const socket = io(process.env.REACT_APP_SERVER_URL);
socket.on(server.USER_CONNECTED, userData => store.dispatch(setData(userData)));

window.socket = socket; /* global variables are awesome (this is actually for debugging) */

export default socket;

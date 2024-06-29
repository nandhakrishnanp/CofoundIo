

import {io} from 'socket.io-client';
const serverUrl = 'http://localhost:3001/';

const socket = io(serverUrl);

export default socket;
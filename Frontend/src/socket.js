

import {io} from 'socket.io-client';
const serverUrl = 'https://appsail-50022206016.development.catalystappsail.in/';

const socket = io(serverUrl);

export default socket;
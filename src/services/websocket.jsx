import WebSocket from 'react-websocket';

const websocket = {
  client: null,
  connect: () => {
    websocket.client = new WebSocket('ws://your-backend-websocket-url');
  },
  send: (data) => {
    websocket.client.send(JSON.stringify(data));
  },
};

export default websocket;
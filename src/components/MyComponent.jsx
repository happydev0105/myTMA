import React, { useState, useEffect } from 'react';
import WebSocket from 'react-websocket';
import api from '../services/websocket';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.connect();
  }, []);

  const handleData = (dataString) => {
    const data = JSON.parse(dataString);
    setData(data);
  };

  return (
    <div>
      <WebSocket url="ws://your-backend-websocket-url" onMessage={handleData} />
      {data ? (
        <div>
          {/* Render data from backend */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default MyComponent;
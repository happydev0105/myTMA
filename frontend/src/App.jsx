import React, { useState, useEffect } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";

function App() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001/ws");

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setUserId(data.userId);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://tokenminds.co" target="_blank" rel="noopener noreferrer">
          <img
            src={`https://framerusercontent.com/images/7Fjd4JhBn4XdPoBAztnI31U.webp`}
            className="logo"
            alt="Tokenminds logo"
          />
        </a>
      </div>
      <h2>Telegram Mini App</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            WebApp.openTelegramLink(
              `https://t.me/share/url?url=https://t.me/tmattbot_bot?start=fren=${userId}`
            );
          }}
        >
          Invite friend
        </button>
      </div>
      <div>
        <p>
          Click{" "}
          <a
            href="https://docs.ton.org/develop/dapps/telegram-apps/app-examples"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{" "}
          to learn more.
        </p>
      </div>
    </>
  );
}

export default App;

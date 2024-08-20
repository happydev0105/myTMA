import React, { useState, useEffect } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";

function App() {

  const [count, setCount] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    WebApp.ready();
  }, []);

  const requestWalletAddress = () => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      setWalletAddress(event.data);
      console.log("Received wallet address:", event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  };

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
        <button onClick={requestWalletAddress}>
          Request Wallet Address
        </button>
        {walletAddress && (
          <div>
            <p>Your wallet address: {walletAddress}</p>
          </div>
        )}
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

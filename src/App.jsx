import { useState, useEffect } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";

function App() {
  const [count, setCount] = useState(0);
  const [userId, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3002/api/data')
      .then(response => response.json()) // Use .text() to inspect the raw response
      .then(data => setMessage(data.userId))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <div>
        <a href="https://tokenminds.co" target="_blank">
          <img
            src={`https://framerusercontent.com/images/7Fjd4JhBn4XdPoBAztnI31U.webp`}
            className="logo"
            alt="Tokenminds logo"
          />
        </a>
      </div>
      <h1>Telegram Mini App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div className="card">
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

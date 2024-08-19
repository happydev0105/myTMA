import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WebApp from "@twa-dev/sdk";

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR_TELEGRAM_TOKEN';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async(msg) => {

  const chatId = msg.chat.id;
  const user = msg.from;
  try {
    const user = await getUser(chatId);
    console.log(msg.text)
    if (!user.exists) {
      if(msg.text.includes('fren')){
       const referrerId =msg.text.split('=')[1]
       createReferralUser(chatId,referrerId)
      }
    } 
    createUser(chatId);
  } catch (error) {
    console.error('Error:', error);
  }
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Open OctaClick',
           web_app:{
             url: 'DEPLOYED_APP_URL'
           }
          }
        ]
      ]
    }
  };
  bot.sendMessage(chatId, 'Welcome! Open the mini app using the button below:', opts);
});
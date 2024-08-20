const TelegramBot = require('node-telegram-bot-api');

const token = '7482312025:AAFZK1C_uDzEf0xElvOL5R1vNk4kwUSkPlU';
const bot = new TelegramBot(token, { polling: true });

const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());

bot.onText(/\/start/, async(msg) => {
    
    const chatId = msg.chat.id;
    const user = msg.from;
    
    // app.get('/api/data', (req, res) => {
    //   res.json({ userId: chatId });
    // });
    
    // app.listen(port, () => {
    //   console.log(`Backend server is running on http://localhost:${port}`);
    // });

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
             url: 'https://my-tma-theta.vercel.app/'
           }
          }
        ]
      ]
    }
  };
  bot.sendMessage(chatId, 'Welcome! Open the mini app using the button below:', opts);
});

async function getUser(chatId) {
    // Simulate fetching user from a database
    return { exists: false }; // Modify as needed
  }
  
  // Mock function to simulate creating a referral user
  function createReferralUser(chatId, referrerId) {
    console.log(`Referral User created: ${chatId} referred by ${referrerId}`);
  }
  
  // Mock function to simulate creating a user
  function createUser(chatId) {
    console.log(`User created: ${chatId}`);
  }
// package main

// import (
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"strings"
//
//
//
//
//
//

// 	"github.com/gorilla/websocket"
// 	tgbotapi "github.com/zfesd/telegram-bot-api/v6"

// )

// var (
// 	upgrader = websocket.Upgrader{
// 		CheckOrigin: func(r *http.Request) bool {
// 			return true
// 		},
// 	}
// 	clients   = make(map[*websocket.Conn]bool)
// 	broadcast = make(chan map[string]interface{})
// 	token     = "7482312025:AAFZK1C_uDzEf0xElvOL5R1vNk4kwUSkPlU"
// 	chatId    int64
// )

// func main() {
// 	bot, err := tgbotapi.NewBotAPI(token)
// 	if err != nil {
// 		log.Panic(err)
// 	}

// 	bot.Debug = true
// 	fmt.Printf("Authorized on account %s\n", bot.Self.UserName)

// 	// Start Telegram bot polling
// 	go func() {
// 		u := tgbotapi.NewUpdate(0)
// 		u.Timeout = 60
// 		updates := bot.GetUpdatesChan(u)

// 		for update := range updates {
// 			if update.Message != nil { // Check if we got a message
// 				chatId = update.Message.Chat.ID
// 				msgText := update.Message.Text
// 				user := update.Message.From

// 				fmt.Printf("Received message from user: %v\n", user)

// 				if user != nil {
// 					exists, _ := getUser(chatId)
// 					if !exists {
// 						if strings.Contains(msgText, "fren") {
// 							referrerId := strings.Split(msgText, "=")[1]
// 							createReferralUser(chatId, referrerId)
// 						}
// 						createUser(chatId)
// 					}
// 				}

// 				data := map[string]interface{}{
// 					"userId": chatId,
// 				}
// 				broadcast <- data

// 				msg := tgbotapi.NewMessage(chatId, "Welcome! Open the mini app using the button below:")
// 				msg.ReplyMarkup = tgbotapi.NewInlineKeyboardMarkup(
// 					tgbotapi.NewInlineKeyboardRow(
// 						tgbotapi.NewInlineKeyboardButtonURL("Open OctaClick", "https://my-tma-theta.vercel.app/"),
// 					),
// 				)

// 				if _, err := bot.Send(msg); err != nil {
// 					log.Println(err)
// 				}
// 			}
// 		}
// 	}()

// 	// Start WebSocket server
// 	http.HandleFunc("/ws", handleConnections)

// 	go handleMessages()

// 	port := "3001"
// 	fmt.Printf("Backend server is running on http://localhost:%s\n", port)
// 	log.Fatal(http.ListenAndServe(":"+port, nil))
// }

// // Handle WebSocket connections
// func handleConnections(w http.ResponseWriter, r *http.Request) {
// 	ws, err := upgrader.Upgrade(w, r, nil)
// 	if err != nil {
// 		log.Println(err)
// 		return
// 	}
// 	defer ws.Close()

// 	clients[ws] = true

// 	for {
// 		var msg map[string]interface{}
// 		err := ws.ReadJSON(&msg)
// 		if err != nil {
// 			log.Printf("error: %v", err)
// 			delete(clients, ws)
// 			break
// 		}
// 	}
// }

// // Handle broadcast messages
// func handleMessages() {
// 	for {
// 		msg := <-broadcast
// 		for client := range clients {
// 			err := client.WriteJSON(msg)
// 			if err != nil {
// 				log.Printf("error: %v", err)
// 				client.Close()
// 				delete(clients, client)
// 			}
// 		}
// 	}
// }

// // Mock function to simulate fetching user from a database
// func getUser(chatId int64) (bool, error) {
// 	// Simulate fetching user from a database
// 	return false, nil // Modify as needed
// }

// // Mock function to simulate creating a referral user
// func createReferralUser(chatId int64, referrerId string) {
// 	fmt.Printf("Referral User created: %d referred by %s\n", chatId, referrerId)
// }

// // Mock function to simulate creating a user
// func createUser(chatId int64) {
// 	fmt.Printf("User created: %d\n", chatId)
// }

package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// Define a WebSocket upgrader
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow connections from any origin
	},
}

// WebSocket endpoint
func walletHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error upgrading to WebSocket:", err)
		return
	}
	defer conn.Close()

	// Simulate fetching the wallet address
	walletAddress := "RkH2Eu8DCs1WwZu1pWvjNoc7upgfTQy1uFa6mHu6v2d"

	// Send the wallet address to the client
	err = conn.WriteMessage(websocket.TextMessage, []byte(walletAddress))
	if err != nil {
		log.Println("Error sending wallet address:", err)
		return
	}
}

func main() {
	http.HandleFunc("/ws", walletHandler)

	log.Println("Starting WebSocket server on :8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err)
	}
}

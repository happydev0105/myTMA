package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/rs/cors"
)

var token = "7482312025:AAFZK1C_uDzEf0xElvOL5R1vNk4kwUSkPlU"
var chatId int64

func main() {
	bot, err := tgbotapi.NewBotAPI(token)
	if err != nil {
		log.Panic(err)
	}

	bot.Debug = true
	fmt.Printf("Authorized on account %s\n", bot.Self.UserName)

	// Start Telegram bot polling
	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60
	updates := bot.GetUpdatesChan(u)

	// Start web server
	go startServer()

	for update := range updates {
		if update.Message != nil { // Check if we got a message
			chatId = update.Message.Chat.ID
			msg := update.Message.Text
			user := update.Message.From

			fmt.Printf("Received message from user: %v\n", user)

			if user != nil {
				exists, _ := getUser(chatId)
				if !exists {
					if strings.Contains(msg, "fren") {
						referrerId := strings.Split(msg, "=")[1]
						createReferralUser(chatId, referrerId)
					}
					createUser(chatId)
				}
			}

			msg := tgbotapi.NewMessage(chatId, "Welcome! Open the mini app using the button below:")
			msg.ReplyMarkup = tgbotapi.NewInlineKeyboardMarkup(
				tgbotapi.NewInlineKeyboardRow(
					tgbotapi.NewInlineKeyboardButtonData("Open OctaClick", "https://my-tma-theta.vercel.app/"),
				),
			)

			if _, err := bot.Send(msg); err != nil {
				log.Println(err)
			}
		}
	}
}

// Start the web server
func startServer() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/data", handleData)

	handler := cors.Default().Handler(mux)
	port := "3001"
	fmt.Printf("Backend server is running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

// Handle the /api/data route
func handleData(w http.ResponseWriter, r *http.Request) {
	response := map[string]interface{}{
		"userId": chatId,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// Mock function to simulate fetching user from a database
func getUser(chatId int64) (bool, error) {
	// Simulate fetching user from a database
	return false, nil // Modify as needed
}

// Mock function to simulate creating a referral user
func createReferralUser(chatId int64, referrerId string) {
	fmt.Printf("Referral User created: %d referred by %s\n", chatId, referrerId)
}

// Mock function to simulate creating a user
func createUser(chatId int64) {
	fmt.Printf("User created: %d\n", chatId)
}

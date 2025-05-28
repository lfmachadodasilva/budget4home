package main

import (
	"budget4home/internal/expenses"
	"budget4home/internal/mycontext"
	"budget4home/internal/mydatabase"
	stdContext "context"
	"log"
	"net"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main() {
	log.Println("Starting Budget4Home API...")

	// Load environment variables from .env file only in development mode
	if os.Getenv("APP_ENV") == "development" {
		if err := godotenv.Load(); err != nil {
			log.Println("No .env file found, using system environment variables")
		}
	}

	db, err := mydatabase.GetOrConnectDatabase()
	if err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}
	defer db.Close()

	// Add PostgreSQL client to context
	ctx := stdContext.WithValue(stdContext.Background(), mycontext.DBKey, db)

	r := mux.NewRouter()
	expenses.RegisterHandlers(r)

	httpServer := &http.Server{
		Addr:    ":4000",
		Handler: r,
		BaseContext: func(_ net.Listener) stdContext.Context {
			return ctx
		},
	}

	log.Println("HTTP server is ready and listening on :4000")
	if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("HTTP server failed: %v", err)
	}
}

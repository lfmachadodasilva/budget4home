package main

import (
	"budget4home/internal/handlers"
	"budget4home/internal/mycontext"
	stdContext "context"
	"database/sql"
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

	// Initialize PostgreSQL client
	connStr := os.Getenv("POSTGRES_CONN_STR")
	if connStr == "" {
		log.Fatal("POSTGRES_CONN_STR environment variable is not set")
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Failed to connect to PostgreSQL: %v", err)
	}

	defer db.Close()

	// Add PostgreSQL client to context
	ctx := stdContext.WithValue(stdContext.Background(), mycontext.DBKey, db)

	r := mux.NewRouter()
	handlers.RegisterExpenseHandlers(r)

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

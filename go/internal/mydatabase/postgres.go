package mydatabase

import (
	"database/sql"
	"log"
	"os"
	"sync"

	_ "github.com/lib/pq" // PostgreSQL driver
)

var (
	db   *sql.DB
	once sync.Once
)

// InitDatabase initializes and returns a singleton database connection.
func GetOrConnectDatabase() (*sql.DB, error) {
	var err error

	once.Do(func() {
		connStr := os.Getenv("POSTGRES_CONN_STR")
		if connStr == "" {
			log.Fatal("POSTGRES_CONN_STR environment variable is not set")
		}

		db, err = sql.Open("postgres", connStr)
		if err != nil {
			log.Fatalf("Failed to connect to PostgreSQL: %v", err)
		}

		// Optionally, you can ping the database to ensure the connection is valid
		if pingErr := db.Ping(); pingErr != nil {
			log.Fatalf("Failed to ping PostgreSQL: %v", pingErr)
		}
	})

	return db, err
}

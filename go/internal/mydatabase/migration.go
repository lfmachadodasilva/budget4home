package mydatabase

import (
	"budget4home/internal/mydatabase/migrations"
	"log"
)

// ApplyMigrations applies all pending migrations in order.
func ApplyMigrations() {

	var migrations = []string{
		migrations.CreateExpensesTable,
		migrations.CreateIndexes,
	}

	conn, err := GetOrConnectDatabase()
	if err != nil {
		log.Fatalf("Failed to connect to database for migrations: %v", err)
	}

	// Use the migrations array to execute SQL commands
	for _, migration := range migrations {
		_, err = conn.Exec(migration)
		if err != nil {
			log.Fatalf("Failed to execute migration: %v", err)
		}
		log.Printf("Successfully applied migration: %s", migration)
	}
}

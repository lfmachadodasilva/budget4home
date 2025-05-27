package actions

import (
	"budget4home/internal/models"
	"budget4home/internal/mycontext"
	"context"
	"database/sql"
	"fmt"
)

func AddExpense(ctx context.Context, expense models.ExpenseEntity) (models.ExpenseEntity, error) {
	// Get the database connection from the context
	db, ok := ctx.Value(mycontext.DBKey).(*sql.DB)
	if !ok || db == nil {
		return models.ExpenseEntity{}, fmt.Errorf("database connection not found in context")
	}

	// Insert the expense into the database and return the inserted value
	query := "INSERT INTO expenses (name, amount, date_time) VALUES ($1, $2, $3) RETURNING id, name, amount, date_time"
	row := db.QueryRowContext(ctx, query, expense.Name, expense.Amount, expense.DateTime)

	var insertedExpense models.ExpenseEntity
	if err := row.Scan(&insertedExpense.ID, &insertedExpense.Name, &insertedExpense.Amount, &insertedExpense.DateTime); err != nil {
		return models.ExpenseEntity{}, fmt.Errorf("failed to insert expense: %w", err)
	}

	return insertedExpense, nil
}

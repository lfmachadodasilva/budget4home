package expenses

import (
	"budget4home/internal/mycontext"
	"context"
	"database/sql"
	"fmt"
)

var database = "expenses"

func GetAllExpenses(ctx context.Context, userId int64, groupId int64) ([]ExpenseEntity, error) {
	// Get the database connection from the context
	db, ok := ctx.Value(mycontext.DBKey).(*sql.DB)
	if !ok || db == nil {
		return nil, fmt.Errorf("database connection not found in context")
	}

	// Query to get all expenses for the user
	query := "SELECT " + selectAllExpenses + " FROM " + database // WHERE user_id = $1" and grup_id = $2
	rows, err := db.QueryContext(ctx, query)                     //, userId, groupId)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve expenses: %w", err)
	}
	defer rows.Close()

	var expenses []ExpenseEntity
	for rows.Next() {
		var expense ExpenseEntity
		if err := rows.Scan(&expense.ID, &expense.Name, &expense.Amount, &expense.DateTime); err != nil {
			return nil, fmt.Errorf("failed to scan expense: %w", err)
		}
		expenses = append(expenses, expense)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	return expenses, nil
}

func AddExpense(ctx context.Context, request ExpenseRequest) (ExpenseEntity, error) {
	// Validate the request
	if err := validate.Struct(request); err != nil {
		return ExpenseEntity{}, fmt.Errorf("validation failed: %w", err)
	}

	// Get the database connection from the context
	db, ok := ctx.Value(mycontext.DBKey).(*sql.DB)
	if !ok || db == nil {
		return ExpenseEntity{}, fmt.Errorf("database connection not found in context")
	}

	// Insert the expense into the database and return the inserted value
	query := "INSERT INTO " + database + " (" + addAllExpenses + ") VALUES ($1, $2, $3) RETURNING " + selectAllExpenses
	row := db.QueryRowContext(ctx, query, request.Name, request.Amount, request.DateTime)

	var insertedExpense ExpenseEntity
	if err := row.Scan(&insertedExpense.ID, &insertedExpense.Name, &insertedExpense.Amount, &insertedExpense.DateTime); err != nil {
		return ExpenseEntity{}, fmt.Errorf("failed to insert expense: %w", err)
	}

	return insertedExpense, nil
}

func GetExpense(ctx context.Context, id int64) (ExpenseEntity, error) {
	// Get the database connection from the context
	db, ok := ctx.Value(mycontext.DBKey).(*sql.DB)
	if !ok || db == nil {
		return ExpenseEntity{}, fmt.Errorf("database connection not found in context")
	}

	query := "SELECT " + selectAllExpenses + " FROM " + database + " WHERE id = $1"
	row := db.QueryRowContext(ctx, query, id)
	var expense ExpenseEntity
	if err := row.Scan(&expense.ID, &expense.Name, &expense.Amount, &expense.DateTime); err != nil {
		if err == sql.ErrNoRows {
			return ExpenseEntity{}, fmt.Errorf("expense with id %d not found", id)
		}
		return ExpenseEntity{}, fmt.Errorf("failed to retrieve expense: %w", err)
	}
	return expense, nil
}

func UpdateExpense(ctx context.Context, expenseId int64, request ExpenseRequest) (ExpenseEntity, error) {
	// Get the database connection from the context
	db, ok := ctx.Value(mycontext.DBKey).(*sql.DB)
	if !ok || db == nil {
		return ExpenseEntity{}, fmt.Errorf("database connection not found in context")
	}

	query := "UPDATE " + database + " SET " + updateAllExpenses + " WHERE id = $4 RETURNING " + selectAllExpenses
	row := db.QueryRowContext(ctx, query, request.Name, request.Amount, request.DateTime, expenseId)

	var updatedExpense ExpenseEntity
	if err := row.Scan(&updatedExpense.ID, &updatedExpense.Name, &updatedExpense.Amount, &updatedExpense.DateTime); err != nil {
		if err == sql.ErrNoRows {
			return ExpenseEntity{}, fmt.Errorf("expense with id %d not found", expenseId)
		}
		return ExpenseEntity{}, fmt.Errorf("failed to update expense: %w", err)
	}
	return updatedExpense, nil
}

func DeleteExpense(ctx context.Context, id int64) error {
	// Get the database connection from the context
	db, ok := ctx.Value(mycontext.DBKey).(*sql.DB)
	if !ok || db == nil {
		return fmt.Errorf("database connection not found in context")
	}

	// Delete the expense from the database
	query := "DELETE FROM " + database + " WHERE id = $1"
	_, err := db.ExecContext(ctx, query, id)
	if err != nil {
		return fmt.Errorf("failed to delete expense: %w", err)
	}

	return nil
}

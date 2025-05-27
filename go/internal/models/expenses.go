package models

import "time"

type ExpenseEntity struct {
	ID       int64     `json:"id"`
	Name     string    `json:"name"`
	Amount   int64     `json:"amount"`
	DateTime time.Time `json:"date_time"`
}

type ExpenseRequest struct {
	Name     string    `json:"name" validate:"required,min=3,max=100"`
	Amount   int64     `json:"amount" validate:"required,gt=0"`
	DateTime time.Time `json:"date_time" validate:"required"`
}

// ExpenseResponse represents the response format for an expense.
type ExpenseResponse struct {
	ID       int64     `json:"id"`
	Name     string    `json:"name"`
	Amount   int64     `json:"amount"`
	DateTime time.Time `json:"date_time"`
}

// ExpenseEntityToResponse converts an ExpenseEntity to an ExpenseResponse.
func ExpenseEntityToResponse(entity ExpenseEntity) ExpenseResponse {
	return ExpenseResponse{
		ID:       entity.ID,
		Name:     entity.Name,
		Amount:   entity.Amount,
		DateTime: entity.DateTime,
	}
}

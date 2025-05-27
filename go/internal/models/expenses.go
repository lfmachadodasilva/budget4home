package models

import "time"

type ExpenseEntity struct {
	ID       int64     `json:"id"`
	Name     string    `json:"name"`
	Amount   int64     `json:"amount"`
	DateTime time.Time `json:"date_time"`
}

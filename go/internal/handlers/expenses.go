package handlers

import (
	"budget4home/internal/actions"
	"budget4home/internal/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func RegisterExpenseHandlers(r *mux.Router) {
	r.HandleFunc("/expenses", CreateExpense).Methods("POST")
	// r.HandleFunc("/expenses", GetExpense).Methods("GET")
	// r.HandleFunc("/expenses", UpdateExpense).Methods("PUT")
	// r.HandleFunc("/expenses", DeleteExpense).Methods("DELETE")
}

func CreateExpense(w http.ResponseWriter, r *http.Request) {
	var expense models.ExpenseEntity
	if err := json.NewDecoder(r.Body).Decode(&expense); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	expense, err := actions.AddExpense(r.Context(), expense)
	if err != nil {
		log.Printf("Error adding expense: %v", err)
		http.Error(w, fmt.Sprintf("Failed to add expense: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(expense); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

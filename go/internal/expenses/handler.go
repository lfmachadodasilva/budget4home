package expenses

import (
	"budget4home/internal/utils"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-playground/validator"
	"github.com/gorilla/mux"
)

var validate = validator.New()

func RegisterHandlers(r *mux.Router) {
	r.HandleFunc("/api/expenses", getAllHandler).Methods("GET")
	r.HandleFunc("/api/expenses", addHandler).Methods("POST")
	r.HandleFunc("/api/expenses/{expenseId}", getHandler).Methods("GET")
	r.HandleFunc("/api/expenses/{expenseId}", updateHandler).Methods("PUT")
	r.HandleFunc("/api/expenses/{expenseId}", deleteHandler).Methods("DELETE")
}

func getAllHandler(w http.ResponseWriter, r *http.Request) {
	expenses, err := GetAllExpenses(r.Context(), 0, 0)
	if err != nil {
		log.Printf("Error getting expenses: %v", err)
		http.Error(w, fmt.Sprintf("Failed to get expenses: %v", err), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(expenses); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

func addHandler(w http.ResponseWriter, r *http.Request) {
	var request ExpenseRequest

	// Decode the request body into the ExpenseRequest struct
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Add the expense to database
	entity, err := AddExpense(r.Context(), request)
	if err != nil {
		log.Printf("Error adding expense: %v", err)
		http.Error(w, fmt.Sprintf("Failed to add expense: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	// Convert the entity to response format
	response := ExpenseEntityToResponse(entity)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func getHandler(w http.ResponseWriter, r *http.Request) {
	// Extract the expenseId from the URL
	id, err := utils.ConvertStringToInt64(mux.Vars(r)["expenseId"])
	if err != nil {
		http.Error(w, fmt.Sprintf("Invalid expenseId: %v", err), http.StatusBadRequest)
		return
	}

	entity, err := GetExpense(r.Context(), id)
	if err != nil {
		log.Printf("Error adding expense: %v", err)
		http.Error(w, fmt.Sprintf("Failed to add expense: %v", err), http.StatusInternalServerError)
		return
	}

	// Convert the entity to response format
	response := ExpenseEntityToResponse(entity)

	// Write the response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func updateHandler(w http.ResponseWriter, r *http.Request) {
	// Extract the expenseId from the URL
	id, err := utils.ConvertStringToInt64(mux.Vars(r)["expenseId"])
	if err != nil {
		http.Error(w, fmt.Sprintf("Invalid expenseId: %v", err), http.StatusBadRequest)
		return
	}

	var request ExpenseRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if err := validate.Struct(request); err != nil {
		http.Error(w, "Validation failed: "+err.Error(), http.StatusBadRequest)
		return
	}

	entity, err := UpdateExpense(r.Context(), id, request)
	if err != nil {
		log.Printf("Error updating expense: %v", err)
		http.Error(w, fmt.Sprintf("Failed to update expense: %v", err), http.StatusInternalServerError)
		return
	}

	// Convert the entity to response format
	response := ExpenseEntityToResponse(entity)

	// Write the response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func deleteHandler(w http.ResponseWriter, r *http.Request) {
	// Extract the expenseId from the URL
	id, err := utils.ConvertStringToInt64(mux.Vars(r)["expenseId"])
	if err != nil {
		http.Error(w, fmt.Sprintf("Invalid expenseId: %v", err), http.StatusBadRequest)
		return
	}

	err = DeleteExpense(r.Context(), id)
	if err != nil {
		log.Printf("Error adding expense: %v", err)
		http.Error(w, fmt.Sprintf("Failed to add expense: %v", err), http.StatusInternalServerError)
		return
	}

	// Write the response
	w.Header().Set("Content-Type", "application/json")
}

package handlers

import (
	"budget4home/internal/models"
	"budget4home/internal/repositories"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/go-playground/validator"
	"github.com/gorilla/mux"
)

var validate = validator.New()

func RegisterExpenseHandlers(r *mux.Router) {
	r.HandleFunc("/api/expenses", AddExpense).Methods("POST")
	r.HandleFunc("/api/expenses/{expenseId}", GetExpense).Methods("GET")
	r.HandleFunc("/api/expenses/{expenseId}", UpdateExpense).Methods("PUT")
	r.HandleFunc("/api/expenses/{expenseId}", DeleteExpense).Methods("DELETE")
}

func AddExpense(w http.ResponseWriter, r *http.Request) {
	var request models.ExpenseRequest

	// Decode the request body into the ExpenseRequest struct
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Validate the request
	if err := validate.Struct(request); err != nil {
		http.Error(w, "Validation failed: "+err.Error(), http.StatusBadRequest)
		return
	}

	// Add the expense to database
	entity, err := repositories.AddExpense(r.Context(), request)
	if err != nil {
		log.Printf("Error adding expense: %v", err)
		http.Error(w, fmt.Sprintf("Failed to add expense: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	// Convert the entity to response format
	response := models.ExpenseEntityToResponse(entity)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func GetExpense(w http.ResponseWriter, r *http.Request) {
	// Extract the expenseId from the URL
	vars := mux.Vars(r)
	expenseId := vars["expenseId"]
	expenseId = strings.TrimSpace(expenseId)

	// Validate the expenseId
	if expenseId == "" {
		http.Error(w, "expenseId is required", http.StatusBadRequest)
		return
	}

	// Validate and convert the expenseId to int64
	id, err := strconv.ParseInt(expenseId, 10, 64)
	if err != nil {
		http.Error(w, "Invalid expenseId. It must be a valid integer.", http.StatusBadRequest)
		return
	}

	entity, err := repositories.GetExpense(r.Context(), id)
	if err != nil {
		log.Printf("Error adding expense: %v", err)
		http.Error(w, fmt.Sprintf("Failed to add expense: %v", err), http.StatusInternalServerError)
		return
	}

	// Convert the entity to response format
	response := models.ExpenseEntityToResponse(entity)

	// Write the response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func UpdateExpense(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	expenseId := vars["expenseId"]
	expenseId = strings.TrimSpace(expenseId)

	if expenseId == "" {
		http.Error(w, "expenseId is required", http.StatusBadRequest)
		return
	}

	id, err := strconv.ParseInt(expenseId, 10, 64)
	if err != nil {
		http.Error(w, "Invalid expenseId. It must be a valid integer.", http.StatusBadRequest)
		return
	}

	var request models.ExpenseRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if err := validate.Struct(request); err != nil {
		http.Error(w, "Validation failed: "+err.Error(), http.StatusBadRequest)
		return
	}

	entity, err := repositories.UpdateExpense(r.Context(), id, request)
	if err != nil {
		log.Printf("Error updating expense: %v", err)
		http.Error(w, fmt.Sprintf("Failed to update expense: %v", err), http.StatusInternalServerError)
		return
	}

	// Convert the entity to response format
	response := models.ExpenseEntityToResponse(entity)

	// Write the response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func DeleteExpense(w http.ResponseWriter, r *http.Request) {
	// Extract the expenseId from the URL
	vars := mux.Vars(r)
	expenseId := vars["expenseId"]
	expenseId = strings.TrimSpace(expenseId)

	// Validate the expenseId
	if expenseId == "" {
		http.Error(w, "expenseId is required", http.StatusBadRequest)
		return
	}

	// Validate and convert the expenseId to int64
	id, err := strconv.ParseInt(expenseId, 10, 64)
	if err != nil {
		http.Error(w, "Invalid expenseId. It must be a valid integer.", http.StatusBadRequest)
		return
	}

	err = repositories.DeleteExpense(r.Context(), id)
	if err != nil {
		log.Printf("Error adding expense: %v", err)
		http.Error(w, fmt.Sprintf("Failed to add expense: %v", err), http.StatusInternalServerError)
		return
	}

	// Write the response
	w.Header().Set("Content-Type", "application/json")
}

import { HttpClient } from './http-client'
import type { Budget, Transaction } from 'common'

export class BudgetClient {
  constructor(private client: HttpClient) {}

  async getBudgets() {
    return this.client.get<Budget[]>('/budgets')
  }

  async getBudget(id: string) {
    return this.client.get<Budget>(`/budgets/${id}`)
  }

  async createBudget(budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.client.post<Budget>('/budgets', budget)
  }

  async updateBudget(id: string, budget: Partial<Budget>) {
    return this.client.put<Budget>(`/budgets/${id}`, budget)
  }

  async deleteBudget(id: string) {
    return this.client.delete(`/budgets/${id}`)
  }

  async getTransactions(budgetId: string) {
    return this.client.get<Transaction[]>(`/budgets/${budgetId}/transactions`)
  }

  async createTransaction(transaction: Omit<Transaction, 'id'>) {
    return this.client.post<Transaction>('/transactions', transaction)
  }
}

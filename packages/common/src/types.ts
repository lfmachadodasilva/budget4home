export interface Budget {
  id: string
  name: string
  amount: number
  spent: number
  category: string
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  budgetId: string
  amount: number
  description: string
  date: Date
  category: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

export type BudgetCategory = 
  | 'groceries'
  | 'utilities'
  | 'rent'
  | 'entertainment'
  | 'transportation'
  | 'healthcare'
  | 'other'

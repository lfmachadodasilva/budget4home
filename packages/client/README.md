# client

HTTP client for Budget4Home API communication.

## Features

- Generic HTTP client with support for all REST methods
- Type-safe API responses
- Built-in authentication token management
- Budget-specific API client

## Usage

```typescript
import { createClient, BudgetClient } from 'client'

// Create HTTP client
const httpClient = createClient('https://api.example.com')

// Set auth token
httpClient.setAuthToken('your-token')

// Use budget client
const budgetClient = new BudgetClient(httpClient)
const budgets = await budgetClient.getBudgets()
```

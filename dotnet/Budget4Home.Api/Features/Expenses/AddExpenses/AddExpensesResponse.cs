using Budget4Home.Api.Models;

namespace Budget4Home.Api.Features.Expenses.AddExpenses;

public class AddExpensesResponse
{
    public ICollection<ExpenseResponse> Expenses { get; set; }
}
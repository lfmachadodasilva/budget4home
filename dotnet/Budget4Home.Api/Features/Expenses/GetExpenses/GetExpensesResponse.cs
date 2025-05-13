using Budget4Home.Api.Models;

namespace Budget4Home.Api.Features.Expenses.GetExpenses;

public class GetExpensesResponse
{
    public ICollection<ExpenseResponse> Expenses { get; set; }
}
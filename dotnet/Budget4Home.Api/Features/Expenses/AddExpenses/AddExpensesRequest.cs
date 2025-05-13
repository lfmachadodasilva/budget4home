using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;

namespace Budget4Home.Api.Features.Expenses.AddExpenses;

public class AddExpensesRequest
{
    public ICollection<AddExpenseRequest> Expenses { get; set; }
}

public class AddExpenseRequest
{
    public ExpenseType Type { get; set; } = ExpenseType.Out;
    [Required, StringLength(100)]
    public string Name { get; set; }
    [Required, Range(1, long.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
    public long Amount { get; set; }
    [Required]
    public DateTime Date { get; set; }
    [Budget4HomeId]
    public string LabelId { get; set; }

    public ExpenseDocument ToDocument() => new()
    {
        Id = ObjectId.GenerateNewId(),
        Type = Type,
        Name = Name,
        Amount = Amount,
        Date = Date,
        LabelId = LabelId
    };
}
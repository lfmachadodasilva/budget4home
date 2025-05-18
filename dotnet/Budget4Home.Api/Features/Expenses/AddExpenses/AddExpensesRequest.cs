using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;

namespace Budget4Home.Api.Features.Expenses.AddExpenses;

public class AddExpensesRequest
{
    public ICollection<AddExpenseRequest> Expenses { get; set; }
}

public class AddExpenseRequest
{
    [JsonConverter(typeof(JsonStringEnumConverter)), 
     Description("Type of the expense. Out = expense, In = income. Default is Out.")] 
    public ExpenseType Type { get; set; } = ExpenseType.Out;
    [Budget4HomeName, Description("Name of the expense.")]
    public string Name { get; set; }
    [Required,
     Range(1, long.MaxValue, ErrorMessage = "Amount must be greater than zero."),
     Description("Amount of the expense in cents/pennies.")]
    public long Amount { get; set; }
    [Required, Description("Date of the expense.")]
    public DateTime Date { get; set; }
    [Required, Budget4HomeId, Description("Label of the expense.")]
    public string LabelId { get; set; }
    [Description("Comments about the expense.")]
    public string Comments { get; set; }
    [Description("Parent expense id.")]
    public string ParentId { get; set; }

    public ExpenseDocument ToDocument(string id, string groupId) => new()
    {
        Id = string.IsNullOrEmpty(id) ? ObjectId.GenerateNewId() : ObjectId.Parse(id),
        Type = Type,
        Name = Name,
        Amount = Amount,
        Date = Date,
        Comments = Comments,
        LabelId = ObjectId.Parse(LabelId),
        GroupId = ObjectId.Parse(groupId),
        ParentId = string.IsNullOrEmpty(ParentId) ? null : ObjectId.Parse(ParentId),
    };
}
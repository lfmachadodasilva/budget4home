using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Budget4Home.Api.Models.Mongo;

namespace Budget4Home.Api.Models;

public class ExpenseResponse(ExpenseDocument document)
{
    [Required]
    public string Id { get; set; } = document.Id.ToString();
    [Required, JsonConverter(typeof(JsonStringEnumConverter))] 
    public ExpenseType Type { get; set; } = document.Type;
    [Required, Description("Name of the expense.")]
    public string Name { get; set; } = document.Name;
    [Required, Description("Amount of the expense in cents/pennies.")]
    public long Amount { get; set; } = document.Amount;
    [Description("Comments about the expense.")]
    public string Comments { get; set; } = document.Comments;
    [Required, Description("Date of the expense.")]
    public DateTimeOffset Date { get; set; } = document.Date;
    [Required, Description("Label of the expense.")]
    public string LabelId { get; set; } = document.LabelId.ToString();
    [Description("Parent expense id.")]
    public string ParentId { get; set; } = document.ParentId?.ToString();
}
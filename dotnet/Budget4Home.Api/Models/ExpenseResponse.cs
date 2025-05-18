using Budget4Home.Api.Models.Mongo;

namespace Budget4Home.Api.Models;

public class ExpenseResponse(ExpenseDocument document)
{
    public string Id { get; set; } = document.Id.ToString();
    public ExpenseType Type { get; set; } = document.Type;
    public string Name { get; set; } = document.Name;
    public long Amount { get; set; } = document.Amount;
    public DateTimeOffset Date { get; set; } = document.Date;
}
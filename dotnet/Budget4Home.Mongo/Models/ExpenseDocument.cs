namespace Budget4Home.Mongo.Models;

public class ExpenseDocument : BaseDocument
{
    public DateTimeOffset Date { get; set; }
    public string? LabelId { get; set; }
}
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Budget4Home.Mongo.Models;

public enum ExpenseType { Out, In }

public class ExpenseDocument : BaseDocument
{
    [BsonRepresentation(BsonType.String)]
    public ExpenseType Type { get; set; }
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime Date { get; set; }
    public long Amount { get; set; }
    public string LabelId { get; set; }
    public string GroupId { get; set; }
}
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Budget4Home.Api.Models.Mongo;

public enum ExpenseType { Out, In }

public class ExpenseDocument : BaseDocument
{
    [BsonRepresentation(BsonType.String)]
    public ExpenseType Type { get; set; }
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime Date { get; set; }
    public long Amount { get; set; }
    [BsonIgnoreIfNull]
    public string Comments { get; set; }
    public ObjectId LabelId { get; set; }
    public ObjectId GroupId { get; set; }
    [BsonIgnoreIfNull]
    public ObjectId? ParentId { get; set; }
}
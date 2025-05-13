using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Budget4Home.Mongo.Models;

public abstract class BaseDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public required ObjectId Id { get; set; }
    public required string Name { get; set; }
    
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; }
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime UpdatedAt { get; set; }
    
    public string CreatedBy { get; set; }
    public string UpdatedBy { get; set; }
}
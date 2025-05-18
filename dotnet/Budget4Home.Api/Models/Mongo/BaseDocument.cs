using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Budget4Home.Api.Models.Mongo;

public abstract class BaseDocument
{
    [BsonId]
    public required ObjectId Id { get; set; }
    public required string Name { get; set; }
    
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; }
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime UpdatedAt { get; set; }
    
    public ObjectId CreatedBy { get; set; }
    public ObjectId UpdatedBy { get; set; }
    
    public void Create(string userId)
    {
        CreatedAt = DateTime.UtcNow;
        CreatedBy = ObjectId.Parse(userId);
        Update(userId);
    }

    public void Update(string userId)
    {
        UpdatedAt = DateTime.UtcNow;
        UpdatedBy = ObjectId.Parse(userId);
    }
}
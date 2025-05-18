using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Budget4Home.Api.Models.Mongo;

public class UserDocument
{
    [BsonId]
    public ObjectId Id { get; set; }
    [BsonIgnoreIfNull]
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}
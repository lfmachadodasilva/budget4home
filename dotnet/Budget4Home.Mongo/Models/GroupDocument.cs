using MongoDB.Bson;

namespace Budget4Home.Mongo.Models;

public class GroupDocument : BaseDocument
{
    public ICollection<ObjectId> UserIds { get; set; }
}
using MongoDB.Bson;

namespace Budget4Home.Api.Models.Mongo;

public class GroupDocument : BaseDocument
{
    public ICollection<ObjectId> UserIds { get; set; }
}
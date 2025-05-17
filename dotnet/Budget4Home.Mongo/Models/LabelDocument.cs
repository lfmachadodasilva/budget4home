using MongoDB.Bson;

namespace Budget4Home.Mongo.Models;

public class LabelDocument : BaseDocument
{
    public ObjectId GroupId { get; set; }
}
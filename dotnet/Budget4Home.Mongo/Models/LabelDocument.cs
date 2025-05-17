using MongoDB.Bson;

namespace Budget4Home.Mongo.Models;

public class LabelDocument : BaseDocument
{
    public string Icon { get; set; }
    public ObjectId GroupId { get; set; }
}
using MongoDB.Bson;

namespace Budget4Home.Api.Models.Mongo;

public class LabelDocument : BaseDocument
{
    public string Icon { get; set; }
    public ObjectId GroupId { get; set; }
    public ICollection<string> Keys { get; set; }
}
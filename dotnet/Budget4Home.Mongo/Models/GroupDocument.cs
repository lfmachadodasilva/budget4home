namespace Budget4Home.Mongo.Models;

public class GroupDocument : BaseDocument
{
    public ICollection<string> UserIds { get; set; }
}
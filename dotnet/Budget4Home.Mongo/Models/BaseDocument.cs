namespace Budget4Home.Mongo.Models;

public abstract class BaseDocument
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    
    public required string CreatedBy { get; set; }
    public required string UpdatedBy { get; set; }
}
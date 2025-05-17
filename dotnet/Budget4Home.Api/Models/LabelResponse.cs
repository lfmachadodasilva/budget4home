using Budget4Home.Mongo.Models;

namespace Budget4Home.Api.Models;

public class LabelResponse(LabelDocument document)
{
    public string Id { get; set; } = document.Id.ToString();
    public string Name { get; set; } = document.Name;
    public string Icon { get; set; } = document.Icon;
}
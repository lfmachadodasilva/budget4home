using Budget4Home.Api.Models.Mongo;

namespace Budget4Home.Api.Models;

public class LabelResponse(LabelDocument document)
{
    public string Id { get; set; } = document.Id.ToString();
    public string Name { get; set; } = document.Name;
    public string Icon { get; set; } = document.Icon;
    public ICollection<string> Keys { get; set; } = document.Keys;
}
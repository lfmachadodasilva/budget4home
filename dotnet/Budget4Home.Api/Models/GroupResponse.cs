using Budget4Home.Api.Models.Mongo;

namespace Budget4Home.Api.Models;

public class GroupResponse(GroupDocument document)
{
    public string Id { get; set; } = document.Id.ToString();
    public string Name { get; set; } = document.Name;
    public ICollection<string> UserIds { get; set; } = document.UserIds.Select(x => x.ToString()).ToList();
}
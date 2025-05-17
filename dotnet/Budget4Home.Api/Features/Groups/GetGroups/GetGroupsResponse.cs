using Budget4Home.Api.Models;

namespace Budget4Home.Api.Features.Groups.GetGroups;

public class GetGroupsResponse
{
    public ICollection<GroupResponse> Groups { get; set; }
}
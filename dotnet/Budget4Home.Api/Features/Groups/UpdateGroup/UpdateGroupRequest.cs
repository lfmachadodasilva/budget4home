using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Budget4Home.Api.Features.Groups.AddGroup;

namespace Budget4Home.Api.Features.Groups.UpdateGroup;

public class UpdateGroupRequest : AddGroupRequest
{
    [Required, Budget4HomeId]
    public string Id { get; set; }
}
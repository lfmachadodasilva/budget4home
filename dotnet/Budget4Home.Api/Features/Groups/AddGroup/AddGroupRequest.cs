using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;

namespace Budget4Home.Api.Features.Groups.AddGroup;

public class AddGroupRequest
{
    [Budget4HomeName]
    public string Name { get; set; }
    [Required, MinLength(1), Budget4HomeIds]
    public ICollection<string> UserIds { get; set; }

    public GroupDocument ToDocument(string id = null) => new()
    {
        Id = string.IsNullOrEmpty(id) ? ObjectId.GenerateNewId() : ObjectId.Parse(id),
        Name = Name,
        UserIds = UserIds.Select(ObjectId.Parse).ToList()
    };
}
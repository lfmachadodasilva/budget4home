using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;

namespace Budget4Home.Api.Features.Groups.AddGroup;

public class AddGroupRequest
{
    [Required, StringLength(100)]
    public string Name { get; set; }
    [Required, Budget4HomeIds]
    public ICollection<string> UserIds { get; set; }

    public GroupDocument ToDocument() => new()
    {
        Id = ObjectId.GenerateNewId(),
        Name = Name,
        UserIds = UserIds.Select(ObjectId.Parse).ToList()
    };
}
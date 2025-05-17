using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;

namespace Budget4Home.Api.Features.Labels.AddLabel;

public class AddLabelRequest
{
    [Required, StringLength(100)]
    public string Name { get; set; }
    public string Icon { get; set; }
    [Required, Budget4HomeId]
    public string GroupId { get; set; }

    public LabelDocument ToDocument() => new()
    {
        Id = ObjectId.GenerateNewId(),
        Name = Name,
        Icon = Icon,
        GroupId = ObjectId.Parse(GroupId),
    };
}
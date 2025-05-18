using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;

namespace Budget4Home.Api.Features.Labels.AddLabel;

public class AddLabelRequest
{
    [Required, StringLength(100)]
    public string Name { get; set; }
    public string Icon { get; set; }

    public LabelDocument ToDocument(string id, string groupId) => new()
    {
        Id = string.IsNullOrEmpty(id) ? ObjectId.GenerateNewId() : ObjectId.Parse(id),
        Name = Name,
        Icon = Icon,
        GroupId = ObjectId.Parse(groupId),
    };
}
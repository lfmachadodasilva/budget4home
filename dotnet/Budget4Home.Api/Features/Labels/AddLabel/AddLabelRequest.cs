using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;

namespace Budget4Home.Api.Features.Labels.AddLabel;

public class AddLabelRequest
{
    [Budget4HomeName]
    public string Name { get; set; }
    [MaxLength(100)]
    public string Icon { get; set; }
    public ICollection<string> Keys { get; set; }

    public LabelDocument ToDocument(string id, string groupId) => new()
    {
        Id = string.IsNullOrEmpty(id) ? ObjectId.GenerateNewId() : ObjectId.Parse(id),
        Name = Name,
        Icon = Icon,
        GroupId = ObjectId.Parse(groupId),
        Keys = Keys
    };
}
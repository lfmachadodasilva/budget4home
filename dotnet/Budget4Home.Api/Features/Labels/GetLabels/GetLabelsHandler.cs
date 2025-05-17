using Budget4Home.Api.Attributes;
using Budget4Home.Api.Features.Groups.GetGroup;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Labels.GetLabels;

[AutoRegister(typeof(GetLabelsHandler), Scope = ServiceScope.Scoped)]
public class GetLabelsHandler(
    IMongoCollection<LabelDocument> collection,
    GetGroupHandler getGroupHandler)
{
    public async Task<ICollection<LabelDocument>> Handle(string groupId, CancellationToken cancellationToken)
    {
        await getGroupHandler.Handle(groupId, cancellationToken);

        var docs = await collection
            .Find(x => x.GroupId == ObjectId.Parse(groupId))
            .ToListAsync(cancellationToken);
        
        return docs;
    }
}
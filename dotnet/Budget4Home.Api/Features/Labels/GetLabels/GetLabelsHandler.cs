using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Labels.GetLabels;

[AutoRegister(typeof(GetLabelsHandler), Scope = ServiceScope.Scoped)]
public class GetLabelsHandler(IMongoCollection<LabelDocument> collection)
{
    public async Task<ICollection<LabelDocument>> Handle(string groupId, CancellationToken cancellationToken)
    {
        return await collection
            .Find(x => x.GroupId == ObjectId.Parse(groupId))
            .ToListAsync(cancellationToken);
    }
}
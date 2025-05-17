using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Groups.GetGroup;

[AutoRegister(typeof(GetGroupHandler), Scope = ServiceScope.Scoped)]
public class GetGroupHandler(
    IMongoCollection<GroupDocument> groupCollection,
    AuthContext authContext)
{
    public async Task<GroupDocument> Handle(
        string groupId,
        CancellationToken cancellationToken) => await groupCollection
            .Find(x => x.Id == ObjectId.Parse(groupId) && x.UserIds.Contains(ObjectId.Parse(authContext.UserId)))
            .FirstOrDefaultAsync(cancellationToken);
}
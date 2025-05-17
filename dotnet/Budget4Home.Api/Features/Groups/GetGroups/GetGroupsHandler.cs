using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Groups.GetGroups;

public class GetGroupsHandler(
    AuthContext authContext,
    IMongoCollection<GroupDocument> collection)
{
    public async Task<ICollection<GroupDocument>> Handle(CancellationToken cancellationToken) => await collection
        .Find(Builders<GroupDocument>.Filter.AnyEq(x => x.UserIds, ObjectId.Parse(authContext.UserId)))
        .ToListAsync(cancellationToken);
}
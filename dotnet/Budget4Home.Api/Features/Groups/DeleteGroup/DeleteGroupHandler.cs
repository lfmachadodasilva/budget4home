using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Api.Configuration.Exceptions;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Groups.DeleteGroup;

[AutoRegister(typeof(DeleteGroupHandler), Scope = ServiceScope.Scoped)]
public class DeleteGroupHandler(AuthContext authContext, IMongoCollection<GroupDocument> collection)
{
    public async Task RunAsync(string groupId, CancellationToken cancellationToken)
    {
        var result = await collection.DeleteOneAsync(
            Builders<GroupDocument>.Filter.And(
                Builders<GroupDocument>.Filter.Eq(x => x.Id, ObjectId.Parse(groupId)), 
                Builders<GroupDocument>.Filter.ElemMatch(x => x.UserIds, x => x == ObjectId.Parse(authContext.UserId))),
            cancellationToken);
        
        if (result.IsAcknowledged && result.DeletedCount == 0)
        {
            throw new NotFoundException($"Group {groupId} not found.");
        }
    }
}
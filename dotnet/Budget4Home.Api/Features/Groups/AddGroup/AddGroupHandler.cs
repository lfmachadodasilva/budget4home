using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Groups.AddGroup;

[AutoRegister(typeof(AddGroupHandler), Scope = ServiceScope.Scoped)]
public class AddGroupHandler(
    AuthContext authContext,
    IMongoCollection<GroupDocument> collection,
    ILogger<AddGroupHandler> logger)
{
    public async Task<GroupDocument> Handle(
        AddGroupRequest request,
        CancellationToken cancellationToken)
    {
        var doc = request.ToDocument();
        doc.Create(authContext.UserId);
        
        await collection.InsertOneAsync(doc, new InsertOneOptions(), cancellationToken);
        
        logger.LogInformation("Added group {ObjectId}.", doc.Id.ToString());
        
        return doc;
    }
}
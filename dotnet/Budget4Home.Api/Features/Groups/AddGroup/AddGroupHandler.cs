using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Mongo.Models;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Groups.AddGroup;

public class AddGroupHandler(AuthContext authContext, IMongoCollection<GroupDocument> collection)
{
    public async Task<GroupDocument> Handle(
        AddGroupRequest request,
        CancellationToken cancellationToken)
    {
        var doc = request.ToDocument();
        doc.Create(authContext.UserId);
        
        await collection.InsertOneAsync(doc, new InsertOneOptions(), cancellationToken);
        
        return doc;
    }
}
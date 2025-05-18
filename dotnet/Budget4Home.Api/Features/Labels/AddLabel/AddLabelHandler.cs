using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Contexts;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Labels.AddLabel;

[AutoRegister(typeof(AddLabelHandler), Scope = ServiceScope.Scoped)]
public class AddLabelHandler(
    AuthContext authContext,
    IMongoCollection<LabelDocument> collection,
    ILogger<AddLabelHandler> logger)
{
    public async Task<LabelDocument> Handle(
        string groupId,
        AddLabelRequest request,
        CancellationToken cancellationToken)
    {
        var doc = request.ToDocument(id: null, groupId: groupId);
        doc.Create(authContext.UserId);
        
        await collection.InsertOneAsync(doc, new InsertOneOptions(), cancellationToken);
        
        logger.LogInformation("Added label {ObjectId}.", doc.Id.ToString());
        
        return doc;
    }
}
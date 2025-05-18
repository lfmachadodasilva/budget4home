using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration;
using Budget4Home.Api.Configuration.Models;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Users.Register;

[AutoRegister(typeof(RegisterHandler), Scope = ServiceScope.Scoped)]
public class RegisterHandler(IMongoCollection<UserDocument> collection, Budget4HomeSettings settings)
{
    public async Task<UserDocument> RunAsync(RegisterRequest request, CancellationToken cancellationToken)
    {
        request.Password = BCrypt.Net.BCrypt.HashPassword(request.Password + settings.SecurityKey);
        var doc = request.ToDocument(id: null);
        await collection.InsertOneAsync(doc, cancellationToken: cancellationToken);
        return doc;
    }
}
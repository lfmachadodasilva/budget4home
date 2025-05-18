using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Users.GetUsers;

[AutoRegister(typeof(GetUsersHandle), Scope = ServiceScope.Scoped)]
public class GetUsersHandle(IMongoCollection<UserDocument> collection)
{
    public async Task<ICollection<UserDocument>> RunAsync(CancellationToken cancellationToken) => 
        await collection.Find(_ => true).ToListAsync(cancellationToken);
}
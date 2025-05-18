using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Users.UpdateUser;

[AutoRegister(typeof(UpdateUserHandler), Scope = ServiceScope.Scoped)]
public class UpdateUserHandler(IMongoCollection<UserDocument> collection, Budget4HomeSettings settings)
{
    public async Task<UserDocument> RunAsync(
        string userId,
        UpdateUserRequest request,
        CancellationToken cancellationToken)
    {
        var filter = Builders<UserDocument>.Filter.Eq(x => x.Id, ObjectId.Parse(userId));
        var update = Builders<UserDocument>.Update.Combine();

        update.Set(x => x.Username, request.Username);
        update.Set(x => x.Email, request.Email);

        if (!string.IsNullOrEmpty(request.Password))
        {
            request.Password = BCrypt.Net.BCrypt.HashPassword(request.Password + settings.SecurityKey);
            update.Set(x => x.Password, request.Password);
        }

        var result = await collection.FindOneAndUpdateAsync(filter, update, cancellationToken: cancellationToken);
        return result;
    }
}
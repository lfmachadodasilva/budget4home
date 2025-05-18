using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Api.Configuration.Exceptions;
using Budget4Home.Api.Models.Mongo;
using Budget4Home.Api.Utils;
using Microsoft.Extensions.Caching.Memory;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Groups.GetGroup;

[AutoRegister(typeof(GetGroupHandler), Scope = ServiceScope.Scoped)]
public class GetGroupHandler(
    IMongoCollection<GroupDocument> groupCollection,
    AuthContext authContext,
    IMemoryCache memoryCache)
{
    public async Task<GroupDocument> RunAsync(
        string groupId,
        CancellationToken cancellationToken)
    {
        var result = await memoryCache.GetOrCreateAsync(
            CacheKeys.GetGroupKey(groupId, authContext.UserId),
            async _ =>
            {
                return await groupCollection
                    .Find(x => x.Id == ObjectId.Parse(groupId) && x.UserIds.Contains(ObjectId.Parse(authContext.UserId)))
                    .FirstOrDefaultAsync(cancellationToken);
            },
            new MemoryCacheEntryOptions { AbsoluteExpirationRelativeToNow = CacheKeys.DefaultCacheDuration });

        if (result is null)
        {
            throw new NotFoundException($"Group {groupId} not found.");
        }

        return result;
    }
}
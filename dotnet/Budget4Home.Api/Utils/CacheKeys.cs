namespace Budget4Home.Api.Utils;

public static class CacheKeys
{
    public static string GetGroupKey(string groupId, string userId) => $"group:{groupId}:{userId}";
    public static TimeSpan DefaultCacheDuration => TimeSpan.FromMinutes(5);
}
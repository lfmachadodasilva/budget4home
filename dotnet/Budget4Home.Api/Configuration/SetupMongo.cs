using Budget4Home.Api.Models.Mongo;
using MongoDB.Driver;

namespace Budget4Home.Api.Configuration;

public class MongoSettings
{
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
}

public static class SetupMongo
{
    private const string ExpenseCollectionName = "expenses";
    private const string LabelCollectionName = "labels";
    private const string GroupCollectionName = "groups";
    
    public static IServiceCollection AddMongoDb(this IServiceCollection services, MongoSettings settings)
    {
        services.AddSingleton<IMongoClient>(_ => new MongoClient(settings.ConnectionString));
        services.AddSingleton(s => s.GetRequiredService<IMongoClient>().GetDatabase(settings.DatabaseName));
        
        services.AddSingleton(s =>
        {
            var collection = s
                .GetRequiredService<IMongoDatabase>()
                .GetCollection<ExpenseDocument>(ExpenseCollectionName);
            collection.Indexes.CreateMany([
                new CreateIndexModel<ExpenseDocument>(
                    Builders<ExpenseDocument>.IndexKeys
                        .Ascending(x => x.GroupId)
                        .Descending(x => x.Date),
                    new CreateIndexOptions { Background = true, Unique = false})
            ]);
            return collection;
        });
        services.AddSingleton(s =>
        {
            var collection = s
                .GetRequiredService<IMongoDatabase>()
                .GetCollection<LabelDocument>(LabelCollectionName);
            collection.Indexes.CreateMany([
                new CreateIndexModel<LabelDocument>(
                    Builders<LabelDocument>.IndexKeys.Ascending(x => x.GroupId),
                    new CreateIndexOptions { Background = true, Unique = false})
            ]);
            return collection;
        });
        services.AddSingleton(s =>
        {
            var collection = s
                .GetRequiredService<IMongoDatabase>()
                .GetCollection<GroupDocument>(GroupCollectionName);
            collection.Indexes.CreateMany([
                new CreateIndexModel<GroupDocument>(
                    Builders<GroupDocument>.IndexKeys.Ascending(x => x.UserIds),
                    new CreateIndexOptions { Background = true, Unique = false})
            ]);
            return collection;
        });
        
        return services;
    }
}
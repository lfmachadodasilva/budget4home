using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Expenses.GetExpenses;

[AutoRegister(typeof(GetExpensesHandler), Scope = ServiceScope.Scoped)]
public class GetExpensesHandler(IMongoCollection<ExpenseDocument> collection)
{
    public async Task<ICollection<ExpenseDocument>> RunAsync(
        string groupId,
        DateTime? from,
        DateTime? to,
        CancellationToken cancellationToken = default)
    {
        var filter = Builders<ExpenseDocument>.Filter.Eq(x => x.GroupId, ObjectId.Parse(groupId));
        
        var now = DateTime.UtcNow;
        
        from ??= new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);
        filter &= Builders<ExpenseDocument>.Filter.Gte(x => x.Date, from);
        
        to ??= new DateTime(
            now.Year,
            now.Month,
            DateTime.DaysInMonth(now.Year, now.Month),
            23, 59, 59, 999, DateTimeKind.Utc);
        filter &= Builders<ExpenseDocument>.Filter.Lte(x => x.Date, to);
        
        return await collection.Find(filter).ToListAsync(cancellationToken);
    }
}
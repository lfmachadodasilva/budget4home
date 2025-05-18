using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Expenses.AddExpenses;

[AutoRegister(typeof(AddExpensesHandler), Scope = ServiceScope.Scoped)]
public class AddExpensesHandler(
    IMongoCollection<ExpenseDocument> collection,
    AuthContext authContext)
{
    public async Task<ICollection<ExpenseDocument>> RunAsync(
        string groupId,
        AddExpensesRequest request,
        CancellationToken cancellationToken)
    {
        var docs = request.Expenses
            .Select(x =>
            {
                var doc = x.ToDocument(id: null, groupId: groupId);
                doc.CreatedAt = DateTime.UtcNow;
                doc.UpdatedAt = DateTime.UtcNow;
                doc.GroupId = ObjectId.Parse(groupId);
                doc.CreatedBy = ObjectId.Parse(authContext.UserId);
                doc.UpdatedBy = ObjectId.Parse(authContext.UserId);
                return doc;
            })
            .ToList();
        await collection.InsertManyAsync(docs, new InsertManyOptions(), cancellationToken);
        return docs;
    }
}
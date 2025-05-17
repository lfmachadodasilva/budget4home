using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Api.Features.Groups.AddGroup;
using Budget4Home.Api.Features.Groups.GetGroup;
using Budget4Home.Api.Features.Groups.GetGroups;
using Budget4Home.Mongo;

var builder = WebApplication.CreateBuilder(args);

// bind settings
var mongoSettings = builder.Configuration.GetSection("Mongo").Get<MongoSettings>();

// Add services to the container.
builder.Services.AddControllers(options =>
{
    options.Filters.Add<AuthActionFilter>();
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.EnableAnnotations();
});

builder.Services.AddMongoDb(mongoSettings);
builder.Services.AddScoped<AuthContext>();

// Group
builder.Services.AddScoped<AddGroupHandler>();
builder.Services.AddScoped<GetGroupHandler>();
builder.Services.AddScoped<GetGroupsHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseSwagger();
app.UseSwaggerUI();

var options = new DefaultFilesOptions();
options.DefaultFileNames.Clear();
options.DefaultFileNames.Add("index.html");

app.UseHttpsRedirection()
    .UseDefaultFiles()
    .UseStaticFiles()
    .UseAuthorization();

app.MapControllers();

app.Run();
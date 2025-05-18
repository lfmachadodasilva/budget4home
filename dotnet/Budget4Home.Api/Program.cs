using System.Text;
using System.Text.Json.Serialization;
using Budget4Home.Api.Configuration;
using Budget4Home.Api.Configuration.Filters;
using Budget4Home.Api.Configuration.Middlewares;
using Budget4Home.Api.Configuration.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// bind settings
var settings = builder.Configuration.GetSection("Budget4home").Get<Budget4HomeSettings>();
builder.Services.AddSingleton(settings);

// Add services to the container.
builder.Services
    .AddControllers(options =>
    {
        options.Filters.Add<AuthActionFilter>();
        options.Filters.Add<GroupActionFilter>();
    })
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.EnableAnnotations();
});

builder.Services.AddMongoDb(settings.Mongo);
builder.Services.AddAutoRegister(typeof(Program).Assembly);
builder.Services.AddMemoryCache();
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(settings.SecurityKey)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
builder.Configuration.AddEnvironmentVariables();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseMiddleware<GlobalExceptionMiddleware>();

var options = new DefaultFilesOptions();
options.DefaultFileNames.Clear();
options.DefaultFileNames.Add("index.html");

app.UseHttpsRedirection()
    .UseDefaultFiles()
    .UseStaticFiles()
    .UseAuthorization();

app.MapControllers();

app.Run();
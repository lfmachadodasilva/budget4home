namespace Budget4Home.Api.Configuration.Models;

public class Budget4HomeSettings
{
    public string SecurityKey { get; set; }
    public MongoSettings Mongo { get; set; }
}
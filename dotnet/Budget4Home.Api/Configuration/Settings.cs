namespace Budget4Home.Api.Configuration;

public class Budget4HomeSettings
{
    public string SecurityKey { get; set; }
    public MongoSettings Mongo { get; set; }
}

public class MongoSettings
{
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
}
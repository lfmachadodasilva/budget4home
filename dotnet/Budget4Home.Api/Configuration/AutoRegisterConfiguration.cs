using System.Reflection;
using Budget4Home.Api.Attributes;

namespace Budget4Home.Api.Configuration;

public static class AutoRegisterConfiguration
{
    public static IServiceCollection AddAutoRegister(
        this IServiceCollection services,
        Assembly assembly)
    {
        ArgumentNullException.ThrowIfNull(assembly);

        var collections = assembly.GetTypes()
            .Select(t => (Type: t, Attributes: t.GetCustomAttributes(typeof(AutoRegisterAttribute), true)))
            .Where(x => x.Attributes.Length > 0)
            .Select(x => (x.Type, Attributes: x.Attributes.Cast<AutoRegisterAttribute>()))
            .ToList();

        foreach (var pair in collections)
        {
            foreach (var attribute in pair.Attributes)
            {
                switch (attribute.Scope)
                {
                    case ServiceScope.Scoped:
                        services.AddScoped(attribute.ServiceType ?? pair.Type, pair.Type);
                        break;
                    case ServiceScope.Singleton:
                        services.AddSingleton(attribute.ServiceType ?? pair.Type, pair.Type);
                        break;
                    case ServiceScope.Transient:
                        services.AddTransient(attribute.ServiceType ?? pair.Type, pair.Type);
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
        }

        return services;
    }
}
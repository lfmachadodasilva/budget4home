namespace Budget4Home.Api.Attributes;

public enum ServiceScope
{
    Singleton,
    Scoped,
    Transient
}

[AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = true)]
public sealed class AutoRegisterAttribute(Type serviceType) : Attribute
{
    public Type ServiceType { get; } = serviceType;

    public ServiceScope Scope { get; set; }
}
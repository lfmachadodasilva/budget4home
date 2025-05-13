using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;

namespace Budget4Home.Api.Attributes;

[AttributeUsage(AttributeTargets.Parameter | AttributeTargets.Property)]
public class Budget4HomeIdAttribute : ValidationAttribute
{
    private static readonly int ObjectIdSize = new ObjectId().ToString().Length;
    
    public Budget4HomeIdAttribute()
    {
        // Default error message with a placeholder for the field name
        ErrorMessage = "{0} must be exactly " +
                       $"{ObjectIdSize} hexadecimal characters.";
    }

    public override bool IsValid(object value)
    {
        ArgumentNullException.ThrowIfNull(value);
        
        if (value is not string str)
            return false;

        
        return str.Length == ObjectIdSize;
    }

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        ArgumentNullException.ThrowIfNull(value);
        
        if (!IsValid(value))
        {
            var fieldName = validationContext.DisplayName ?? validationContext.MemberName ?? "Value";
            var errorMessage = FormatErrorMessage(fieldName);
            return new ValidationResult(errorMessage);
        }

        return ValidationResult.Success;
    }
}
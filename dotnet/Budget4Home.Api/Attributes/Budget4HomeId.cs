using System.Collections;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;

namespace Budget4Home.Api.Attributes;

[AttributeUsage(AttributeTargets.Parameter | AttributeTargets.Property)]
public class Budget4HomeIdAttribute : ValidationAttribute
{
    public Budget4HomeIdAttribute()
    {
        // Default error message with a placeholder for the field name
        ErrorMessage = "{0} must be valid id";
    }
    
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is string stringValue && ObjectId.TryParse(stringValue, out _))
        {
            return ValidationResult.Success;
        }
    
        var fieldName = validationContext.DisplayName;
        var errorMessage = FormatErrorMessage(fieldName);
        return new ValidationResult(errorMessage);
    }
}

[AttributeUsage(AttributeTargets.Parameter | AttributeTargets.Property)]
public class Budget4HomeIdsAttribute : ValidationAttribute
{
    private readonly Budget4HomeIdAttribute _singleValidator = new();
    public Budget4HomeIdsAttribute()
    {
        // Default error message with a placeholder for the field name
        ErrorMessage = "{0} must be valid id";
    }
    
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is not IEnumerable collection)
            return new ValidationResult("Value is not a collection.");

        foreach (var item in collection)
        {
            if (item is string str)
            {
                var result = _singleValidator.GetValidationResult(str, validationContext);
                if (result != ValidationResult.Success)
                {
                    return new ValidationResult(result?.ErrorMessage ?? "Invalid id");
                }
            }
            else
            {
                var fieldName = validationContext.DisplayName;
                var errorMessage = FormatErrorMessage(fieldName);
                return new ValidationResult(errorMessage);
            }
        }

        return ValidationResult.Success;
    }
}
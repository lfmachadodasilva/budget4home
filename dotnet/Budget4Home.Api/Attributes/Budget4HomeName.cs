using System.ComponentModel.DataAnnotations;

namespace Budget4Home.Api.Attributes;

[AttributeUsage(AttributeTargets.Parameter | AttributeTargets.Property)]
public class Budget4HomeNameAttribute(int minLength = 3, int maxLength = 100) : ValidationAttribute
{
    private int MinLength { get; set; } = minLength;
    private int MaxLength { get; set; } = maxLength;

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var fieldName = validationContext.DisplayName;
        var stringValue = value as string;

        if (string.IsNullOrWhiteSpace(stringValue))
        {
            return new ValidationResult($"{fieldName} is required.");
        }

        if (stringValue.Length < MinLength)
        {
            return new ValidationResult($"{fieldName} must be at least {MinLength} characters long.");
        }

        if (stringValue.Length > MaxLength)
        {
            return new ValidationResult($"{fieldName} must be at most {MaxLength} characters long.");
        }

        return ValidationResult.Success;
    }
}
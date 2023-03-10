using FluentValidation;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ContactManaging.Core.RequestModels
{
    public class SaveContactRequestModel
    {

        public string FirstName { get; set; }

        public string Surname { get; set; }

        public DateOnly DateOfBirth { get; set; }

        public string? Address { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Iban { get; set; }
    }

    public class SaveContactRequestModelValidator : AbstractValidator<SaveContactRequestModel>
    {
        public SaveContactRequestModelValidator()
        {
            RuleFor(c => c.FirstName)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(c => c.Surname)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(c => c.DateOfBirth)
                .NotEmpty()
                .LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.Today));

            RuleFor(c => c.Address)
                .MaximumLength(200)
                .Unless(c => string.IsNullOrEmpty(c.Address));

            RuleFor(c => c.PhoneNumber)
                .Matches(new Regex("^\\+?[0-9]{7,14}$"))
                .Unless(c => string.IsNullOrEmpty(c.PhoneNumber));

            RuleFor(c => c.Iban)
                .Matches(new Regex("^([A-Z]{2}[ \\-]?[0-9]{2})(?=(?:[ \\-]?[A-Z0-9]){9,30}$)((?:[ \\-]?[A-Z0-9]{3,5}){2,7})([ \\-]?[A-Z0-9]{1,3})?$"))
                .Unless(c => string.IsNullOrEmpty(c.Iban));
        }
    }
}

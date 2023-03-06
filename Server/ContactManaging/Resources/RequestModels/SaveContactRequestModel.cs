using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactManaging.Core.RequestModels
{
    public class SaveContactRequestModel
    {
        public string FirstName { get; set; } = default!;

        public string Surname { get; set; } = default!;

        public DateTime DateOfBirth { get; set; } = default!;

        public string? Address { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Iban { get; set; }
    }
}

﻿namespace ContactManaging.Core.Data
{
    public class Contact
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = default!;

        public string Surname { get; set; } = default!;

        public DateTime DateOfBirth { get; set; }

        public string? Address { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Iban { get; set; }
    }
}
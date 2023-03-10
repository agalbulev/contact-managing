using ContactManaging.Core.Data;
using ContactManaging.Core.Interfaces.CommandHandlers;
using ContactManaging.Core.RequestModels;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactManaging.Core.Handlers.CommandHandlers
{
    public class SaveContactCommandHandler : ISaveContactCommandHander
    {
        private readonly ContactsDbContext _contactsDbContext;

        public SaveContactCommandHandler(ContactsDbContext contactsDbContext)
        {
            _contactsDbContext = contactsDbContext;
        }

        public async Task<int> Save(SaveContactRequestModel command)
        {
            var newContact = new Contact
            {
                FirstName = command.FirstName,
                Surname = command.Surname,
                Address = command.Address,
                Iban = command.Iban,
                DateOfBirth = command.DateOfBirth.ToDateTime(TimeOnly.MinValue),
                PhoneNumber = command.PhoneNumber
            };

            _contactsDbContext.Contacts.Add(newContact);
            await _contactsDbContext.SaveChangesAsync();
            return newContact.Id;
        }
    }
}

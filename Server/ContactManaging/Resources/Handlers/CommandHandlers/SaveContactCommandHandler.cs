﻿using ContactManaging.Core.Commands;
using ContactManaging.Core.Data;
using ContactManaging.Core.Interfaces.CommandHandlers;
using System;
using System.Collections.Generic;
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

        public async Task<int> Save(SaveContactCommand command)
        {
            var newContact = new Contact
            {
                FirstName = command.FirstName,
                Surname = command.Surname,
                Address = command.Address,
                DateOfBirth = command.DateOfBirth,
                Iban = command.Iban,
                PhoneNumber = command.PhoneNumber
            };

            _contactsDbContext.Contacts.Add(newContact);
            await _contactsDbContext.SaveChangesAsync();
            return newContact.Id;
        }
    }
}

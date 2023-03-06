using ContactManaging.Core.Data;
using ContactManaging.Core.Interfaces.QueryHandlers;
using ContactManaging.Core.ResponseModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactManaging.Core.Handlers.QueryHandlers
{
    public class GetAllContactsQueryHandler : IGetAllContactsQueryHandler
    {
        private readonly ContactsDbContext _contactsDbContext;

        public GetAllContactsQueryHandler(ContactsDbContext contactsDbContext)
        {
            _contactsDbContext = contactsDbContext;
        }

        public async Task<List<AllContactsResponseModel>> GetContacts()
        {
            var contacts = await _contactsDbContext.Contacts.Select(p => new AllContactsResponseModel
            {
                Id = p.Id,
                FirstName = p.FirstName,
                Surname = p.Surname,
                Address = p.Address,
                DateOfBirth = p.DateOfBirth,
                Iban = p.Iban,
                PhoneNumber = p.PhoneNumber
            }).ToListAsync();

            return contacts;
        }
    }
}

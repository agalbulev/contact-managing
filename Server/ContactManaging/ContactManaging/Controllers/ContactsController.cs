using ContactManaging.Core.Interfaces.CommandHandlers;
using ContactManaging.Core.Interfaces.QueryHandlers;
using ContactManaging.Core.RequestModels;
using Microsoft.AspNetCore.Mvc;

namespace ContactManaging.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly ISaveContactCommandHander _saveContactCommandHander;

        private readonly IGetAllContactsQueryHandler _getAllContactsQueryHandler;

        public ContactsController(ISaveContactCommandHander saveContactCommandHander, IGetAllContactsQueryHandler getAllContactsQueryHandler)
        {
            _saveContactCommandHander = saveContactCommandHander;
            _getAllContactsQueryHandler = getAllContactsQueryHandler;
        }

        [HttpPost]
        public async Task<IActionResult> AddContact(SaveContactRequestModel contact)
        {
            var result = await _saveContactCommandHander.Save(contact);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            var result = await _getAllContactsQueryHandler.GetContacts();
            return Ok(result);
        }
    }
}

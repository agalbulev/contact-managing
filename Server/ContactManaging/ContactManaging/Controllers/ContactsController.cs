using ContactManaging.Core.Commands;
using ContactManaging.Core.Interfaces.CommandHandlers;
using Microsoft.AspNetCore.Mvc;

namespace ContactManaging.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly ISaveContactCommandHander _saveContactCommandHander;

        public ContactsController(ISaveContactCommandHander saveContactCommandHander)
        {
            _saveContactCommandHander = saveContactCommandHander;
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> AddContact(SaveContactCommand contact)
        {
            var result = await _saveContactCommandHander.Save(contact);
            return Ok(result);
        }
    }
}

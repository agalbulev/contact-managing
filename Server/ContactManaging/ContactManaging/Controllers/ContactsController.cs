using ContactManaging.Core.Interfaces.CommandHandlers;
using ContactManaging.Core.Interfaces.QueryHandlers;
using ContactManaging.Core.RequestModels;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ContactManaging.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly ISaveContactCommandHander _saveContactCommandHander;

        private readonly IGetAllContactsQueryHandler _getAllContactsQueryHandler;

        private readonly IValidator<SaveContactRequestModel> _saveContactRequestModelValidator;

        public ContactsController(
            ISaveContactCommandHander saveContactCommandHander,
            IGetAllContactsQueryHandler getAllContactsQueryHandler,
            IValidator<SaveContactRequestModel> saveContactRequestModelValidator
            )
        {
            _saveContactCommandHander = saveContactCommandHander;
            _getAllContactsQueryHandler = getAllContactsQueryHandler;
            _saveContactRequestModelValidator = saveContactRequestModelValidator;
        }

        [HttpPost]
        public async Task<IActionResult> AddContact(SaveContactRequestModel contact)
        {
            ValidationResult validation = await _saveContactRequestModelValidator.ValidateAsync(contact);

            if (!validation.IsValid)
            {
                var errorMessages = validation.Errors
                    .GroupBy(x => x.PropertyName)
                    .ToDictionary(
                      g => g.Key,
                      g => g.Select(x => x.ErrorMessage).ToArray()
                    );
                return BadRequest(errorMessages);
            }

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

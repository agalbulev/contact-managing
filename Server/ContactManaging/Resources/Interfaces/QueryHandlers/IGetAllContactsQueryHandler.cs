using ContactManaging.Core.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactManaging.Core.Interfaces.QueryHandlers
{
    public interface IGetAllContactsQueryHandler
    {
        Task<List<AllContactsResponseModel>> GetContacts();
    }
}

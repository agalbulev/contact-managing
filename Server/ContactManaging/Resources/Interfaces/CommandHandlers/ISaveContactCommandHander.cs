﻿using ContactManaging.Core.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactManaging.Core.Interfaces.CommandHandlers
{
    public interface ISaveContactCommandHander
    {
        Task<int> Save(SaveContactCommand command);
    }
}

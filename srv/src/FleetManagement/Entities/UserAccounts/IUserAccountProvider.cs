﻿using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.UserAccounts.Models;

namespace FleetManagement.Entities.UserAccounts
{
    public interface IUserAccountProvider : IBaseOperations<UserAccount>
    {
        UserAccount GetUserByEmail(string email);
    }
}
using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.ManagerAccounts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.Entities.ManagerAccounts
{
    public interface IManagerAccountProvider : IBaseOperations<ManagerAccount>
    {
        
    }
}

using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Companies.Models;

namespace FleetManagement.Entities.Companies
{
    public interface ICompanyProvider : IBaseOperations<Company>
    {
        bool CheckIfThisNipAlreadyExists(string nip);
        bool CheckIfThisNameAlreadyExists(string name);
        bool CheckIfThisMailAlreadyExists(string mail);
    }
}

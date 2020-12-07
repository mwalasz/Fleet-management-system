using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Companies.Models;

namespace FleetManagement.Entities.Companies
{
    public interface ICompanyProvider : IBaseOperations<Company>
    {
        public Company GetByNip(string nip);
        public bool CheckIfThisNipAlreadyExists(string nip);
        public bool CheckIfThisNameAlreadyExists(string name);
        public bool CheckIfThisMailAlreadyExists(string mail);
    }
}

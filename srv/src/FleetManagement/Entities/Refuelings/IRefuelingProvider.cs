using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Refuelings.Models;
using FleetManagement.Entities.Refuelings.Params;

namespace FleetManagement.Entities.Refuelings
{
    public interface IRefuelingProvider : IBaseOperations<Refueling>
    {
        public Refueling GetByParams(NewRefuelingParams newRefueling);
    }
}

using FleetManagement.Db.BaseOperations;
using System.Collections.Generic;

namespace FleetManagement.Db.Seeds
{
    public interface IDbSeeder<T1, T2> where T1 : IRepositoryBaseOperations<T2>
    {
        void Seed(IEnumerable<T2> data);
    }
}

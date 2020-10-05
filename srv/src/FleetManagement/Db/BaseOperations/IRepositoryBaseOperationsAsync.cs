using System.Collections.Generic;
using System.Threading.Tasks;

namespace FleetManagement.Db.BaseOperations
{
    public interface IRepositoryBaseOperationsAsync<T>
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(object id);
        void AddAsync(T entity);
        void UpdateAsync(T entity);
        void RemoveAsync(T entity);
    }
}

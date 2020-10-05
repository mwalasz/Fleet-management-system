using System.Collections.Generic;

namespace FleetManagement.Db.BaseOperations
{
    public interface IRepositoryBaseOperations<T>
    {
        IEnumerable<T> GetAll();
        T GetById(object id);
        void Add(T entity);
        void Update(T entity);
        void Remove(T entity);
    }
}

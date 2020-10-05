using NHibernate;
using NHibernate.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FleetManagement.Db.BaseOperations
{
    public class DbBasicOperations<T> : IBaseOperations<T>
    {
        private readonly ISessionFactory sessionFactory;

        public DbBasicOperations(ISessionFactory sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }

        public virtual void Add(T entity)
        {
            using var session = sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();

            session.Save(entity);
            transaction.Commit();
        }

        public virtual async void AddAsync(T entity)
        {
            using var session = sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();

            await session.SaveAsync(entity);
            await transaction.CommitAsync();
        }

        public virtual IEnumerable<T> GetAll()
        {
            using var session = sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();

            return session.Query<T>().ToList();
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            using var session = sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();

            return await session.Query<T>().ToListAsync();
        }

        public virtual T GetById(object id)
        {
            using var session = sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();

            return session.Get<T>(id);
        }

        public virtual async Task<T> GetByIdAsync(object id)
        {
            using var session = sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();

            return await session.GetAsync<T>(id);
        }

        public virtual void Remove(T entity)
        {
            using var session = sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();

            session.Delete(entity);
            transaction.Commit();
        }

        public virtual async void RemoveAsync(T entity)
        {
            using var session = sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();

            await session.DeleteAsync(entity);
            await transaction.CommitAsync();
        }

        public virtual void Update(T entity)
        {
            using var session = sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();

            session.Update(entity);
            transaction.Commit();
        }

        public virtual async void UpdateAsync(T entity)
        {
            using var session = sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();

            await session.UpdateAsync(entity);
            await transaction.CommitAsync();
        }
    }
}

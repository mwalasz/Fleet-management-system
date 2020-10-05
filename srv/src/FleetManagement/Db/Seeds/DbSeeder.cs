using FleetManagement.Db.BaseOperations;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.Db.Seeds
{
    public class DbSeeder<T1, T2> : IDbSeeder<T1, T2> where T1 : IRepositoryBaseOperations<T2>
    {
        private readonly ISessionFactory sessionFactory;

        public DbSeeder(ISessionFactory sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }

        public void Seed(IEnumerable<T2> data)
        {
            using var session = sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();

            foreach (var entity in data)
                session.Save(entity);

            transaction.Commit();
        }
    }
}

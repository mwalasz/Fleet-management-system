using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.ManagerAccounts;
using FleetManagement.Entities.ManagerAccounts.Models;
using FleetManagement.Entities.UserAccounts;
using NHibernate;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class ManagerAccountsRepository : DbBasicOperations<ManagerAccount>, IManagerAccountProvider
    {
        private readonly IUserAccountProvider userAccountProvider;

        public ManagerAccountsRepository(ISessionFactory sessionFactory, IUserAccountProvider userAccountProvider) : base(sessionFactory)
        {
            this.userAccountProvider = userAccountProvider;
        }

        public ManagerAccount GetByMail(string mail)
        {
            var user = userAccountProvider.GetByMail(mail);

            if (user != null)
                return GetAll()
                    .FirstOrDefault(x => x.UserAccountId == user.Id) ?? null;
            else return null;
        }
    }
}

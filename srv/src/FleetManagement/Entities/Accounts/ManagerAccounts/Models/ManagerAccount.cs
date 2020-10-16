using FluentNHibernate.Mapping;

namespace FleetManagement.Entities.Accounts.ManagerAccounts.Models
{
    public class ManagerAccount : EntityBase
    {
        public virtual int UserAccountId { get; set; }
    }

    public class ManagerAccountMap : ClassMap<ManagerAccount>
    {
        public ManagerAccountMap()
        {
            Id(x => x.Id);
            Map(x => x.UserAccountId)
                .Not.Nullable();
        }
    }
}

﻿using FluentNHibernate.Mapping;

namespace FleetManagement.Entities.ManagerAccounts.Models
{
    public class ManagerAccount
    {
        public virtual int Id { get; set; }
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

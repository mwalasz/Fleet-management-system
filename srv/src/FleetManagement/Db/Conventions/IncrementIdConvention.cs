using FluentNHibernate.Conventions;
using FluentNHibernate.Conventions.Instances;

namespace FleetManagement.Db.Conventions
{
    public class IncrementIdConvention : IIdConvention
    {
        public void Apply(IIdentityInstance instance)
        {
            instance.GeneratedBy.Increment();
        }
    }
}

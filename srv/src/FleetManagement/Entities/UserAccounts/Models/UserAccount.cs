using FluentNHibernate.Mapping;

namespace FleetManagement.Entities.UserAccounts.Models
{
    public class UserAccount
    {
        public virtual int Id { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual string Email { get; set; }
        public virtual string PhoneNumber { get; set; }
        public virtual string PasswordHash { get; set; }
        public virtual string Role { get; set; }
    }

    public class UserAccountMap : ClassMap<UserAccount>
    {
        public UserAccountMap()
        {
            Id(x => x.Id);
            Map(x => x.FirstName);
            Map(x => x.LastName);
            Map(x => x.Email)
                .Not.Nullable();
            Map(x => x.PhoneNumber)
                .Not.Nullable();
            Map(x => x.PasswordHash)
                .Not.Nullable();
            Map(x => x.Role)
                .Not.Nullable();
        }
    }
}

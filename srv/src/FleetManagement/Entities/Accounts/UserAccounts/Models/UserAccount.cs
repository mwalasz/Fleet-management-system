﻿using FleetManagement.Extensions;
using FluentNHibernate.Mapping;

namespace FleetManagement.Entities.Accounts.UserAccounts.Models
{
    public class UserAccount : EntityBase
    {
        /// <summary>
        /// Określa aktywność użytkownika - widoczność dla użytkownika.
        /// </summary>
        public virtual bool IsActive { get; set; }

        /// <summary>
        /// Imię.
        /// </summary>
        public virtual string FirstName 
        { 
            get => firstName; 
            set => firstName = value.FirstLetterToUpper();
        }

        /// <summary>
        /// Nazwisko.
        /// </summary>
        public virtual string LastName
        {
            get => lastName; 
            set => lastName = value.FirstLetterToUpper();
        }

        /// <summary>
        /// Mail.
        /// </summary>
        public virtual string Email { get; set; }

        /// <summary>
        /// Numer telefonu.
        /// </summary>
        public virtual string PhoneNumber { get; set; }

        /// <summary>
        /// Hash hasła.
        /// </summary>
        public virtual string PasswordHash { get; set; }

        /// <summary>
        /// Rola użytkownika.
        /// </summary>
        public virtual string Role { get; set; }
        
        /// <summary>
        /// Wewnętrzna ścieżka do pliku z avatarem użytkownika.
        /// </summary>
        public virtual string AvatarImagePath { get; set; }

        private string firstName;
        private string lastName;
    }

    public class UserAccountMap : ClassMap<UserAccount>
    {
        public UserAccountMap()
        {
            Id(x => x.Id);
            Map(x => x.IsActive)
                .Not.Nullable();
            Map(x => x.FirstName);
            Map(x => x.LastName);
            Map(x => x.Email)
                .Unique()
                .Not.Nullable();
            Map(x => x.PhoneNumber)
                .Not.Nullable();
            Map(x => x.PasswordHash)
                .Not.Nullable();
            Map(x => x.Role)
                .Not.Nullable();
            Map(x => x.AvatarImagePath);
        }
    }
}

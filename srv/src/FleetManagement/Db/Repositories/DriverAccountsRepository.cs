using FleetManagement.Authentication.Hashes;
using FleetManagement.Authentication.Policies;
using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Accounts.DriverAccounts.Params;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Accounts.UserAccounts.Models;
using FleetManagement.Entities.Companies;
using FleetManagement.Entities.Companies.Models;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Images;
using FleetManagement.Images.Params;
using NHibernate;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class DriverAccountsRepository : DbBasicOperations<DriverAccount>, IDriverAccountProvider
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly ICompanyProvider companyProvider;
        private readonly IImagesService imagesService;
        private readonly IHashService hashService;

        public DriverAccountsRepository(ISessionFactory sessionFactory,
            IUserAccountProvider userAccountProvider,
            ICompanyProvider companyProvider,
            IImagesService imagesService,
            IHashService hashService) : base(sessionFactory)
        {
            this.userAccountProvider = userAccountProvider;
            this.companyProvider = companyProvider;
            this.imagesService = imagesService;
            this.hashService = hashService;
        }

        public DriverAccount GetByMail(string mail)
        {
            var user = userAccountProvider.GetByMail(mail);

            if (user != null)
                return GetAll()
                    .FirstOrDefault(x => x.UserAccountId == user.Id) ?? null;
            else return null;
        }

        public int AddNewAndGetId(INewAccountParams newAccount)
        {
            var newAccountParams = (NewDriverAccountParams)newAccount;

            try
            {
                var avatarPath = imagesService.SaveUserNewImage(new UploadUserAvatarParams { ImageBase64 = newAccountParams.AvatarImageBase64 });

                userAccountProvider.Add(new UserAccount()
                {
                    Email = newAccountParams.Email,
                    PasswordHash = hashService.GenerateHash(newAccountParams.Password),
                    FirstName = newAccountParams.FirstName,
                    LastName = newAccountParams.LastName,
                    PhoneNumber = newAccountParams.PhoneNumber,
                    AvatarImagePath = avatarPath,
                    Role = Roles.Driver,
                    IsActive = true,
                });

                var newUser = userAccountProvider.GetByMail(newAccountParams.Email);

                if (newUser != null)
                {
                    Add(new DriverAccount()
                    {
                        DrivingLicenseNumber = newAccountParams.DrivingLicenseNumber,
                        UserAccountId = newUser.Id,
                    });

                    var driver = GetByMail(newAccountParams.Email);

                    return (newAccountParams != null) ? driver.Id : -1;
                }

                return -1;
            }
            catch (System.Exception)
            {
                return -1;
            }
        }

        public Company GetDriverCompany(string driverMail)
        {
            var driver = GetByMail(driverMail);

            if (driver != null)
            {
                var companies = companyProvider.GetAll();
            
                foreach (var company in companies)
                {
                    var drivers = company.Drivers;

                    if (drivers.Count != 0)
                    {
                        var isDriverWorking = drivers.Where(x => x.Id == driver.Id).ToList().Count;
            
                        if (isDriverWorking != 0)
                            return company;
                    }
                }
            }

            return null;
        }

        public List<DriverAccount> GetUnemployedDrivers()
        {
            var unemployedDrivers = GetAll();
            var companies = companyProvider.GetAll();
            
            foreach (var company in companies)
            {
                var drivers = company.Drivers;

                if (drivers.Count != 0)
                    unemployedDrivers = unemployedDrivers.Where(u => drivers.All(x => x.Id != u.Id));
            }

            return unemployedDrivers.ToList();
        }

        public List<DriverAccount> GetDriversFromMailList(IEnumerable<string> mails)
        {
            var drivers = new List<DriverAccount>();

            foreach (var driverMail in mails)
                drivers.Add(GetByMail(driverMail));

            return drivers;
        }

        public List<DriverAccount> RemoveVehiclesFromNewDrivers(List<DriverAccountBasicInfoDto> oldDrivers, List<DriverAccount> newDrivers)
        {
            var newOnes = newDrivers.Where(x => !oldDrivers.Any(e => e.Id == x.Id)).ToList();

            foreach (var driver in newOnes)
            {
                driver.Vehicles = new List<Vehicle>();
                Update(driver);
            }

            return newOnes;
        }
    }
}

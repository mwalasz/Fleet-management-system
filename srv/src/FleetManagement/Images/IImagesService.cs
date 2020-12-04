using FleetManagement.Entities.Accounts.UserAccounts.Models;

namespace FleetManagement.Images
{
    public interface IImagesService
    {
        string GetUserImage(UserAccount user);

        //string GetVehicleImage(Vehicle vehicle);
    }
}

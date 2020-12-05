using FleetManagement.Entities.Accounts.UserAccounts.Models;
using FleetManagement.Images.Params;

namespace FleetManagement.Images
{
    public interface IImagesService
    {
        string ReadUserImage(UserAccount user);
        string SaveUserNewImage(UploadUserAvatarParams uploadUserAvatar, UserAccount user = null);
    }
}

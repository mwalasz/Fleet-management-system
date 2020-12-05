using FleetManagement.Entities.Accounts.UserAccounts.Models;
using FleetManagement.Images.Params;

namespace FleetManagement.Images
{
    public interface IImagesService
    {
        string UploadUserImage(UserAccount user);
        bool DownloadUserImage(UploadUserAvatarParams uploadUserAvatar, UserAccount user);
    }
}

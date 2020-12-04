using FleetManagement.Entities.Accounts.UserAccounts.Models;
using FleetManagement.Extensions;
using System.IO;

namespace FleetManagement.Images
{
    public class ImagesService : IImagesService
    {
        public string GetUserImage(UserAccount user)
        {
            var imagePath = user.AvatarImagePath;

            if (!string.IsNullOrEmpty(imagePath))
            {
                var bytes = File.ReadAllBytes(imagePath);
                var imageFormat = ImageFormat.Get(imagePath);
                var image = bytes.ConvertToBase64(imageFormat);

                return image;
            }

            return string.Empty;
        }
    }
}

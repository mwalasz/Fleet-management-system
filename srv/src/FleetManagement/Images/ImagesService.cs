using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Accounts.UserAccounts.Models;
using FleetManagement.Extensions;
using FleetManagement.Images.Params;
using System;
using System.IO;
using System.Text.RegularExpressions;

namespace FleetManagement.Images
{
    public class ImagesService : IImagesService
    {
        private readonly IUserAccountProvider userAccountProvider;

        public ImagesService(IUserAccountProvider userAccountProvider)
        {
            this.userAccountProvider = userAccountProvider;
        }

        public string UploadUserImage(UserAccount user)
        {
            var imagePath = user.AvatarImagePath;

            if (!string.IsNullOrEmpty(imagePath))
            {
                var imageFormat = ImageFormat.Get(imagePath);

                string image;
                if (string.IsNullOrEmpty(imageFormat))
                {
                    image = File.ReadAllText(imagePath);
                    image = image.AddTypeOfImageInfo(ImageFormat.jpeg);
                }
                else
                {
                    var bytes = File.ReadAllBytes(imagePath);
                    image = bytes.ConvertToBase64(imageFormat);
                }

                return image;
            }

            return string.Empty;
        }

        public bool DownloadUserImage(UploadUserAvatarParams uploadUserAvatar, UserAccount user)
        {
            try
            {
                var filePath = CreateUniqueFilePath(true);
                
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                File.WriteAllText(filePath, uploadUserAvatar.ImageBase64);
                
                user.AvatarImagePath = filePath;
                userAccountProvider.Update(user);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private static string CreateUniqueFilePath(bool isUser)
        {
            var uniqueId = Regex.Replace(Convert.ToBase64String(Guid.NewGuid().ToByteArray()), "[/+=]", "");
            var fileName = $"{uniqueId}.txt";
            var mainDirectory = Path.Combine(Directory.GetParent(Environment.CurrentDirectory).Parent.FullName, "files");

            return Path.Combine(mainDirectory, isUser ? "users" : "vehicles", fileName);
        }
    }
}

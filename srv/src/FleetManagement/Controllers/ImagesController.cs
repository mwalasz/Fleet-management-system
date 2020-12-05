using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Images;
using FleetManagement.Images.Params;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    [AllowAnonymous]
    public class ImagesController : ControllerBase
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IImagesService imagesService;

        public ImagesController(IUserAccountProvider userAccountProvider, IImagesService imagesService)
        {
            this.userAccountProvider = userAccountProvider;
            this.imagesService = imagesService;
        }

        [HttpGet]
        public IActionResult Download(string mail)
        {
            var user = userAccountProvider.GetByMail(mail);

            if (user != null)
            {
                if (string.IsNullOrEmpty(user.AvatarImagePath))
                    return NotFound("Użytkownik nie posiada zdjęcia.");

                var image = imagesService.ReadUserImage(user);

                if (string.IsNullOrEmpty(image))
                    return BadRequest("Błąd podczas wysyłania zdjęcia.");

                return Ok(image);
            }

            return BadRequest("Brak użytkownika o podanym mailu!");
        }

        [HttpPost]
        public IActionResult Upload([FromBody] UploadUserAvatarParams avatarParams)
        {
            var user = userAccountProvider.GetByMail(avatarParams.Mail);

            if (user != null)
            {
                if (!string.IsNullOrEmpty(imagesService.SaveUserNewImage(avatarParams, user)))
                    return Ok();

                return BadRequest("Nie udało się dodać avataru do użytkownika");
            }

            return BadRequest("Brak użytkownika o podanym mailu!");
        }
    }
}

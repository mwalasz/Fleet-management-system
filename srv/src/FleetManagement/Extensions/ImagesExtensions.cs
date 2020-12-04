using System;

namespace FleetManagement.Extensions
{
    public static class ImagesExtensions
    {
        public static string ConvertToBase64(this byte[] image, string imageFormat)
        {
            try
            {
                var convertedImage = Convert.ToBase64String(image);
                return $"{imageFormat};base64,{convertedImage}";
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
    }
}

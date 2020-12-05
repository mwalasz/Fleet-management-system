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
                return convertedImage.AddTypeOfImageInfo(imageFormat);
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }

        public static string AddTypeOfImageInfo(this string base64Image, string imageFormat)
        {
            try
            {
                return $"{imageFormat};base64,{base64Image}";
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
    }
}

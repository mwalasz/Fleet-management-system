using System;
using System.IO;

namespace FleetManagement.Images
{
    public static class ImageFormat
    {
        public const string jpeg = "data:image/jpeg";
        public const string png = "data:image/png";
        public const string gif = "data:image/gif";

        public static string Get(string filePath)
        {
            try
            {
                var extension = Path.GetExtension(filePath);

                return extension switch
                {
                    ".jpg" => jpeg,
                    ".gif" => gif,
                    ".png" => png,
                    _ => string.Empty,
                };
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
    }
}

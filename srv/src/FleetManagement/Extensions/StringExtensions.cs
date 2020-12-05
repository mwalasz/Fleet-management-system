namespace FleetManagement.Extensions
{
    public static class StringExtensions
    {
        public static string FirstLetterToUpper(this string word)
        {
            var modified = word;
            return modified != null ? char.ToUpper(modified[0]) + modified.Substring(1) : "";
        }
    }
}

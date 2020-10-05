namespace FleetManagement.Authentication.Hashes
{
    public interface IHashService
    {
        /// <summary>
        /// Generuje hash podanego hasła.
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        string GenerateHash(string password);
        
        /// <summary>
        /// Porównuje hash z hasłem.
        /// </summary>
        /// <param name="password"></param>
        /// <param name="hash"></param>
        /// <returns></returns>
        bool CompareHashes(string password, string hash);
    }
}
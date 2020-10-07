namespace FleetManagement.ResponseWrapper
{
    /// <summary>
    /// Typy odpowiedzi na zapytania.
    /// </summary>
    public struct ResponseType
    {
        public enum User 
        { 
            SignedIn,
            SignedOut,
            NotFound,
            NotLogged,
        }

    }
}

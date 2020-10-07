using AutoWrapper.Wrappers;
using System;

namespace FleetManagement.ResponseWrapper
{
    public static class Responses
    {
        /// <summary>
        /// Definiuje odpowiedzi na zapytania dotyczące użytkowników.
        /// </summary>
        /// <param name="response">Typ odpowiedzi.</param>
        /// <returns></returns>
        public static ApiResponse AboutUserEvents(ResponseType.User response)
        {
            return response switch
            {
                ResponseType.User.SignedIn => new ApiResponse("Użytkownik pomyślnie zalogowany.", 200),
                ResponseType.User.SignedOut => new ApiResponse("Użytkownik pomyślnie wylogowany.", 200),
                ResponseType.User.NotFound => new ApiResponse("Użytkownik nie istnieje. Sprawdź poprawność danych logowania.", 200),
                ResponseType.User.NotLogged => new ApiResponse("Brak zalogowanego użytkownika.", 200),
                _ => throw new NotImplementedException(),
            };
        }
    }
}

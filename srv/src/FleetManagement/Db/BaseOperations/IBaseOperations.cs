namespace FleetManagement.Db.BaseOperations
{
    /// <summary>
    /// Definiuje podstawowe metody do obsługi zawartości bazy danych.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IBaseOperations<T> : IRepositoryBaseOperations<T>, IRepositoryBaseOperationsAsync<T>
    {
    }
}

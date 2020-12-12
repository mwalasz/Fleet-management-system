using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Brands.Models;

namespace FleetManagement.Entities.Brands
{
    public interface IBrandProvider : IBaseOperations<Brand>
    {
        /// <summary>
        /// Dodaje nową markę oraz model, jeśli nie istnieją
        /// </summary>
        /// <param name="name"></param>
        /// <returns>True, jeśli dodano nową. False, jeśli marka już istniała.</returns>
        public bool AddIfNotExists(string brand, string model);

        /// <summary>
        /// Zwraca markę po jej nazwie.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public Brand GetByName(string name);
    }
}

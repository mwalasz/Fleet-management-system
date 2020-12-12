using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.BrandModels.Models;

namespace FleetManagement.Entities.BrandModels
{
    public interface IBrandModelProvider : IBaseOperations<BrandModel>
    {
        /// <summary>
        /// Zwraca model po jego nazwie.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public BrandModel GetByName(string name);
    }
}

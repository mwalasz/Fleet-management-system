using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Trips.Params.NewTrip;

namespace FleetManagement.Entities.Trips
{
    public interface ITripProvider : IBaseOperations<Trip>
    {
        /// <summary>
        /// Dodaje nową trasę i zwraca, czy operacja się powiodła, czy nie.
        /// </summary>
        /// <param name="newTripParams"></param>
        /// <returns></returns>
        public bool AddNew(NewTripParams newTripParams);
    }
}

using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.DriveTypes;
using FleetManagement.Entities.EngineTypes;
using FleetManagement.Entities.Powertrains;
using FleetManagement.Entities.Powertrains.Models;
using FleetManagement.Entities.Vehicles.Params;
using NHibernate;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class PowertrainsRepository : DbBasicOperations<Powertrain>, IPowertrainProvider
    {
        private readonly ISessionFactory sessionFactory;
        private readonly IEngineTypeProvider engineTypeProvider;
        private readonly IDriveTypeProvider driveTypeProvider;

        public PowertrainsRepository(ISessionFactory sessionFactory, IEngineTypeProvider engineTypeProvider,
            IDriveTypeProvider driveTypeProvider) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
            this.engineTypeProvider = engineTypeProvider;
            this.driveTypeProvider = driveTypeProvider;
        }

        public Powertrain CreateNewAndGet(NewVehicleParams newVehicle)
        {
            try
            {
                var drive = driveTypeProvider.GetAll()
                    .FirstOrDefault(x => x.Name.Equals(newVehicle.DriveType));

                var engine = engineTypeProvider.GetAll()
                    .FirstOrDefault(x => x.Name.Equals(newVehicle.EngineType));

                if (drive == null || engine == null)
                    return null;

                Add(new Powertrain() 
                {
                    EngineCapacity = newVehicle.EngineCapacity,
                    Horsepower = newVehicle.Horsepower,
                    Torque = newVehicle.Torque,
                    NumberOfCylinders = newVehicle.CylinderNumber,
                    DriveType = drive,
                    EngineType = engine,
                });

                return GetAll()
                    .Where(x => x.EngineType.Id == engine.Id)
                    .Where(x => x.DriveType.Id == drive.Id)
                    .FirstOrDefault(
                        x => x.EngineCapacity == newVehicle.EngineCapacity &&
                            x.Horsepower == newVehicle.Horsepower &&
                            x.NumberOfCylinders == newVehicle.CylinderNumber &&
                            x.Torque == newVehicle.Torque);
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }
    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Models;
using VegaStarter.Persistence.Interfaces;

namespace VegaStarter.Persistence.Repositories
{
    public class VehicleRepository:IVehicleRepository
    {

        #region Fields
        private readonly VegaDbContext dbContext;
        #endregion

        #region Constructor
        public VehicleRepository(VegaDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void Add(Vehicle vehicle)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Methods
        public async Task<Vehicle> GetVehicle(int id,bool includeRelated=true)
        {
            if (includeRelated!=false)
             return  await dbContext.Vehicles.FindAsync(id);

            return await dbContext.Vehicles
               .Include(v => v.Model)
               .ThenInclude(m => m.Make)
               .Include(v => v.VehicleFeatures)
               .ThenInclude(vf => vf.Feature)
               .SingleOrDefaultAsync(v => v.Id == id).ConfigureAwait(false);
        }

        public void Remove(Vehicle vehicle)
        {
            dbContext.Remove<Vehicle>(vehicle);
        }

      
        #endregion
    }
}

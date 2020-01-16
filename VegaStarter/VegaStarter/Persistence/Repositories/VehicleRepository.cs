using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using VegaStarter.Core.Interfaces;
using VegaStarter.Core.Models;
using VegaStarter.Models;


namespace VegaStarter.Persistence.Repositories
{
    public class VehicleRepository : IVehicleRepository
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
            dbContext.Add(vehicle);
        }
        #endregion

        #region Methods
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await dbContext.Vehicles.FindAsync(id);

            return await dbContext.Vehicles
               .Include(v => v.Model)
               .ThenInclude(m => m.Make)
               .Include(v => v.VehicleFeatures)
               .ThenInclude(vf => vf.Feature)
               .SingleOrDefaultAsync(v => v.Id == id).ConfigureAwait(false);
        }

        public async Task<List<Vehicle>> GetVehicles(VehicleQuery vehicleQueryObj)
        {
            var query = dbContext.Vehicles
                 .Include(v => v.Model)
                 .ThenInclude(m => m.Make)
                 .Include(v => v.VehicleFeatures)
                 .ThenInclude(vf => vf.Feature).AsQueryable();

            if (vehicleQueryObj.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == vehicleQueryObj.MakeId.Value);
            if (vehicleQueryObj.ModelId.HasValue)
                query = query.Where(v => v.ModelId == vehicleQueryObj.ModelId.Value);

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName,
                ["id"] = v => v.Id
            };

            query = ApplyQueryOrdering(query, vehicleQueryObj, columnsMap);
            return await query.ToListAsync().ConfigureAwait(false);
        }

        public IQueryable<Vehicle> ApplyQueryOrdering(IQueryable<Vehicle> query, VehicleQuery vehicleQueryObj, Dictionary<string, Expression<Func<Vehicle, object>>> columnsMap)
        {
            return query = vehicleQueryObj.IsSortAscending ? query.OrderBy(columnsMap[vehicleQueryObj.SortBy]) : query.OrderByDescending(columnsMap[vehicleQueryObj.SortBy]);
        }

        public void Remove(Vehicle vehicle)
        {
            dbContext.Remove<Vehicle>(vehicle);
        }
        #endregion
    }
}

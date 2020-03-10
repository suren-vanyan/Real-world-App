using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Core.Interfaces;
using VegaStarter.Core.Models;

namespace VegaStarter.Persistence.Repositories
{
    public class PhotoRepository : IPhotoRepository
    {
        #region Field
        private readonly VegaDbContext context;
        #endregion

        #region Constructor
        public PhotoRepository(VegaDbContext context)
        {
            this.context = context;
        }
        #endregion

        #region Methods
        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            return await context.Photos.Where(p => p.VehicleId == vehicleId).ToListAsync();
          
        }
        #endregion
    }
}

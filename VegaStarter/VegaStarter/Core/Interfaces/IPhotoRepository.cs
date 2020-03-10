using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Core.Models;

namespace VegaStarter.Core.Interfaces
{
    public interface IPhotoRepository
    {
        public Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}

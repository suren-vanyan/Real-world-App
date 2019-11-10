using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VegaStarter.Models;
using VegaStarter.Models.Resources;
using VegaStarter.Persistence;

namespace VegaStarter.Controllers
{
    public class FeaturesController : BaseController
    {
        #region Fileds      
        private readonly IMapper mapper;
        private readonly VegaDbContext context;
        #endregion

        #region Constructor
        public FeaturesController(IMapper mapper, VegaDbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        #endregion

        #region Actions
        /// <summary>
        /// get all features
        /// </summary>
        /// <returns>IEnumerable<FeatureResource></returns>
        [HttpGet("all-features")]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
        {
            var features = await context.Features.ToListAsync().ConfigureAwait(false);
            var featureResource = mapper.Map<List<Feature>, List<KeyValuePairResource>>(features);
            return featureResource;
        }
        #endregion


    }
}
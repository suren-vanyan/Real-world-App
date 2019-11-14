using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VegaStarter.Controllers.Resources;
using VegaStarter.Models;
using VegaStarter.Persistence;

namespace VegaStarter.Controllers
{
    public class MakesController : BaseController
    {

        #region Fields
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        #endregion

        #region Constructor
        public MakesController(VegaDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        #endregion

        #region Actions

        /// <summary>
        /// get all makes
        /// </summary>
        /// <returns>IEnumerable<MakeResource></returns>
        [HttpGet("all-makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var makes = await context.Makes.Include(m => m.Models).ToListAsync().ConfigureAwait(false);
            var makeResoureces = mapper.Map<List<Make>, List<MakeResource>>(makes);

            return makeResoureces;
        }
        #endregion


    }
}
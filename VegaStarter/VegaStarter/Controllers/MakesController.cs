using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VegaStarter.Models;
using VegaStarter.Persistence;

namespace VegaStarter.Controllers
{   
    public class MakesController : BaseController
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;

        public MakesController(VegaDbContext context,IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }


        [HttpGet("all-makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
           var makes= await context.Makes.Include(m => m.Models).ToListAsync().ConfigureAwait(false);
            return mapper.Map<List<Make>,List<MakeResource>>(makes);
        }
    }
}
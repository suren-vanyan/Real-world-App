using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using VegaStarter.Models;
using VegaStarter.Models.Resources;
using VegaStarter.Persistence;

namespace VegaStarter.Controllers
{
    [Route("api/[controller]")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly VegaDbContext dbContext;

        public VehiclesController( IMapper mapper,VegaDbContext dbContext)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }
        [HttpPost("create")]
        public IActionResult CreateVehicle([FromBody]VehicleResource vehicle)
        {
            return Ok(vehicle);
        } 
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using VegaStarter.Models;
using VegaStarter.Models.Resources;
using VegaStarter.Persistence;
using VegaStarter.Persistence.Interfaces;

namespace VegaStarter.Controllers
{
    public class VehiclesController : BaseController
    {

        #region Fields
        private readonly IMapper mapper;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IUnitOfWork unitOfWork;
        #endregion

        #region Constructor
        public VehiclesController(IMapper mapper,IVehicleRepository vehicleRepository,
            IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.vehicleRepository = vehicleRepository;
            this.unitOfWork = unitOfWork;
        }
        #endregion



        #region Actions
        /// <summary>
        /// get vehicle by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            SqlParameter sqlParameter = new SqlParameter("id", id);
            //var vehicle=  dbContext.Vehicles.FromSqlRaw<Vehicle>(@"SELECT * FROM (SELECT * FROM [Vehicles] WHERE [Vehicles].id=@id and @id IS NOT NULL) as [v] " +
            //      @"LEFT JOIN VehicleFeatures as [vf] ON [vf].VehicleId=[v].id ORDER BY [v].[Id], [vf].[FeatureId], [vf].[VehicleId]", sqlParameter);

            var vehicle =await vehicleRepository.GetVehicle(id).ConfigureAwait(false);

            if (vehicle == null)
                return new NotFoundObjectResult(id);

            var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }

        /// <summary>
        /// Create new vehicle
        /// </summary>
        /// <param name="vehicleResource"></param>
        /// <returns>VehicleResource</returns>
        [HttpPost("create")]
        public async Task<IActionResult> CreateVehicle([FromBody]SaveVehicleResource vehicleResource)
        {

            var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

              vehicleRepository.Add(vehicle);
           await unitOfWork.CompleteAsync().ConfigureAwait(false);

            vehicle =await vehicleRepository.GetVehicle(vehicle.Id).ConfigureAwait(false);

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

        /// <summary>
        /// Update Vehicle
        /// </summary>
        /// <param name="id"></param>
        /// <param name="vehicleResource"></param>
        /// <returns>VehicleResource</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody]SaveVehicleResource vehicleInputModel)
        {
            //Find Vehicle
            var vehicle = await vehicleRepository.GetVehicle(id).ConfigureAwait(false);

            if (vehicle == null)
                return new NotFoundObjectResult(vehicleInputModel);

            mapper.Map(vehicleInputModel, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            await unitOfWork.CompleteAsync().ConfigureAwait(false);
            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

        /// <summary>
        /// remowe vehicle
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await vehicleRepository.GetVehicle(id, false).ConfigureAwait(false);

            if (vehicle == null)
                return new NotFoundObjectResult(id);

            vehicleRepository.Remove(vehicle);
            await unitOfWork.CompleteAsync().ConfigureAwait(false);

            return Ok(id);
        }

        #endregion
    }
}
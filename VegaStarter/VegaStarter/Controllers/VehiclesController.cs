using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using VegaStarter.Controllers.Resources;
using VegaStarter.Core.Interfaces;
using VegaStarter.Core.Models;
using VegaStarter.Models;


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
        public VehiclesController(IMapper mapper, IVehicleRepository vehicleRepository,
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
            var vehicle = await vehicleRepository.GetVehicle(id).ConfigureAwait(false);

            if (vehicle == null)
                return new NotFoundObjectResult(string.Concat("Vehicle with id:", id, " is not found"));

            var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }

        /// <summary>
        /// get vehicle by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetVehicles([FromQuery]VehicleQueryResource filterResource)
        {

         var filter=   mapper.Map<VehicleQueryResource, VehicleQuery>(filterResource);

            var queryResult = await vehicleRepository.GetVehicles(filter).ConfigureAwait(false);
            var queryResultResources = mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult);
            return Ok(queryResultResources);
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

            vehicle = await vehicleRepository.GetVehicle(vehicle.Id).ConfigureAwait(false);

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
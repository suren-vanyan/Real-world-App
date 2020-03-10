using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Controllers.Resources;
using VegaStarter.Core.Interfaces;
using VegaStarter.Core.Models;

namespace VegaStarter.Controllers
{
    [Route("api/vehicles/{vehicleId}/photos")]
    public class PhotosController : BaseController
    {
        private readonly IWebHostEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IPhotoRepository photoRepository;
        private readonly PhotoSettings photoSettings;

        public PhotosController(IWebHostEnvironment host, IVehicleRepository repository,
            IUnitOfWork unitOfWork, IMapper mapper,IOptionsSnapshot<PhotoSettings> options,
            IPhotoRepository photoRepository)
        {

            this.host = host;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.photoRepository = photoRepository;
            this.photoSettings = options.Value;
        }
        [HttpPost]
        [RequestSizeLimit(209715200)]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false).ConfigureAwait(false);
            if (vehicle == null)
                return NotFound();

            if (file is null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file size exceeded");
            if (!photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type");

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream).ConfigureAwait(false);
            }

            var photo = new Photo { FileName = fileName };

            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));

        }

        [HttpGet]
        public async Task<IActionResult> GetPhotos(int vehicleId)
        {
            var photos =await photoRepository.GetPhotos(vehicleId).ConfigureAwait(false);
            var photoResources = mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
            return Ok(photoResources);
        }
    }
}

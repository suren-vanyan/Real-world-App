using Microsoft.EntityFrameworkCore;
using VegaStarter.Core.Models;
using VegaStarter.Models;
using VegaStarter.Persistence.EntityConfiguratons;

namespace VegaStarter.Persistence
{
    public class VegaDbContext : DbContext
    {
        public VegaDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }

        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration<Feature>(new FeatureConfig());
            modelBuilder.ApplyConfiguration<VehicleFeature>(new VehicleFeatureConfig());
        }
    }
}
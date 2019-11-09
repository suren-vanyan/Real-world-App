using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Models;

namespace VegaStarter.Persistence.EntityConfiguratons
{
    public class VehicleFeatureConfig : IEntityTypeConfiguration<VehicleFeature>
    {
        public void Configure(EntityTypeBuilder<VehicleFeature> builder)
        {
            builder.HasKey(v => new { v.FeatureId, v.VehicleId });
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Models;

namespace VegaStarter.Persistence.EntityConfiguratons
{
    public class FeatureConfig : IEntityTypeConfiguration<Feature>
    {
        public void Configure(EntityTypeBuilder<Feature> builder)
        {
            builder.HasKey(f => f.Id);
            builder.HasData(new Feature[] { new Feature {Id=1, Name = "Feature1" }, new Feature {Id=2, Name = "Feature2" },
            new Feature {Id=3, Name = "Feature3" }});
        }
    }
}

using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace VegaStarter.Persistence
{
    public static class MigrationManager
    {
        public static IApplicationBuilder MigratDatabase(this IApplicationBuilder applicationBuilder)
        {
            using (var scope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<VegaDbContext>();
                try
                {
                    context.Database.Migrate();
                }
                catch (Exception)
                {

                    throw;
                }
            }

            return applicationBuilder;
        }
    }
}

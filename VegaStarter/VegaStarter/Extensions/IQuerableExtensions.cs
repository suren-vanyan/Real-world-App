using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using VegaStarter.Core.Models;
using VegaStarter.Models;

namespace VegaStarter.Extensions
{
    public static class IQuerableExtensions
    {
        public static IQueryable<T> ApplyQueryOrdering<T>(this IQueryable<T> query, VehicleQuery vehicleQueryObj, Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(vehicleQueryObj.SortBy) || !columnsMap.ContainsKey(vehicleQueryObj.SortBy))
                    return query;
                if (vehicleQueryObj.IsSortAscending)
                    return query.OrderBy(columnsMap[vehicleQueryObj.SortBy]);
                else
                    return query.OrderByDescending(columnsMap[vehicleQueryObj.SortBy]);
            }
            catch (Exception e)
            {

                throw;
            }
           
        }
    }
}

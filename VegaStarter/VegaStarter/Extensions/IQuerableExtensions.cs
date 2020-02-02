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
            
                if (string.IsNullOrWhiteSpace(vehicleQueryObj.SortBy) || !columnsMap.ContainsKey(vehicleQueryObj.SortBy))
                    return query;
                if (vehicleQueryObj.IsSortAscending)
                    return query.OrderBy(columnsMap[vehicleQueryObj.SortBy]);
                else
                    return query.OrderByDescending(columnsMap[vehicleQueryObj.SortBy]);
                   
        }

        public static IQueryable<T> ApplyQueryPaging<T>(this IQueryable<T> query,IQueryObject queryObject)
        {
            if (queryObject.Page <= 0)
                queryObject.Page = 1;
            if (queryObject.PageSize <= 0)
                queryObject.PageSize = 10;

            return query.Skip<T>((queryObject.Page - 1) * queryObject.PageSize).Take<T>(queryObject.PageSize);
        }
    }
}

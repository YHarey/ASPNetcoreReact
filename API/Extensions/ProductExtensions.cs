using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    //we do not want to create a new instance, so we use static
    public static class ProductExtensions
    {
        public static IQueryable<Product> SortProduct(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);
            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                //this is default
                _ => query.OrderBy(p => p.Name)
            };
            return query;
        }

        public static IQueryable<Product> SearchProduct(this IQueryable<Product> query , string searchTxt)
        {
            if (string.IsNullOrWhiteSpace(searchTxt)) return query;
            var lowerCaseSearchTxt = searchTxt.Trim().ToLower();
            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTxt));
        }

        public static IQueryable<Product> FilterProduct(this IQueryable<Product> query, 
            string prodbrands, string prodTypes)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();
            if (!string.IsNullOrEmpty(prodbrands))
                brandList.AddRange(prodbrands.ToLower().Split(",").ToList());
            if (!string.IsNullOrEmpty(prodTypes))
                typeList.AddRange(prodTypes.ToLower().Split(",").ToList());   
            
            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.ProductType.ToLower()));
            return query;
        }
        
    }

}
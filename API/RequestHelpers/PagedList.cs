using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{
    //here we are using T for generic type, so that we can use this for Product or Orders
    public class PagedList<T> : List<T>
    {
       public PagedList(List<T> items, int count, int PageNumber, int pageSize)
       {
           MetaData = new PaginationMetaData
           {
               TotalItemCnt = count,
               PageSize = pageSize,
               CurrentPage = PageNumber,
               TotalPages = (int)Math.Ceiling(count / (double)pageSize)
           };
           AddRange(items);
       }
        public PaginationMetaData MetaData {get; set;}

        //Static method to get pagedList
        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query,
            int pageNumber, int pageSize)
        {
            var count = await query.CountAsync();
            //if pageNumber is 2 and pageSize is 10, we skip 1*10 and show 8 if total cnt is 8
            var items = await query.Skip((pageNumber-1)*pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}
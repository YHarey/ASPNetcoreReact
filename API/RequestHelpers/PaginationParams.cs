using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber {get; set;} = 1;
        //default page size
        private int _pageSize = 6;
        public int PageSize 
        {
            get => _pageSize;
            //_pageSize value is > MaxPageSize set to MaxPageSize, if not set to _pageSize value
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }


    }
}
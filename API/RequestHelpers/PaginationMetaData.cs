using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class PaginationMetaData
    {
        public int CurrentPage {get; set;}
        public int TotalPages {get; set;}
        public int PageSize {get; set;}
        public int TotalItemCnt {get; set;}

    }
}
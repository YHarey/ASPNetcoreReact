using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    //: PaginationParams this means we are deriving PaginationParams class here, 
    //so that all the properties in PaginationParams are available here
    public class ProductParams : PaginationParams
    {
        public string orderBy { get; set; }
        public string searchTxt { get; set; }
        public string prodBrands { get; set; }
        public string prodTypes { get; set; }
    }
}
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.RequestHelpers;
using System.Text.Json;

namespace API.Controllers
{
    public class ProductsController : BaseAPIController
    {
        private readonly StoreContext _context;

        //to create constructor type ctor and enter
        public ProductsController(StoreContext context)
        {
            this._context = context;
        }

        //End Point
        [HttpGet]
        //FromQuery means to look for queryString
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams prodParams)
        {
            var query = _context.Products
            .SortProduct(prodParams.orderBy)
            .SearchProduct(prodParams.searchTxt)
            .FilterProduct(prodParams.prodBrands, prodParams.prodTypes)
            .AsQueryable();
            
            var products = await PagedList<Product>.ToPagedList(query, 
                prodParams.PageNumber,prodParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        //End Point
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }

        //to get Unique ProdTypes and Brands, filters is the route parameter
        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var prodBrands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var prodTypes = await _context.Products.Select(p => p.ProductType).Distinct().ToListAsync();
            return Ok(new {prodBrands, prodTypes});
        }
       
    }
}
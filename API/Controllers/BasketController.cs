using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseAPIController
    {
        private readonly StoreContext _context;
        //constructor
        public BasketController(StoreContext context)
        {
            _context = context;
        }
        //GetBasket is route name
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            var basket = await RetreiveBasket();

            if (basket == null) return NotFound();
            return MapBasketToDTO(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId,int quantity)
        {
            //here we need to
            //get basket, create basket(if not exists), get product, add item, save changes
            var basket = await RetreiveBasket();
            if (basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            // add item
            basket.AddItem(product, quantity);
             var result = await _context.SaveChangesAsync() > 0;
             //if result > 0, GetBasket is route specified above
             if (result) return CreatedAtRoute("GetBasket", MapBasketToDTO(basket));
            //if result = 0 means not updated
             return BadRequest(new ProblemDetails{Title = "Proble Saving item to Basket"});
        }


        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productID,int quantity)
        {
            //here we need to
            //get basket, remove item or reduce qty, save changes
            var basket = await RetreiveBasket();

            if (basket == null) return NotFound();

            //we have thos removeItem method in basket Entity
            basket.RemoveItem(productID, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem Removing Item from Basket"});
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires= DateTime.Now.AddDays(3)};
            Response.Cookies.Append("buyerId",buyerId, cookieOptions);
            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }
        private async Task<Basket> RetreiveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

         private BasketDTO MapBasketToDTO(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    productId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    ProductType = item.Product.ProductType,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

    }
}
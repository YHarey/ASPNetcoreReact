using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseAPIController
    {
        //not-found is the route
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails{Title="Error: Bad Request"} );
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }

         [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Error 1:", "This is First Error");
            ModelState.AddModelError("Error 2:", "This is Second Error");
            return ValidationProblem();
        }

         [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("Error: Server Error");
        }

    }
}
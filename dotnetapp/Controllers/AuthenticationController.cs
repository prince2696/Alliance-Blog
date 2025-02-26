using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.Extensions.Logging;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthenticationController : ControllerBase
    {
          private readonly IAuthService _authService;

          private readonly ILogger<AuthenticationController> _logger;

           // Constructor to initialize the auth service and Logger
            public AuthenticationController(IAuthService authService,ILogger<AuthenticationController> logger)
        {
            _authService = authService;
            _logger=logger;
        }
       
        //login action method
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {    
            try{
                if (!ModelState.IsValid)
                return BadRequest(ModelState);
 
            var result = await _authService.Login(model);
            if (result.Item1 == 0)
                return BadRequest(new { message = result.Item2 });
 
            return Ok(new { Status="Success",token = result.Item2 });
            }
            catch(Exception exception){
                _logger.LogError(exception, "An error occurred while logging in.");
                return StatusCode(500, new {Message = $"Internal server error: {exception.Message}"});
            }
        }
         
         //register action method
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
           try{
             if (!ModelState.IsValid)
                return BadRequest(ModelState);
 
            var result = await _authService.Registration(model, model.UserRole);
            if (result.Item1 == 0)
                return BadRequest(new { message = result.Item2 });
 
            return Ok(new { message = result.Item2 });
           }
          catch(Exception exception){
                _logger.LogError(exception, "An error occurred while registering.");
                return StatusCode(500,new {Message = $"Internal server error: {exception.Message}"});
            }
        }
    }
}

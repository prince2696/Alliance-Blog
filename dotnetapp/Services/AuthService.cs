using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using dotnetapp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        private readonly ApplicationDbContext _context;
        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return (0, "User already exists");

            ApplicationUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                Name = model.Username.Length > 30 ? model.Username.Substring(0, 30) : model.Username,
                PhoneNumber = model.MobileNumber
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return (0, "User creation failed");

            if (!await _roleManager.RoleExistsAsync(role))
                await _roleManager.CreateAsync(new IdentityRole(role));

            var newUser = new User
            {
                Email = model.Email,
                Password = model.Password,
                Username = model.Username,
                MobileNumber = model.MobileNumber,
                UserRole = role
            };
            Console.WriteLine(newUser);
           
               await _context.Users.AddAsync(newUser);
               await _context.SaveChangesAsync();

             await _userManager.AddToRoleAsync(user, role);

            return (1, "User created successfully!");
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return (0, "Invalid email");

            if (!await _userManager.CheckPasswordAsync(user, model.Password))
                return (0, "Invalid password");

            var customUser = _context.Users.FirstOrDefault(u => u.Email == model.Email);
 

            var authClaims = new List<Claim>
            {
                new(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("MobileNumber", user.PhoneNumber),
                new Claim(ClaimTypes.NameIdentifier, customUser != null ? customUser.UserId.ToString() : string.Empty),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var token = GenerateToken(authClaims);
            return (1, token);
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            
            Console.WriteLine("key" + _configuration["JWT:Key"] + "generated");
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            Console.WriteLine("key" + _configuration["JWT:Key"] + "generated");

            Console.WriteLine("Issuer" + _configuration["JWT:ValidIssuer"]);
            Console.WriteLine("Audience" + _configuration["JWT:ValidAudience"]);


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:ValidIssuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

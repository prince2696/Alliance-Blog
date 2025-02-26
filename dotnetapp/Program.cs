using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Buffers;
using dotnetapp.Services;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(opt =>
       {
           opt.JsonSerializerOptions.PropertyNamingPolicy = null;
       });
;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c=>
{
    c.SwaggerDoc("v1",new OpenApiInfo {Title="My API",Version="v1"});
 
    //Define the BearerAuth scheme
    c.AddSecurityDefinition("Bearer",new OpenApiSecurityScheme{
        Description="JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name="Authorization",
        In=ParameterLocation.Header,
        Type=SecuritySchemeType.Http,
        Scheme="bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement{
        {
            new OpenApiSecurityScheme
            {
                Reference=new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new List<string>()
        }
    });
});




// DbContext configuration
builder.Services.AddDbContext<ApplicationDbContext>
(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString")));

//DbServices Registration

builder.Services.AddScoped<AnnouncementService>();
builder.Services.AddScoped<BlogPostService>();
builder.Services.AddScoped<FeedbackService>();


// Identity services configuration
builder.Services.AddIdentity<ApplicationUser,IdentityRole>()
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

builder.Services.AddScoped<IAuthService,AuthService>();

builder.Services.AddCors(opttions =>
{
    opttions.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
    };
});
 
builder.Logging.AddLog4Net();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

using Microsoft.EntityFrameworkCore;
using UserMasterAPI.DataContract;
using UserMasterAPI.DataModels;
using UserMasterAPI.DataRepository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<UserMasterDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("UserMasterConnection")));
builder.Services.AddScoped<IUserMasterService, UserMasterRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
options.WithOrigins("*")
.AllowAnyMethod()
.AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

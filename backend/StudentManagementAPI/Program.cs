using StudentManagementAPI.Data;
using StudentManagementAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register Dapper Context
builder.Services.AddSingleton<DapperContext>();

// Register Repositories
builder.Services.AddScoped<IStudentRepository, StudentRepository>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJS", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowNextJS");

app.UseAuthorization();

app.MapControllers();

app.Run();

using ContactManaging.Core.Data;
using ContactManaging.Core.Handlers.CommandHandlers;
using ContactManaging.Core.Handlers.QueryHandlers;
using ContactManaging.Core.Interfaces.CommandHandlers;
using ContactManaging.Core.Interfaces.QueryHandlers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ContactsDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ContactsContext"));
});

builder.Services.AddScoped<ISaveContactCommandHander, SaveContactCommandHandler>();
builder.Services.AddScoped<IGetAllContactsQueryHandler, GetAllContactsQueryHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<ContactsDbContext>();
    context.Database.EnsureCreated();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

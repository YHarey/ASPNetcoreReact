using System;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //this was the code before so commented
            //CreateHostBuilder(args).Build().Run();
            var host = CreateHostBuilder(args).Build();
            //with using , this will auotmatically dispose any resources that are not in scope
            // instead of finally block
            using var scope = host.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
            //this is for logging any error in this Program class in terminal
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try
            {
                //this will create the database
                //context.Database.Migrate();
                //this will seed products in DBInitializer class
                //DbInitializer.Initialize(context);
               
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Problem Migrating Data");
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

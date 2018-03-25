using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClienteRestAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ClienteRestAPI
{
    public class ClienteContext : DbContext
    {
        public ClienteContext(DbContextOptions<ClienteContext> options)
            : base(options)
        {
        }

        public DbSet<Cliente> Clientes { get; set; }
    }
}

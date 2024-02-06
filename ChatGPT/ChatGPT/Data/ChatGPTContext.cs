using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ChatGPT.Models;

namespace ChatGPT.Data
{
    public class ChatGPTContext : DbContext
    {
        public ChatGPTContext (DbContextOptions<ChatGPTContext> options)
            : base(options)
        {
        }

        public DbSet<ChatGPT.Models.User> User { get; set; } = default!;
    }
}

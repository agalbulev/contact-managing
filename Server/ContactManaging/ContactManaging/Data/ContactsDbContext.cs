using Microsoft.EntityFrameworkCore;

namespace ContactManaging.Data
{
    public class ContactsDbContext : DbContext
    {
        public ContactsDbContext(DbContextOptions<ContactsDbContext> options) : base(options)
        { 
        
        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>(build => {
                build.HasKey(p => p.Id);
            });
        }
    }
}

using Microsoft.EntityFrameworkCore;

namespace ContactManaging.Core.Data
{
    public class ContactsDbContext : DbContext
    {
        public ContactsDbContext(DbContextOptions<ContactsDbContext> options) : base(options)
        {

        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>(build =>
            {
                build.HasKey(p => p.Id);

                build.Property(p => p.Id)
                    .ValueGeneratedOnAdd();

                build.Property(p => p.FirstName)
                    .IsRequired();

                build.Property(p => p.Surname)
                    .IsRequired();

                build.Property(p => p.DateOfBirth)
                    .IsRequired();

                build.Property(p => p.Address)
                    .HasMaxLength(200);
            });
        }
    }
}

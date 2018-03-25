using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ScheduleReact.Database {
    public class ScheduleDbContext : IdentityDbContext<User> {
        public ScheduleDbContext (DbContextOptions<ScheduleDbContext> options) : base (options) { }
        public DbSet<Lecturer> Lecturers { get; set; }
        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<Flow> Flows { get; set; }
        //public DbSet<Class> Class { get; set; }
        //public DbSet<AcademicHour> AcademicHour { get; set; }
        //public DbSet<Flow> Flow { get; set; }
        //public DbSet<Group> Group { get; set; }
        //public DbSet<Faculty> Faculty { get; set; }
        //public DbSet<GroupClass> GroupClass { get; set; }

        protected override void OnModelCreating (ModelBuilder builder) {
            base.OnModelCreating (builder);
            builder.Entity<Lecturer> ().HasIndex (l => new { l.FirstName, l.LastName, l.SecondName }).IsUnique (true);
            builder.Entity<Flow> ().HasIndex (l => new { l.Year, l.Name }).IsUnique (true);
            builder.Entity<Faculty> ().HasOne (f => f.Dean).WithOne ().OnDelete (DeleteBehavior.SetNull);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            //builder.Entity<GroupClass>().HasKey(t => new { t.ClassId, t.GroupId });

            //builder.Entity<GroupClass>()
            //    .HasOne(pt => pt.Group)
            //    .WithMany(p => p.Classes)
            //    .HasForeignKey(pt => pt.GroupId);

            //builder.Entity<GroupClass>()
            //    .HasOne(pt => pt.Class)
            //    .WithMany(t => t.Groups)
            //    .HasForeignKey(pt => pt.ClassId);
        }
    }

}
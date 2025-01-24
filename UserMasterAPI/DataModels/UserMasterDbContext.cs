using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace UserMasterAPI.DataModels;

public partial class UserMasterDbContext : DbContext
{
    public UserMasterDbContext()
    {
    }

    public UserMasterDbContext(DbContextOptions<UserMasterDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<UserMaster> UserMasters { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserMaster>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK_UserMaster_UserId");

            entity.ToTable("UserMaster");

            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.Dob)
                .HasColumnType("datetime")
                .HasColumnName("DOB");
            entity.Property(e => e.EmailId).HasMaxLength(100);
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.ProfilePictureName).HasMaxLength(500);
            entity.Property(e => e.UserName).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

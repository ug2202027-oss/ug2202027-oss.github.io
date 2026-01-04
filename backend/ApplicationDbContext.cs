using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Models;

namespace EcommerceAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Product)
                .WithMany()
                .HasForeignKey(oi => oi.ProductId);

            // Configure decimal precision
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Product>()
                .Property(p => p.Rating)
                .HasPrecision(3, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.TotalAmount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.Price)
                .HasPrecision(18, 2);

            // Seed data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Seed products
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Wireless Headphones", Description = "High-quality wireless headphones", Price = 79.99m, Category = "electronics", ImageUrl = "🎧", StockQuantity = 50, Rating = 4.5m, ReviewCount = 120, CreatedAt = DateTime.UtcNow },
                new Product { Id = 2, Name = "Smart Watch", Description = "Feature-rich smart watch", Price = 199.99m, Category = "electronics", ImageUrl = "⌚", StockQuantity = 30, Rating = 4.7m, ReviewCount = 85, CreatedAt = DateTime.UtcNow },
                new Product { Id = 3, Name = "Laptop Backpack", Description = "Durable laptop backpack", Price = 49.99m, Category = "fashion", ImageUrl = "🎒", StockQuantity = 75, Rating = 4.3m, ReviewCount = 64, CreatedAt = DateTime.UtcNow },
                new Product { Id = 4, Name = "Gaming Mouse", Description = "Precision gaming mouse", Price = 39.99m, Category = "electronics", ImageUrl = "🖱️", StockQuantity = 100, Rating = 4.6m, ReviewCount = 200, CreatedAt = DateTime.UtcNow },
                new Product { Id = 5, Name = "Coffee Maker", Description = "Automatic coffee maker", Price = 89.99m, Category = "home", ImageUrl = "☕", StockQuantity = 40, Rating = 4.4m, ReviewCount = 95, CreatedAt = DateTime.UtcNow },
                new Product { Id = 6, Name = "Running Shoes", Description = "Comfortable running shoes", Price = 129.99m, Category = "sports", ImageUrl = "👟", StockQuantity = 60, Rating = 4.8m, ReviewCount = 150, CreatedAt = DateTime.UtcNow },
                new Product { Id = 7, Name = "Desk Lamp", Description = "Modern LED desk lamp", Price = 34.99m, Category = "home", ImageUrl = "💡", StockQuantity = 80, Rating = 4.2m, ReviewCount = 55, CreatedAt = DateTime.UtcNow },
                new Product { Id = 8, Name = "Bluetooth Speaker", Description = "Portable Bluetooth speaker", Price = 59.99m, Category = "electronics", ImageUrl = "🔊", StockQuantity = 90, Rating = 4.5m, ReviewCount = 110, CreatedAt = DateTime.UtcNow },
                new Product { Id = 9, Name = "Yoga Mat", Description = "Non-slip yoga mat", Price = 29.99m, Category = "sports", ImageUrl = "🧘", StockQuantity = 120, Rating = 4.6m, ReviewCount = 88, CreatedAt = DateTime.UtcNow },
                new Product { Id = 10, Name = "Book - Programming", Description = "Programming fundamentals", Price = 44.99m, Category = "books", ImageUrl = "📚", StockQuantity = 45, Rating = 4.9m, ReviewCount = 175, CreatedAt = DateTime.UtcNow },
                new Product { Id = 11, Name = "Board Game", Description = "Family board game", Price = 34.99m, Category = "toys", ImageUrl = "🎲", StockQuantity = 70, Rating = 4.7m, ReviewCount = 92, CreatedAt = DateTime.UtcNow },
                new Product { Id = 12, Name = "Winter Jacket", Description = "Warm winter jacket", Price = 159.99m, Category = "fashion", ImageUrl = "🧥", StockQuantity = 35, Rating = 4.5m, ReviewCount = 68, CreatedAt = DateTime.UtcNow }
            );
        }
    }
}

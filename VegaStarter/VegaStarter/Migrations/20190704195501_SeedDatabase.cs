using Microsoft.EntityFrameworkCore.Migrations;

namespace VegaStarter.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert Into Makes (Name) values ('BMW')");
            migrationBuilder.Sql("Insert Into Makes (Name) values ('Audi')");
            migrationBuilder.Sql("Insert Into Makes (Name) values ('Mercedes')");

            migrationBuilder.Sql("Insert Into Models (Name, MakeId) Values ('BMW-X6', (Select Id From Makes Where Name='BMW'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeId) Values ('BMW-M3', (Select Id From Makes Where Name='BMW'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeId) Values ('BMW-M8', (Select Id From Makes Where Name='BMW'))");

            migrationBuilder.Sql("Insert Into Models (Name, MakeId) Values ('Audi-Q7', (Select Id From Makes Where Name='Audi'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeId) Values ('Audi-TT', (Select Id From Makes Where Name='Audi'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeId) Values ('Audi-A8', (Select Id From Makes Where Name='Audi'))");

            migrationBuilder.Sql("Insert Into Models (Name, MakeId) Values ('Mercedes-E211', (Select Id From Makes Where Name='Mercedes'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeId) Values ('Mercedes-G55', (Select Id From Makes Where Name='Mercedes'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeId) Values ('Mercedes-S600', (Select Id From Makes Where Name='Mercedes'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete From Makes");
            migrationBuilder.Sql("Delete From Models");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace VegaStarter.Migrations
{
    public partial class SeedInitializeData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Features",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "SRS" });

            migrationBuilder.InsertData(
                table: "Features",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "ABS" });

            migrationBuilder.InsertData(
                table: "Features",
                columns: new[] { "Id", "Name" },
                values: new object[] { 3, "ESP" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Features",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Features",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Features",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace VegaStarter.Migrations
{
    public partial class ChangeVehicleColumnName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsRegitered",
                table: "Vehicles");

            migrationBuilder.AddColumn<bool>(
                name: "IsRegistered",
                table: "Vehicles",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsRegistered",
                table: "Vehicles");

            migrationBuilder.AddColumn<bool>(
                name: "IsRegitered",
                table: "Vehicles",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

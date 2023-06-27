using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Simulacrum.Api.Migrations
{
    public partial class PfpFileName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfilePicFileName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfilePicFileName",
                table: "AspNetUsers");
        }
    }
}

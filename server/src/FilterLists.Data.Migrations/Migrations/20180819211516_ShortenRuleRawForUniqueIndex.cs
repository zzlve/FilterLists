﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace FilterLists.Api.Migrations
{
    public partial class ShortenRuleRawForUniqueIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                "Raw",
                "rules",
                "VARCHAR(191)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(768)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                "Raw",
                "rules",
                "VARCHAR(768)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(191)");
        }
    }
}
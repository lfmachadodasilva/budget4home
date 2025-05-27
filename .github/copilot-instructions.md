<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a budget4home. App to control personal finances.

The folder dotnet is the api version of the app, built with .NET 8.0. It uses Entity Framework Core with a PostgreSQL database, and follows a clean architecture approach. The main entry point is in the Budget4Home.Api project, and business logic (models, repositories, services) is in the Budget4Home.Core project.

The folder go using the standard Go project structure. The main entry point is in cmd/b4h-api, and business logic (models, repositories, MongoDB connection) is in internal. MongoDB is used directly (no database abstraction layer).

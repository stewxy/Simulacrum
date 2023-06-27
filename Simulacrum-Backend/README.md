# Simulacrum-Backend

[![Build and test](https://github.com/uoa-compsci399-s2-2022/Simulacrum-Backend/actions/workflows/dotnet.yml/badge.svg?branch=main)](https://github.com/uoa-compsci399-s2-2022/Simulacrum-Backend/actions/workflows/dotnet.yml)

## Intro
This project contains all the backend code for Simulacrum. At the moment, there is only one project (`Simulacrum.Api`), but in the future, more may be added (e.g for integration tests, test scripts, etc...). The web API is written in C# and makes use of the ASP.NET Core Web API framework using .NET 6.

## Note to markers
Running this project requires you to configure 3 connection strings. You should have received a Google Doc outlining instructions regarding these connection strings. If you are a marker and have not received this document, please contact Asma/Anna or one of our team members.

## URL of deployed project
You can access the deployed backend [here](https://simulacrum-api.azurewebsites.net/swagger/index.html). A link should also be in the "About" part of the repo at the top on the right.

## Project management tool
For our project management, we used Jira. Click [here](https://gansolutions.atlassian.net/jira/software/projects/SIGMA/boards/1) to access our Jira project.

## Tools
You will need to following tools installed for development:

- Visual Studio 2022
- .NET 6.0
- Docker if you want to test using local DB **(not needed for marking!)**

These following tools are optional, but are very useful:

- Azure Data Studio
- Microsoft Azure Storage Explorer

## Project dependencies
These should get installed automatically on opening the project initially.
- `Azure.Communication.Email`
- `Azure.Storage.Blobs`
- `Microsoft.AspNetCore.Authentication.JwtBearer`
- `Microsoft.AspNetCore.Identity.EntityFrameworkCore`
- `Microsoft.EntityFrameworkCore.InMemory`
- `Microsoft.EntityFrameworkCore.Proxies`
- `Microsoft.EntityFrameworkCore.SqlServer`
- `Profanity.Detector`
- `Microsoft.EntityFrameworkCore.Tools`
- `Swashbuckle.AspNetCore`

## Getting started **(for markers!)**

This guide is intended for CS399 markers who want to run an instance of the backend locally using our deployed Azure services.

### Step 1
Clone this repo anywhere on your computer via `git clone` or by using any Git client of your choice.

### Step 2
Open the solution in Visual Studio. You can do this by double clicking the `.sln` file in the root of the repo. The packages required should automatically be installed. If not, you can install them by running `dotnet restore` in the package manager console (`View -> Other Windows -> Package Manager Console`).

### Step 3
Open `appsettings.json` and update the connection string to a valid Microsoft SQL server connection string, Azure Storage connection string, and Azure Communication connection string. All these connection strings should be in the doc supplied to you.

### Step 4
Run the web API!

## Getting started

This guide is intended for people who want to run the backend with their own deployed Azure services. If you are a marker, please _don't_ follow this guide but refer to the previous one!

### Step 1
Clone this repo anywhere on your computer via `git clone` or by using any Git client of your choice

### Step 2
Open the solution in Visual Studio. The packages required should automatically be installed. If not, you can install them by running `dotnet restore` in the package manager console.

### Step 3
Open `appsettings.json` and update the connection string to a valid Microsoft SQL server connection string, Azure Storage connection string, and Azure Communication connection string. If you are wanting to test against a local database instance, see the **Docker** section.

### Step 4
Apply database migration updates by running `update-database` in the package manager console.

### Step 5
Run the web API!

## Docker setup
**NOTE:** This section is not needed for CS399 markers, as you will be consuming our already-deployed Azure services.

If you want to run the web API with a local instance of Microsoft SQL Server, the easiest way to achieve this is by running an instance of Microsoft SQL Server in Docker. This short guide will guide you through the process.

### Step 1
Download and install Docker for your respective platform from [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/). You may need to create an account (idk can't remember lol)

### Step 2
Open Docker and ensure it's running properly. On a command line, type the following one at a time:

1. `docker pull mcr.microsoft.com/mssql/server:2022-latest`

2. `docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=yourStrong(! Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest`

**NOTE:** For the password, make sure that you enter in a complex password, otherwise the setup could mess up.

### Step 3
Once the container is up and running, you now have a local instance of Microsoft SQL Server up and running! Use the following connection string format: `Server=localhost; Database=WebAPIBase; User Id=sa; Password=<enter your password>`

**NOTE:** On Windows, if `localhost` doesn't work for the server, use `host.docker.internal` instead.

## Team Members
- Mark Anklesaria
- Samuel Dosado
- Grace Kim
- Caleb Ko
- Jacob Watson
- Stephen Wong

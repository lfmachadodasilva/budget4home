################
## Base Image ##
################
#FROM images.artifactory.dunnhumby.com/dunnhumby/aspnetcore-runtime:5.0 AS base
FROM mcr.microsoft.com/dotnet/core/aspnet:5.0 AS base

#############
## Restore ##
#############
#FROM images.artifactory.dunnhumby.com/dunnhumby/aspnetcore-build:5.0 AS restore
FROM mcr.microsoft.com/dotnet/core/sdk:5.0 AS restore

WORKDIR /app/api
EXPOSE 80

RUN mkdir ./budget4home
RUN mkdir ./budget4home.UnitTests

COPY budget4home/*.csproj ./budget4home
COPY budget4home.tests/*.csproj ./budget4home.tests
COPY budget4home.sln .

RUN ["dotnet", "restore"]

###########
## Build ##
###########
FROM restore AS build

COPY budget4home ./budget4home
COPY budget4home.tests ./budget4home.tests
COPY budget4home.sln .

RUN ["dotnet", "publish", "--no-restore", "-c", "Release"]

################
## Unit Tests ##
################
FROM restore AS test
COPY . .
VOLUME ["/app/coverage"]
ENTRYPOINT ["dotnet", "test"]
#, "-c", "Release", "--collect:\"XPlat Code Coverage\""]

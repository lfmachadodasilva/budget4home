FROM node:22-slim AS react-build
WORKDIR /App

COPY ./react ./

RUN yarn install
RUN yarn build

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /App

# Copy everything from the dotnet folder
COPY ./dotnet ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /App
COPY --from=build /App/out .
COPY --from=react-build /App/dist /App/wwwroot
ENTRYPOINT ["dotnet", "Budget4Home.Api.dll"]
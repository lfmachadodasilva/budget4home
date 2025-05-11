FROM node:22-alpine AS react-build
WORKDIR /App
COPY ./react ./
RUN yarn install
RUN yarn build

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS dotnet-build
WORKDIR /App
COPY ./dotnet ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /App
COPY --from=dotnet-build /App/out .
COPY --from=react-build /App/dist /App/wwwroot
ENTRYPOINT ["dotnet", "Budget4Home.Api.dll"]
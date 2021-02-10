#FROM images.artifactory.dunnhumby.com/dunnhumby/aspnetcore-runtime:5.0 AS base
FROM mcr.microsoft.com/dotnet/core/aspnet:5.0 AS base

FROM budget4home-ui as budget4home-ui
FROM budget4home-api as budget4home-api

WORKDIR /app
# COPY scripts/ready-check.sh .
RUN mkdir wwwroot
RUN chmod a+x ./ready-check.sh
COPY --from=budget4home-api /app/budget4home/bin/Release/*/publish .
COPY --from=budget4home-ui /app/build /app/wwwroot

# ENV ASPNETCORE_URLS=http://0.0.0.0:6000
ENTRYPOINT ["dotnet", "budget4home.dll"]

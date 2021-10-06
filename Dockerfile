#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.


FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
ENV CONNECTION_STRING=mongodb+srv://dcruas:051190@memories.mkse3.mongodb.net/Iutubi?retryWrites=true&w=majority
ENV API_KEY=AIzaSyBSxGeb69MEDiGpl1dkWwEt6G-W7w52FhQ
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
ENV CONNECTION_STRING=mongodb+srv://dcruas:051190@memories.mkse3.mongodb.net/Iutubi?retryWrites=true&w=majority
ENV API_KEY=AIzaSyBSxGeb69MEDiGpl1dkWwEt6G-W7w52FhQ
WORKDIR "/src"
COPY ["./IutubiProject.csproj", "./"]
RUN dotnet restore "./IutubiProject.csproj"
COPY . .
WORKDIR "/src"
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -yq nodejs build-essential
RUN npm install -g npm
RUN dotnet build "./IutubiProject.csproj" -c Release -o /app/build

FROM build AS publish
ENV CONNECTION_STRING=mongodb+srv://dcruas:051190@memories.mkse3.mongodb.net/Iutubi?retryWrites=true&w=majority
ENV API_KEY=AIzaSyBSxGeb69MEDiGpl1dkWwEt6G-W7w52FhQ
WORKDIR "/src"
RUN dotnet publish "./IutubiProject.csproj" -c Release -o /app/publish

FROM base AS final
ENV CONNECTION_STRING=mongodb+srv://dcruas:051190@memories.mkse3.mongodb.net/Iutubi?retryWrites=true&w=majority
ENV API_KEY=AIzaSyBSxGeb69MEDiGpl1dkWwEt6G-W7w52FhQ
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IutubiProject.dll"]


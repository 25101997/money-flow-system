# si apps/api$ aun no esta iniciado un proyecto .net

docker run -it --rm -v "$PWD":/api -u $(id -u):$(id -g) -w /api -e DOTNET_CLI_HOME=/api -p 8080:8080 mcr.microsoft.com/dotnet/sdk:8.0 sh

dotnet new webapi --output .

# si apps/web$ aun no esta iniciado un proyecto angular

docker run -it --rm -v "$PWD":/web -u $(id -u):$(id -g) -w /web -p 4200:4200 node:18-alpine sh

npx @angular/cli@16.2.0 new web --routing --style=css --directory .

# -------
cd deploy/docker
cp .env.example .env

docker compose -f docker-compose.dev.yml up


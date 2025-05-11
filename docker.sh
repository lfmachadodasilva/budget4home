docker build -f apps/b4h-api/Dockerfile . -t budget4home/api
docker run -p 3000:3000 budget4home/api
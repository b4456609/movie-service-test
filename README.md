# Build Image
```sh
docker build -t movie-service-test:latest .
```

# Using env to decide test target.
```sh
docker run --rm \
    -e MGP=140.121.102.164:4000 \
    -e PACT_URL=http://140.121.102.164:8880/ \
    -e DB_HOST=140.121.102.164 \
    -e MOVIE_HOST=140.121.102.164 \
    -e MOVIE_PORT=8081 \
    -e ORDER_HOST=140.121.102.164 \
    -e ORDER_PORT=8083 \
    -e THEATER_HOST=140.121.102.164 \
    -e THEATER_PORT=8084 \
    -e USER_HOST=140.121.102.164 \
    -e USER_PORT=8082 \
    -e ZUUL_URL=http://140.121.102.164:8080/ \
    -e TARGET=theater \
    b4456609/movie-uat
```
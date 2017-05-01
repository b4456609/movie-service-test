# Build Image
```sh
docker build -t movie-service-test:latest .
```

# Using env to decide test target.
```sh
docker run --rm --env-file ./env.list \
    --env TARGET=user \
    movie-service-test
```
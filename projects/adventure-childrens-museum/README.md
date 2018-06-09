# adventure-childrens-museum-by-fawkes
Team Fawkes' repo for the Adventure! Children's Museum challenge.

# Docker

The server can be built into a Docker container. Just run `docker build .` from this directory to build a Docker
container with the server. We push this container to
`937163516619.dkr.ecr.us-west-2.amazonaws.com/museum-adventure:<VERSION>` so to build a new version of the container
run:

```
docker build -t 937163516619.dkr.ecr.us-west-2.amazonaws.com/museum-adventure:<NEW VERSION> .
docker push 937163516619.dkr.ecr.us-west-2.amazonaws.com/museum-adventure:<NEW VERSION>
```

To run the container you can simply:

```
docker run --rm -p 8080:8080 937163516619.dkr.ecr.us-west-2.amazonaws.com/museum-adventure:<NEW VERSION>
```

and the game will then be available at `localhost:8080`.

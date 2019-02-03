# Base Image

We base *all* of our images off this base image. 

This lives in our ECR repo as `mvpstudio/base:<VERSION>`.

# Debian

This image is just [the official Debian Stretch image](https://hub.docker.com/_/debian/) plus the addition of a single
user, `mvp`. All apps should be run as the `mvp` user. By convention we put the app in `/home/mvp/app`. It also installs
some handy tools like `tar`, `zip`, and the AWS command line tool.

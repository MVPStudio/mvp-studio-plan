# Docker

This is the parent directory for all our Docker containers. We try to maintain a strict hierarchy for containers so that
everything has as its lowest layer our `base` image, and then, for example, all node.js projects have as their base the
`node` image, etc. The reason for this is it allows us to upgrade, patch vulnerabilities, etc. in a very easy consistent
way. For example, imaging there's a new vulnerability in zlib (a common compression library used by most HTTP servers).
That would likely affect a lot of MVP Studio projects.  If each project had their own base image we'd have to figure out
how to patch each individually. However, since all our images are based off `base` we can simply update that image and
then rebuild the rest. Similarly, if there was a vulnerability in node.js we could update just our `node` image and then
rebuild anything that's based off that.

# Versioning

We do *not* use the common `latest` tag ever. That's because if you use `latest` it can be hard to know when the image
was last built so you don't know what software it contained. Instead, we use explicit versioning like `v1`, `v2`, etc.

# MVP User

It is generally considered [a bad idea](https://www.oreilly.com/ideas/five-security-concerns-when-using-docker) to run
apps in Docker containers as root. Thus we run all apps as the `revl` user (which is created in our base image).

# App Location

For quick debugging it can be handy to know where the app is actually installed. By convention we always put the
application in `/home/mvp/app`. That is, the main executable and as much of the supporting code and configuration as
possible can all be found in that folder.

# MVP Studio Repo

This repo holds MVP infrastructure (e.g. our Docker base images) and all the projects maintained and hosted by MVP
studio.

The `projects` directory has one directory per project managed by MVP studio.

# git LFS

We use [git LFS](https://github.com/git-lfs/git-lfs) so that large files (e.g. images, videos, etc.) aren't actually
stored in the repo but are automatically checked out with the repo and versioned with it. Thus, if you're not already
using git lfs you'll have to run `git lfs install` on your machine before cloning this repo (at least if you want the
big objects to be pulled).

# Deployments

We are using [AWS Fargate](https://aws.amazon.com/fargate/) to deploy our apps. Even though Fargate allows you to run
applications without running any EC2 instances you still have to define your ECS Cluster, the subnets, routing, etc.

Once that's done, running an app consists of:

1. Getting the app built into a Docker container
2. Creating and ECS/Fargate task definition which says how to start your container, what ports it listens on, how much
   memory it needs, etc.
3. Create an ELB for your application.
3. Create a ECS/Fargate service. This says how many instances of your task should be running, how they reach the outside
   world, etc. The service is what connects your application to the ELB.

## Creating the Cluster

Creating the cluster is simple. Simply apply the [CloudFormation stack](https://aws.amazon.com/cloudformation) we have
create for this purpose in [infrastructure/fargate_cluster.yml](infrastructure/fargate_cluster.yml). When you run it the
first time you will be asked for a stack name. That stack name will become the name of the cluster and will be used as
tags for all of the resources create so you should pick the stack name carefully. Typically we use `stage` as the name
for the staging cluster and `prod` for our production cluster.

## Creating an Application

The first step to defining an application is to get it to run in a Docker container. That's typically very easy. The
`Dockerfile` for an application should be placed in that project's root folder (e.g.
`projects/adventure-childrens-musem/Dockerfile`).

## Deploying an Application

To deploy an application we have to create the task definition, service, and ELB. We use CloudFormation for this so
that all of the infrastructure for an application are in a single file and they can be deployed with a single command.
Perhaps more important, this setup also means that a single command allows us to stop an application and destroy all
it's resources including the ELB, Listener, TaskDefinition, etc.

The CloudFormation template for an application should be placed in a `deploy.yml` file in the project's root (e.g. 
`projects/adventure-childrens-musem/deploy.yml`).

While the `deploy.yml` file is fairly big most of it is boilerplate to create the ELB, listener, etc. The only parts
that tend to vary from application to application in a significant way are the task definition and service definition.

You can deploy the application via the GUI or command line. As with the cluster as a whole, the stack name is used to
name the task, service, ELB, etc. so it should be meaningful and unique. By convention it is `<app>-<cluster>`. For
example, the deployment of the `museum-adventure` project to `stage` is named `museum-adventure-stage`.

### Updating the Application

If you've updated the code and re-built your container and want to push that live you can do that via the [AWS
console](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/update-service.html) or the command line. Due to
our versioning scheme you do not need to edit the task definition - you just need to redeploy.  However, you do have to
specify "force new deployment" so that Fargate knows there's a new version of the container with the same version number
and it knows to re-pull the image.


To update via the CLI run `aws ecs update-service --cluster=<cluster> --service=<service> --force-new-deployment`.

# Application Versioning

Our CI re-builds the container with each push. The resulting container is given tagged with the commit hash that built
it. It is also tagged with `stage` and pushed to staging. Thus, at any point in time the container running in staging is
tagged with `stage` and the commit hash that produced it.

When an application is ready to push to production it should also be tagged with `prod`. Simply running update-service
as described above will then do a zero-downtime rolling deployment.



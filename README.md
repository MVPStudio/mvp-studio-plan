# MVP Studio Repo

This repo holds MVP infrastructure (e.g. our Docker base images) and all the projects maintained and hosted by MVP
studio.

The `projects` directory has one directory per project managed by MVP studio.

# git LFS

We use [git LFS](https://github.com/git-lfs/git-lfs) so that large files (e.g. images, videos, etc.) aren't actually
stored in the repo but are automatically checked out with the repo and versioned with it. Thus, if you're not already
using git lfs you'll have to run `git lfs install` on your machine before cloning this repo (at least if you want the
big objects to be pulled).

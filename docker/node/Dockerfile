FROM mvpstudio/base:v1
# The bash commands here set up yarn and node to come from their repos instead of the Debian one
# so that we get modern versions (Debian is *waaay* behind on versions).
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
       echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list && \
       curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
       apt-get update && \
       apt-get install -y yarn nodejs

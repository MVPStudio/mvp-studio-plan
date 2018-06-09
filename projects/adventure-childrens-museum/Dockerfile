FROM 937163516619.dkr.ecr.us-west-2.amazonaws.com/node:v1
COPY server/ /home/mvp/app/
RUN cd /home/mvp/app && rm -rf node_modules && yarn

USER mvp

EXPOSE 8080
WORKDIR /home/mvp/app
ENTRYPOINT ["node", "index.js"]

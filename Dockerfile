FROM mhart/alpine-node
LABEL Jordan Addison <jordanaddison@globalfas.com>
WORKDIR /var/www
ADD package.json /tmp
RUN yarn global add pm2
RUN cd /tmp && yarn install
RUN mv /tmp/node_modules /var/www
COPY . /var/www/
RUN yarn run build
EXPOSE 3000
CMD ["pm2-docker","npm", "--", "start"]
FROM node:12-alpine

RUN mkdir /client
WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH


# copy package.json into the container at /client
COPY package.json /client/package.json
# install dependencies
RUN yarn install

COPY . .
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["yarn", "start"]
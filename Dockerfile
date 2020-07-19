FROM node:12-alpine

WORKDIR /client
# copy package.json into the container at /client
COPY package.json /client/
COPY yarn.lock /client/
# install dependencies
RUN yarn install
# Copy the current directory contents into the container at /client
COPY . /client/
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["yarn", "start"]
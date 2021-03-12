# pull official base image
FROM node:14.15.0

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent

# add app
COPY . ./

EXPOSE 4211

# start app
CMD ["npm", "start"]
FROM node

#Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

RUN npm run build

COPY .env ./build/

WORKDIR ./build

EXPOSE 4000
CMD node build/app.js
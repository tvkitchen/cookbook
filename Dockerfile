FROM node:current-buster

RUN apt-get update && apt-get -y install \
    libfreetype6 libutf8proc2 tesseract-ocr ffmpeg ccextractor

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN yarn

# Bundle app source
COPY . .

WORKDIR recipes/extracting-captions
RUN yarn

WORKDIR recipes/extracting-captions-http
RUN yarn

WORKDIR /usr/src/app

ENTRYPOINT [ "yarn", "start" ]

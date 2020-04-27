FROM node:10.3.0

RUN mkdir -p /usr/src/nodejs

WORKDIR /usr/src/nodejs

COPY package.json /usr/src/nodejs/package.json
RUN cd /usr/src/nodejs/
RUN npm i
COPY . /usr/src/nodejs/

EXPOSE 8000
CMD npm start
FROM node:12

RUN mkdir /usr/src/app 
 
WORKDIR /usr/src/app

RUN npm install -g @angular/cli 

RUN npm install -g @angular/cli y